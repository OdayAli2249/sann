import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack, Typography, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { routePathes } from "@/constants/routePathes";
import useReactQuery from "@/hooks/useReactQuery";
import { authRequestCollection } from "@/api/auth";

type VerifyStatus = "loading" | "success" | "error";

export const VerifyEmail = () => {
    const { token } = useParams(); // Retrieve token from the URL
    const navigate = useNavigate();
    const [status, setStatus] = useState<VerifyStatus>("loading");

    const { mutate: verfiyEmail } = useReactQuery({
        ...authRequestCollection.verfiyEmail,
        onSuccess: () => {
            setStatus("success");
            setTimeout(() => {
                navigate(routePathes.auth, { replace: true }); // Navigate to login page
            }, 1500);
        },
        onError: () => setStatus("error"),
    });

    useEffect(() => {
        // This may noyt work unless it form data
        verfiyEmail({ token });
    }, [])

    const isLoading = status === "loading";
    const isSuccess = status === "success";
    const isError = status === "error"

    return (
        <Stack spacing={2} alignItems="center" justifyContent="center" height="100vh" width="100vw">
            {isLoading && (
                <>
                    <CircularProgress />
                    <Typography>Verifying your email...</Typography>
                </>
            )}
            {isSuccess && (
                <>
                    <CheckCircleIcon color="success" fontSize="large" />
                    <Typography>Email verified successfully! Redirecting...</Typography>
                </>
            )}
            {isError && (
                <>
                    <ErrorIcon color="error" fontSize="large" />
                    <Typography>Verification failed. The link may have expired.</Typography>
                </>
            )}
        </Stack>
    );
};
