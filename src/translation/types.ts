import { translationKeys } from './langs/keys';

export type SupportedLangs = 'en';
export type TranslationKey = (typeof translationKeys)[number];

export type TranslationMap = Record<TranslationKey, string>;

export type TranslationContextProps = {
	t: (key: TranslationKey, args?: any) => string;
	lang?: SupportedLangs;
	setLang?: (lang: SupportedLangs) => void;
};
