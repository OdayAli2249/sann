import { RegisterForm } from "@/types/Auth";

export const objectToFormdata = (obj: Partial<RegisterForm>): FormData => {
    const formData = new FormData();

    const form: Partial<RegisterForm> = {
        industry_id: obj.industry?.id,
        language: obj.languageObject?.language,
        organization_name_en: obj.organization_name_en,
        organization_name_ar: obj.organization_name_ar,
        email: obj.email,
        mobile: obj.mobile,
        password: obj.password,
        country_id: obj.country?.id,
        country_state_id: obj.country_state?.id,
        currency_id: obj.currency?.id,
        time_zone_id: obj.time_zone?.id,
        postal_code: obj.postal_code,
        registered_for_vat: obj.tax_registration_number_label ? 1 : 0,
        tax_registration_number_label: obj.tax_registration_number_label,
        tax_registration_number: obj.tax_registration_number,
        vat_registered_on: obj.vat_registered_on
    };

    Object.entries(form).forEach(
        ([key, val]) =>
            val !== undefined &&
            val !== null &&
            formData.append(key, val as string)
    );

    return formData;
};