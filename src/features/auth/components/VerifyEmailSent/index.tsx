import { calculateSpacing } from "@/utils/helpers";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppButton from "@/components/inputs/AppButton";
import { useTranslation } from "@/translation";
import useReactQuery from "@/hooks/useReactQuery";
import { authRequestCollection } from "@/api/auth";

interface VerifyEmailSentProps {
    email: string;
    backTitle: string;
    onHandleStepBack: VoidFunction;
}

export const VerifyEmailSent = ({
    email,
    backTitle,
    onHandleStepBack,
}: VerifyEmailSentProps) => {
    const { t } = useTranslation();
    const { mutate: resendVerificationEmail } = useReactQuery(authRequestCollection.resendVerificationEmail);

    return (
        <Box component={"form"} sx={{ width: "100%", maxWidth: "600px" }}>
            <Stack spacing={2}>
                <Stack gap={2}>
                    <Typography fontSize={16}
                        fontWeight={300}
                        color={"gray"}
                        mb={calculateSpacing(46)}>
                        Check your email
                    </Typography>
                    <Typography fontSize={16}
                        fontWeight={300}
                        color={"gray"}
                        mb={calculateSpacing(46)}>
                        We’ve sent you a verification link. Please check your inbox and click the link to verify your email.
                    </Typography>
                    <Typography fontSize={16}
                        fontWeight={300}
                        color={"gray"}
                        mb={calculateSpacing(46)}>
                        Haven’t received an email?
                    </Typography>
                </Stack>
                <AppButton
                    variant="contained"
                    sx={{ my: calculateSpacing(42) }}
                    width={"100%"}
                    onClick={(e) => {
                        e.preventDefault();
                        // This may noyt work unless it form data
                        resendVerificationEmail({ email });
                    }}
                >
                    {t("Resend")}
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
