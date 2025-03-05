import AppButton from "@/components/inputs/AppButton";
import CustomTextField from "@/components/inputs/CustomTextField";
import { PasswordTextField } from "@/components/inputs/PasswordTextField";
import useForm from "@/hooks/useForm";
import { calculateSpacing } from "@/utils/helpers";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { useTheme } from "@mui/material/styles";
import { useAlert } from "@/context/alerts";
import { login, useAuthContext } from "@/context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/translation";
import { ForgetPassword } from "./components/ForgetPassword/index.tsx";
import { Register } from "./components/Register/index.tsx";
import { VerifyEmailSent } from "./components/VerifyEmailSent/index.tsx";
import useReactQuery from "@/hooks/useReactQuery.ts";
import { UserResponse } from "@/types/Auth.ts";
import { authRequestCollection } from "@/api/auth.ts";
import { routePathes } from "@/constants/routePathes.ts";

export enum Content {
  Register = 'Register',
  ForgetPassword = 'ForgetPassword',
  Default = 'Default',
  VerifyEmail = 'VerifyEmail',
}

export const Login = () => {
  const theme = useTheme();
  const alert = useAlert();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().required().label("email"),
    password: yup.string().min(6).required().label("Password"),
  });

  const { dispatch } = useAuthContext();
  const location = useLocation();
  const nextSearchParams = new URLSearchParams(location.search);
  const [emailToVerify, setEmailToVerify] = useState<string>();
  const content = nextSearchParams.get('t') ?? Content.Default;
  const isRegister = content === Content.Register;
  const isForgetPassword = content === Content.ForgetPassword;
  const isDefault = content === Content.Default;
  const isVerifyEmail = content === Content.VerifyEmail;

  const { t } = useTranslation();
  const { mutate: userLogin, isLoading } = useReactQuery<UserResponse>({
    ...authRequestCollection.login,
    onError: () => alert("Invalid credentials", "error"),
    onSuccess: (response) => {
      dispatch(login(response.data?.token ?? ''));
      navigate(routePathes.home);
      alert(t("Welcome back! Your login was successful."), "success");
    },
  });

  const { values, handleChange, handleSubmit, errors } = useForm<{
    email: string;
    password: string;
  }>({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      userLogin({
        email: values.email.trim(),
        password: values.password.trim(),
      });
    },
  });

  const onLogin = useCallback(() => handleSubmit(), []);
  const setContentToForgetPassword = useCallback(() => {
    nextSearchParams.set('t', Content.ForgetPassword);
    handleNavigate(nextSearchParams);
  }, []);
  const setContentToRegister = useCallback(() => {
    nextSearchParams.set('t', Content.Register);
    handleNavigate(nextSearchParams);
  }, []);
  const setContentToDefault = useCallback(() => {
    nextSearchParams.set('t', Content.Default);
    handleNavigate(nextSearchParams);
  }, []);
  const setContentToVerifyEmail = useCallback(() => {
    nextSearchParams.set('t', Content.VerifyEmail);
    handleNavigate(nextSearchParams);
  }, []);

  const handleNavigate = (nextSearchParams: URLSearchParams) => navigate({
    ...location,
    search: nextSearchParams.toString()
  });

  const onHandleVerifyEmailNav = (email: string) => setEmailToVerify(email);

  useEffect(() => {
    if (emailToVerify)
      setContentToVerifyEmail();
  }, [emailToVerify])

  return (
    <Stack
      width="100%"
      height={!isRegister ? "100vh" : "auto"}
      sx={{
        backgroundColor: theme.palette.background.default,
        backgroundSize: "cover",
        backgroundPosition: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "20px",
        alignItems: "center",
        overflow: 'auto'
      }}
    >
      <Stack
        sx={{
          width: "100%",
          maxWidth: "960px",
          minWidth: "300px",
          height: "auto",
          border: "1px solid background.divider",
          borderRadius: "16px",
          backgroundColor: theme.palette.background.paper,
          justifyContent: "center",
          alignItems: "center",

        }}
      >
        {isDefault && (
          <Stack sx={{ width: "100%", maxWidth: "600px" }} spacing={1.5}>
            <Box>
              <Typography variant="h5" mb={calculateSpacing(4)}>
                {t("Login")}
              </Typography>
              <Typography
                fontSize={16}
                fontWeight={500}
                mb={calculateSpacing(46)}
                color="#00000099"
              >
                {t("Welcome to SNN")}
              </Typography>
            </Box>
            <CustomTextField title="Email"
              name="email"
              error={errors.email}
              type={"text"}
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              showLabel={false}
              required
            />
            <PasswordTextField
              id="password"
              name="password"
              error={errors.password}
              placeholder="Password"
              value={values.password}
              onChangeHandler={handleChange}
              sx={{
                "&.MuiInputBase-root": {
                  paddingRight: 0,
                  paddingInlineEnd: "14px",
                },
                "&.MuiInputBase-root input": {
                  paddingInlineStart: "14px",
                  paddingInlineEnd: 0,
                },
                "& .MuiInputAdornment-root": {
                  marginLeft: 0,
                  marginInlineStart: "8px",
                },
              }}
            />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              flexWrap="wrap"
            >
              <Typography
                variant="button-medium"
                color={"text.secondary"}
                textTransform="uppercase"
                sx={{ cursor: "pointer" }}
                onClick={setContentToRegister}
              >
                Register
              </Typography>
              <Typography
                variant="button-medium"
                color={"text.secondary"}
                textTransform="uppercase"
                sx={{ cursor: "pointer" }}
                onClick={setContentToForgetPassword}
              >
                Forget Password?
              </Typography>
            </Box>
            <AppButton
              variant="contained"
              width={"100%"}
              sx={{
                "&.MuiButton-root": {
                  mt: calculateSpacing(46),
                  mb: calculateSpacing(12),
                  textTransform: "uppercase",
                  letterSpacing: "0.46px",
                },
              }}
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              onClick={onLogin}
            >
              {t("Login")}
            </AppButton>
          </Stack>
        )}
        {isForgetPassword && (
          <ForgetPassword
            backTitle={t("Back to User Login")}
            onHandleStepBack={setContentToDefault}
          />
        )}
        {isRegister && (
          <Register
            backTitle={t("Back to User Login")}
            onHandleVerifyEmailNav={onHandleVerifyEmailNav}
            onHandleStepBack={setContentToDefault} />
        )}
        {isVerifyEmail && (
          <VerifyEmailSent
            email={emailToVerify ?? ''}
            backTitle={t("Back to User Login")}
            onHandleStepBack={setContentToDefault} />
        )}
      </Stack>
    </Stack>
  );
};
