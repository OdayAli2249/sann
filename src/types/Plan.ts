// Plan Price
export interface PlanPrice {
    id: number;
    currency: number;
    monthly_price_ar: string;
    monthly_price_en: string;
    yearly_price_ar: string;
    yearly_price_en: string;
}

// Plan Feature
export interface PlanFeature {
    id: number;
    feature: number;
    feature_ar: string;
    feature_en: string;
    feature_description_ar: string;
    feature_description_en: string;
}

// Plan
export interface Plan {
    id: number;
    plan_name_ar: string;
    plan_name_en: string;
    plan_description_ar: string;
    plan_description_en: string;
    prices: PlanPrice[];
    features: PlanFeature[];
}
