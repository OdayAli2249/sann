import * as yup from "yup";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import useForm from "@/hooks/useForm";
import AppButton from "@/components/inputs/AppButton";
import CustomTextField from "@/components/inputs/CustomTextField";
import Typography from "@mui/material/Typography";
import BooleanInput from "@/components/inputs/BooleanInput";
import useReactQuery from "@/hooks/useReactQuery";
import { useTranslation } from "@/translation";
import { useState } from "react";
import { Box, Divider } from "@mui/material";
import NoteSection from "./components/NotesSection";
import InfoMessage from "./components/InfoMessage";
import SimpleSelect from "@/components/inputs/SimpleSelect";
import { Currency, Industry, LanguageObject, RegisterForm, TimeZone } from "@/types/Auth";
import { authRequestCollection } from "@/api/auth";
import LocationInput from "./components/LocationInput";
import PasswordFields from "@/components/inputs/PasswordFields";
import { objectToFormdata } from "./utils";

interface RegisterProps {
    onHandleStepBack: VoidFunction;
}
export const Register: React.FC<RegisterProps> = (props) => {
    let { onHandleStepBack } = props;
    const [isRegisteredForVat, setIsRegisteredForVat] = useState(false);

    const validationSchema = yup.object<Partial<RegisterForm>>({
        email: yup.string().required().email("Invalid email address").label("Email"),
        industry: yup.object().required().label("Industry"),
        languageObject: yup.object().required().label("Language"),
        organization_name_en: yup.string().required().label("Organization Name"),
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
        country: yup.object().required().label("Country"),
        country_state: yup.object().required().label("State"),
        currency: yup.object().required().label("Currency"),
        time_zone: yup.object().required().label("Time Zone"),
        postal_code: yup.string().required().label("Postal Code"),
        vat_registered_on: isRegisteredForVat ? yup.string().required()
            .label("VAT Registered Date") : yup.string(),
        tax_registration_number_label: isRegisteredForVat ?
            yup.string().required().label("Tax Registeration Number Label") : yup.string(),
        tax_registration_number: isRegisteredForVat ? yup.string()
            .matches(/^-?\d+$/, "This field must be a numbers only")
            .required().label("Tax Registeration Number") : yup.string(),
    });

    const { t } = useTranslation();
    const { values, setFieldValue, errors, handleSubmit } = useForm<
        Partial<RegisterForm> & { confirmPassword?: string }
    >({
        initialValues: {},
        onSubmit: (values) => {
            console.log("$#$____values", values);
            sendRequest(objectToFormdata(values));
        },
        validationSchema,
    });
    const { mutate: sendRequest, isLoading } = useReactQuery(authRequestCollection.register);

    return (
        <Stack width="100%"
            component="form"
            onSubmit={handleSubmit}
            gap={2}
        >
            {/* {isPatientFetching && <PageLoading height={400} />} */}
            <Typography variant="button-medium" alignSelf="center"
                fontSize={24}>
                {t("Set up your organization profile")}
            </Typography>
            <Divider sx={{
                alignSelf: "center", width: "24px", height: "3px",
                backgroundColor: "text.secondary",
                borderWidth: 1.5,
                borderRadius: 2,
            }} />
            <Typography variant="button-medium"
                fontSize={18}
                paddingTop={3}
                color="background.paperDivider"
                textTransform="uppercase">
                {t("Organizational Details")}
            </Typography>
            <Grid container spacing={4}>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <CustomTextField
                        title="Organization Name"
                        titleRequired={true}
                        name="organization_name_en"
                        error={errors.organization_name_en}
                        type="text"
                        value={values.organization_name_en ?? ''}
                        onChange={(e) =>
                            setFieldValue("organization_name_en", e.target.value)
                        }
                        showLabel={false}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <CustomTextField
                        title="Organization Name in Arabic"
                        titleRequired={true}
                        name="organization_name_ar"
                        error={errors.organization_name_ar}
                        type="text"
                        value={values.organization_name_ar ?? ''}
                        onChange={(e) =>
                            setFieldValue("organization_name_ar", e.target.value)
                        }
                        showLabel={false}
                    />
                </Grid>
            </Grid>
            <SimpleSelect<Industry>
                titleRequired={true}
                title="Industry"
                displayKey="name_en"
                value={values.industry}
                onChange={(industry) => setFieldValue("industry", industry)}
                requestConfig={authRequestCollection.getIndustries}
                error={errors.industry}
            />
            <LocationInput onChange={({ country, country_state }) => {
                country && setFieldValue("country", country)
                country_state && setFieldValue("country_state", country_state)
            }}
                errors={errors} />
            <Typography variant="button-medium"
                fontSize={18}
                paddingTop={3}
                color={"text.secondary"}
                textTransform="uppercase">
                {t("Regional Settings")}
            </Typography>
            <Grid container spacing={4}>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <SimpleSelect<Currency>
                        titleRequired
                        title="Currency"
                        displayKey="currency_name"
                        value={values.currency}
                        onChange={(currency) => setFieldValue("currency", currency)}
                        requestConfig={authRequestCollection.getCurrencies}
                        error={errors.currency}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <SimpleSelect<TimeZone> titleRequired={true}
                        title="Time Zone"
                        displayKey="name"
                        value={values.time_zone}
                        onChange={(time_zone) => setFieldValue("time_zone", time_zone)}
                        requestConfig={authRequestCollection.getTimezones}
                        error={errors.time_zone}
                    />

                </Grid>
            </Grid>
            <Typography variant="button-medium"
                fontSize={18}
                paddingTop={3}
                color={"text.secondary"}
                textTransform="uppercase">
                {t("Contact Info")}
            </Typography>
            <Grid container spacing={4}>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <CustomTextField
                        title="E-mail"
                        titleRequired
                        name="email"
                        error={errors.email}
                        type="text"
                        value={values.email ?? ''}
                        onChange={(e) =>
                            setFieldValue("email", e.target.value)
                        }
                        showLabel={false}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <CustomTextField
                        title="Mobile"
                        name="mobile"
                        error={errors.mobile}
                        type="text"
                        value={values.mobile ?? ''}
                        onChange={(e) =>
                            setFieldValue("mobile", e.target.value)
                        }
                        showLabel={false}
                    />

                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <SimpleSelect<LanguageObject>
                        title="Language"
                        titleRequired
                        displayKey="language"
                        items={[{ language: 'ar', id: 1 }, { language: 'en', id: 2 }]}
                        value={values.languageObject}
                        onChange={(language) =>
                            setFieldValue("languageObject", language)}
                        error={errors.languageObject}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={6} lg={6} item>
                    <CustomTextField
                        title="Postal Code"
                        titleRequired
                        name="postal_code"
                        error={errors.postal_code}
                        type="text"
                        value={values.postal_code ?? ''}
                        onChange={(e) =>
                            setFieldValue("postal_code", e.target.value)
                        }
                        showLabel={false}
                    />

                </Grid>
            </Grid>
            <BooleanInput
                label={t("is this business registered for VAT?")}
                onChange={(value) => setIsRegisteredForVat(value)}
                value={isRegisteredForVat}
            />
            {isRegisteredForVat && <>
                <Grid container spacing={4} width="90%">
                    <Grid xs={12} sm={6} md={6} lg={6} item>
                        <CustomTextField
                            title="Tax Registration Number Label"
                            name="tax_registration_number_label"
                            error={errors.tax_registration_number_label}
                            type="text"
                            value={values.tax_registration_number_label ?? ''}
                            onChange={(e) =>
                                setFieldValue("tax_registration_number_label", e.target.value)
                            }
                            showLabel={false}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={6} lg={6} item>
                        <CustomTextField titleRequired={true}
                            title="Tax Registration Number (TRN)"
                            name="tax_registration_number"
                            error={errors.tax_registration_number}
                            type="text"
                            value={values.tax_registration_number ?? ''}
                            onChange={(e) =>
                                setFieldValue("tax_registration_number", e.target.value)
                            }
                            showLabel={false}
                        />
                    </Grid>
                </Grid>
                <Box width="50%">
                    <CustomTextField
                        titleRequired={true}
                        title="VAT Registration On"
                        name="vat_registered_on"
                        error={errors.vat_registered_on}
                        type="date"
                        value={values.vat_registered_on ?? ''}
                        onChange={(e) =>
                            setFieldValue("vat_registered_on", e.target.value)
                        }
                        showLabel={false}
                    />
                </Box>
            </>}
            <PasswordFields
                values={{
                    password: values.password!,
                    confirmPassword: values.confirmPassword!,
                }}
                setFieldValue={setFieldValue}
                errors={errors}
            />
            <InfoMessage />
            <Divider sx={{ marginY: 3 }} />
            <NoteSection />
            <Divider sx={{ marginY: 3 }} />
            <Stack gap={2} justifyContent="flex-start" direction="row" mt={2}>
                <AppButton
                    width={200}
                    variant="outlined"
                    onClick={onHandleStepBack}
                    disabled={isLoading}
                    aria-hidden={isLoading}
                >
                    {t("Back to User Login")}
                </AppButton>
                <AppButton
                    width={120}
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    {t("Get Started")}
                </AppButton>
            </Stack>
        </Stack >
    );
};
