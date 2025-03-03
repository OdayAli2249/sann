import ErrorText from "@/components/inputs/ErrorText";
import useForm from "@/hooks/useForm";
import * as yup from "yup";
import { calculateSpacing } from "@/utils/helpers";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import AppButton from "@/components/inputs/AppButton";
import { useTranslation } from "@/translation";
import useReactQuery from "@/hooks/useReactQuery";
// import { userEndpoints } from "@/api/user";
import CustomTextField from "@/components/inputs/CustomTextField";
import PasswordFields from "@/components/inputs/PasswordFields";
import { authRequestCollection } from "@/api/auth";

interface ForgetPasswordProps {
  backTitle: string;
  onHandleStepBack: VoidFunction;
}

export const ForgetPassword = ({
  backTitle,
  onHandleStepBack,
}: ForgetPasswordProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  console.log(setCurrentStep);

  const validationSchema = yup.object({
    forgetString:
      currentStep === 1
        ? yup
          .string()
          .required()
          .email(t("Invalid email address"))
          .label(t("Email"))
        : yup.string(),
    otp: currentStep === 2 ? yup.string().required() : yup.string(),
    password:
      currentStep === 3
        ? yup
          .string()
          .min(8)
          .oneOf([yup.ref("confirmPassword")], t("Password does not match"))
          .required()
          .label(t("Password"))
        : yup.string(),
    confirmPassword:
      currentStep === 3
        ? yup
          .string()
          .oneOf([yup.ref("password")], t("Password does not match"))
          .required()
          .label(t("Confirm Password"))
        : yup.string(),
  });

  const { values, errors, handleChange, setFieldValue, submitForm, resetForm } =
    useForm<{
      forgetString: string;
      otp: string;
      password: string;
      confirmPassword: string;
    }>({
      initialValues: {
        forgetString: "",
        otp: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema,
      onSubmit: (values) => {
        if (currentStep === 1) {
          requestChangePassword({ email: values.forgetString });
        } else if (currentStep === 2) {
          changePassword({ email: values.forgetString, otp: values.otp });
        } else {
          changePassword({
            email: values.forgetString,
            otp: values.otp,
            new: values.password,
          });
        }
      },
    });

  const { mutate: changePassword } = useReactQuery({
    url: authRequestCollection.changePassword.url,
    method: "PATCH",
    onSuccess: () => {
      if (currentStep === 2) setCurrentStep(3);
      else {
        onHandleStepBack();
        resetForm();
      }
    },
  });

  const { mutate: requestChangePassword } = useReactQuery({
    url: authRequestCollection.requestChangePassword.url,
    method: "POST",
    onSuccess: () => {
      setCurrentStep(2);
    },
  });

  return (
    <Box component={"form"} sx={{ width: "100%", maxWidth: "600px" }}>
      <Stack spacing={2}>
        {currentStep === 1 ? (
          <Stack gap={2}>
            <Typography fontSize={20} fontWeight={600} mb={calculateSpacing(4)}>
              {t("Forget Password?")}
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={300}
              color={"gray"}
              mb={calculateSpacing(46)}
            >
              {t(
                "Enter the email used to create your account so we can send you instructions on how to reset your password"
              )}
            </Typography>
            <Typography
              fontSize={14}
              fontWeight={300}
              color={"gray"}
              mt={calculateSpacing(24)}
            >
              {t("Enter Your Email")}
            </Typography>
            <CustomTextField title="Email"
              name="forgetString"
              label={t("Email")}
              placeholder={t("Email")}
              error={errors.forgetString}
              value={values.forgetString}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  submitForm();
                };
              }}
              required
            />
          </Stack>
        ) : currentStep === 2 ? (
          <Stack gap={2}>
            <Typography fontSize={20} fontWeight={600} mb={calculateSpacing(4)}>
              {t("Check Your Email")}
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={300}
              color={"gray"}
              mb={calculateSpacing(46)}
            >
              {t("We have sent an email with OTP to {email}", {
                email: values.forgetString,
              })}
            </Typography>
            <Box
              sx={{
                width: smallScreen ? "100%" : "70%",
                alignSelf: "center",
              }}
            >
              <MuiOtpInput
                length={6}
                value={values.otp}
                onComplete={() => {
                  submitForm();
                }}
                onChange={(val) => setFieldValue("otp", val)}
                sx={{
                  alignSelf: "center",
                  "& .MuiInputBase-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: 1,
                      borderColor: "lightGray",
                    },
                    borderRadius: "4px",
                  },
                  "& .MuiInputBase-input": {
                    color: "black",
                    zIndex: 2,
                  },
                }}
              />
            </Box>
            <ErrorText error={errors.otp} />
          </Stack>
        ) : (
          <Stack gap={2}>
            <Typography fontSize={20} fontWeight={600} mb={calculateSpacing(4)}>
              {t("Reset Password")}
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={300}
              color={"gray"}
              mb={calculateSpacing(46)}
            >
              {t("Create a new password for your account")}
            </Typography>
            <PasswordFields
              values={values}
              setFieldValue={setFieldValue}
              errors={errors}
            />
          </Stack>
        )}
        <AppButton
          variant="contained"
          sx={{ my: calculateSpacing(42) }}
          width={"100%"}
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          {currentStep === 1
            ? t("Confirm")
            : currentStep === 2
              ? t("Submit")
              : t("Submit")}
        </AppButton>
        <AppButton
          variant="outlined"
          sx={{ my: calculateSpacing(42) }}
          width={"100%"}
          onClick={(e) => {
            e.preventDefault();
            onHandleStepBack();
          }}
        >
          {backTitle}
        </AppButton>
      </Stack>
    </Box>
  );
};
