
// Time Zone Entry
export interface TimeZone {
    id: number;
    name: string;
    offset: string;
}

// Industry Module
export interface IndustryModule {
    id: number;
    name_ar: string;
    name_en: string;
}

// Industry
export interface Industry {
    id: number;
    name_ar: string;
    name_en: string;
    modules: { module: IndustryModule }[];
}

export interface Currency {
    id: number;
    currency_name: string;
    currency_name_ar: string;
    currency_code: string;
    currency_code_ar: string;
    currency_symbol: string;

}

// Country State
export interface CountryState {
    id: number;
    name_ar: string;
    name_en: string;
    zip_code: string;
    time_zone: TimeZone;
}

// Country
export interface Country {
    id: number;
    name_ar: string;
    name_en: string;
    nationality_ar: string;
    nationality_en: string;
    code: string;
    currency: number;
    country_states: CountryState[];
}

// User
export interface User {
    id: number;
    name: string;
    first_name: string | null;
    last_name: string | null;
    name_ar: string | null;
    first_name_ar: string | null;
    last_name_ar: string | null;
    email: string;
}

// Organization
export interface Organization {
    id: number;
    organization_name_ar: string | null;
    organization_name_en: string;
}

export interface LanguageObject { language?: Language, id: number; };

// User Response
export interface UserResponse {
    user: User;
    token: string;
    organization: Organization;
}

// Reset Password Data
export interface ResetPasswordData {
    id: number;
    name: string;
    email: string;
}

export type Language = "ar" | "en";


export interface RegisterForm {
    industry_id: number;
    industry: Industry;
    language: Language;
    languageObject: LanguageObject;
    organization_name_ar: string;
    organization_name_en: string;
    email: string;
    mobile: string;
    password: string;
    country_id: number;
    country: Country;
    country_state_id: number;
    country_state: CountryState;
    currency_id: number;
    currency: Currency;
    time_zone_id: number;
    time_zone: TimeZone;
    street1: string;
    street2: string;
    city: string;
    postal_code: string;
    registered_for_vat: number;
    tax_registration_number_label: string;
    tax_registration_number: string;
    vat_registered_on: string;
    plan_id: number;
    plan_price_id: number;
    plan_type: string;
}