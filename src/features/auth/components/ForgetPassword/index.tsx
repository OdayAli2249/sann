import useForm from "@/hooks/useForm";
import * as yup from "yup";
import { calculateSpacing } from "@/utils/helpers";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppButton from "@/components/inputs/AppButton";
import { useTranslation } from "@/translation";
import useReactQuery from "@/hooks/useReactQuery";
import CustomTextField from "@/components/inputs/CustomTextField";
import { authRequestCollection } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { routePathes } from "@/constants/routePathes";

interface ForgetPasswordProps {
  backTitle: string;
  onHandleStepBack: VoidFunction;
}

export const ForgetPassword = ({
  backTitle,
  onHandleStepBack,
}: ForgetPasswordProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required()
      .email(t("Invalid email address"))
      .label(t("Email"))
  });

  const { values, errors, handleChange, submitForm } =
    useForm<{
      email: string;
    }>({
      initialValues: { email: "" },
      validationSchema,
      onSubmit: ({ email }) => {
        const formData = new FormData();
        formData.append('email', email);
        sendResetPasswordLink(formData);
      }
    });

  const { mutate: sendResetPasswordLink, isLoading } = useReactQuery({
    ...authRequestCollection.forgotPassword,
    onSuccess: (_) => {
      // We may need a timer here
      navigate(routePathes.auth, { replace: true });
    },
  });

  return (
    <Box component={"form"} sx={{ width: "100%", maxWidth: "600px" }}>
      <Stack spacing={2}>
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
            name="email"
            label={t("Email")}
            placeholder={t("Email")}
            error={errors.email}
            value={values.email}
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
        <AppButton
          variant="contained"
          sx={{ my: calculateSpacing(42) }}
          width={"100%"}
          disabled={isLoading}
          isLoading={isLoading}
          onClick={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          {t("Submit")}
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
