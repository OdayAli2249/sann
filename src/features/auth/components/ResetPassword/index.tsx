import useForm from "@/hooks/useForm";
import * as yup from "yup";
import { calculateSpacing } from "@/utils/helpers";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppButton from "@/components/inputs/AppButton";
import { useTranslation } from "@/translation";
import useReactQuery from "@/hooks/useReactQuery";
import { authRequestCollection } from "@/api/auth";
import { useNavigate, useParams } from "react-router-dom";
import { routePathes } from "@/constants/routePathes";
import PasswordFields from "@/components/inputs/PasswordFields";
import { useTheme } from "@mui/material";

export const ResetPassword = () => {
    const { token } = useParams(); // Retrieve token from the URL
    const { t } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();

    const validationSchema = yup.object({
        password: yup
            .string()
            .oneOf([yup.ref("confirmPassword")], "Password does not match")
            .required()
            .min(8)
            .label("Password"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Password does not match")
            .required()
            .label("Confirm Password"),
    });

    const { values, errors, setFieldValue, submitForm } =
        useForm<{
            password: string;
            confirmPassword: string;
        }>({
            initialValues: {
                password: "",
                confirmPassword: "",
            },
            validationSchema,
            onSubmit: (values) => {
                const formData = new FormData();
                Object.entries({ token, password: values.password }).forEach(
                    ([key, val]) => formData.append(key, val as string)
                );
                resetPasswordLink(formData)
            }
        });

    const { mutate: resetPasswordLink, isLoading } = useReactQuery({
        ...authRequestCollection.resetPassword,
        onSuccess: (_) => {
            navigate(routePathes.auth, { replace: true });
        },
    });

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center"
            height="100vh" width="100vw"
            sx={{ backgroundColor: theme.palette.background.default }}>
            <Stack spacing={2}
                sx={{ maxWidth: "600px", minWidth: "300px", width: "100%", padding: "20px" }}>
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
                        {t("Enter new password")}
                    </Typography>
                    <PasswordFields
                        values={{
                            password: values.password!,
                            confirmPassword: values.confirmPassword!,
                        }}
                        setFieldValue={setFieldValue}
                        errors={errors}
                    />
                </Stack>
                <AppButton
                    variant="contained"
                    sx={{ my: calculateSpacing(42) }}
                    width={"100%"}
                    onClick={(e) => {
                        e.preventDefault();
                        submitForm();
                    }}
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    {t("Save")}
                </AppButton>
            </Stack>
        </Stack >
    );
};
