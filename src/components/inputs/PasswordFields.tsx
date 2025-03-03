import ColoredSvg from "@/components/ColoredSvg";
import { PasswordTextField } from "@/components/inputs/PasswordTextField";
import { icons } from "@/constants/icons";
import { useTranslation } from "@/translation";
import {
  checkSpecialCharacters,
  checkUppcaseAndLowercase,
  generatePassword,
} from "@/utils/helpers";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FormikErrors } from "formik";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
interface PasswordFieldsProps {
  values: { password: string; confirmPassword: string };
  errors?: FormikErrors<{ password: string; confirmPassword: string }>;
  setFieldValue: (key: string, value: string) => void;
  stacked?: boolean;
  showConfirm?: boolean;
}
const PasswordFields = ({
  stacked = true,
  values,
  setFieldValue,
  errors,
  showConfirm = true,
}: PasswordFieldsProps) => {
  const theme = useTheme();
  const [generate, setGenerate] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const onHandlePasswordGeneration = () => {
    setVisible(true);
    setConfirmVisible(true);
    if (generate) return;
    setGenerate(true);
    const generatedPassword = generatePassword();
    setFieldValue("password", generatedPassword);
    setFieldValue("confirmPassword", generatedPassword);
    setTimeout(() => {
      setGenerate(false);
    }, 1000);
  };

  const { t } = useTranslation();

  return (
    <Stack flexDirection={!stacked ? "row" : "column"}>
      <Stack gap={1} width={"100%"}>
        <PasswordTextField
          id="password"
          name="password"
          placeholder={t("Password")}
          value={values.password!}
          visible={visible}
          setVisible={setVisible}
          onChangeHandler={(e) =>
            setFieldValue(e.target.name, e.target.value)
          }
          error={errors?.password}
        />
        <Stack gap={"4px"} pl={0.5} display={"flex"} flexDirection={"row"}>
          <Typography
            fontSize={12}
            color="grey.main"
            display={"flex"}
            alignItems={"center"}
            gap="5px"
          >
            <Tooltip
              title={t("Uppercase and Lowsercase")}
              arrow
              placement="top"
            >
              <IconButton sx={{ p: 0, m: 0 }}>
                {checkUppcaseAndLowercase(values.password ?? "") ? (
                  <ColoredSvg
                    src={icons.pointCircleFilled}
                    height={10}
                    width={10}
                    defaultColor
                  />
                ) : (
                  <ColoredSvg
                    src={icons.pointCircle}
                    height={10}
                    width={10}
                    defaultColor
                  />
                )}
              </IconButton>
            </Tooltip>{" "}
            {""}
          </Typography>
          <Typography
            fontSize={12}
            color="grey.main"
            display={"flex"}
            alignItems={"center"}
            gap="5px"
          >
            <Tooltip
              title={t("Length greater than or equal 8")}
              arrow
              placement="top"
            >
              <IconButton sx={{ p: 0, m: 0 }}>
                {values.password && values.password?.length >= 8 ? (
                  <ColoredSvg
                    src={icons.pointCircleFilled}
                    height={10}
                    width={10}
                    defaultColor
                  />
                ) : (
                  <ColoredSvg
                    src={icons.pointCircle}
                    height={10}
                    width={10}
                    defaultColor
                  />
                )}
              </IconButton>
            </Tooltip>{" "}
            {""}
          </Typography>
          <Typography
            fontSize={12}
            color="grey.main"
            display={"flex"}
            alignItems={"center"}
            gap="5px"
          >
            <Tooltip title={t("Special characters")} arrow placement="top">
              <IconButton sx={{ p: 0, m: 0 }}>
                {checkSpecialCharacters(values.password ?? "") ? (
                  <ColoredSvg
                    src={icons.pointCircleFilled}
                    height={10}
                    width={10}
                    defaultColor
                  />
                ) : (
                  <ColoredSvg
                    src={icons.pointCircle}
                    height={10}
                    width={10}
                    defaultColor
                  />
                )}
              </IconButton>
            </Tooltip>{" "}
            {""}
          </Typography>
          {showConfirm && (
            <Typography
              fontSize={12}
              color="grey.main"
              display={"flex"}
              alignItems={"center"}
              gap="5px"
            >
              <Tooltip
                title={t("Password and confirm password are matched")}
                arrow
                placement="top"
              >
                <IconButton sx={{ p: 0, m: 0 }}>
                  {values.password &&
                    values.password === values.confirmPassword ? (
                    <ColoredSvg
                      src={icons.pointCircleFilled}
                      height={10}
                      width={10}
                      defaultColor
                    />
                  ) : (
                    <ColoredSvg
                      src={icons.pointCircle}
                      height={10}
                      width={10}
                      defaultColor
                    />
                  )}
                </IconButton>
              </Tooltip>
              {""}
            </Typography>
          )}
        </Stack>
      </Stack>
      {showConfirm && (
        <Stack gap={1} width={"100%"} mt={stacked ? 1.4 : 0}>
          <PasswordTextField
            label="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder={t("Confirm Password")}
            visible={confirmVisible}
            setVisible={setConfirmVisible}
            value={values.confirmPassword}
            onChangeHandler={(e) =>
              setFieldValue(e.target.name, e.target.value)
            }
            error={errors?.confirmPassword}
          />
        </Stack>
      )}
      {!stacked && (
        <Box
          display={"flex"}
          height={"max-content"}
          justifyContent={"center"}
          alignItems={"center"}
          p={"12px"}
          border={1}
          borderRadius={"8px"}
          borderColor={"primary.main"}
          sx={{ cursor: "pointer" }}
          onClick={onHandlePasswordGeneration}
        >
          <ColoredSvg
            height={24}
            width={24}
            src={icons.generatePassword}
            color={theme.palette.primary.main}
            style={{
              transform: `rotate(${generate ? "360deg" : "0deg"})`,
              transition: generate ? "500ms" : "1ms",
            }}
          />
        </Box>
      )}
    </Stack>
  );
};
export default PasswordFields;
