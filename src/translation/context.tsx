import { useContext } from "react";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  SupportedLangs,
  TranslationContextProps,
  TranslationKey,
  TranslationMap,
} from "./types";

const loadLang = (lang: SupportedLangs): TranslationMap | undefined => {
  switch (lang) {
    case "en":
    default:
      return undefined;
  }
};

export const TranslationContext = createContext<TranslationContextProps>({
  t: (key) => key,
});
export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider: FC<
  PropsWithChildren<{ lang?: SupportedLangs }>
> = ({ children, lang }) => {
  const [_currentLang, _setCurrentLang] = useState<SupportedLangs>(
    lang || "en"
  );
  const [_translationMap, _setTranslationMap] = useState<
    TranslationMap | undefined
  >(loadLang(lang || "en"));

  useEffect(() => {
    if (_currentLang !== lang) {
      _setCurrentLang(lang || "en");
    }
  }, [lang]);

  useEffect(() => {
    _setTranslationMap(loadLang(_currentLang || "en"));
  }, [_currentLang]);

  const t = useCallback(
    (key: TranslationKey, args: any) => {
      let translate = _translationMap?.[key] || key;

      const variables = translate.matchAll(/{(\w+)}/gm);

      for (let word of variables) {
        translate = translate.replace(word[0], args[word[1]]);
      }

      return translate;
    },
    [_translationMap]
  );

  return (
    <TranslationContext.Provider
      value={{
        lang: _currentLang,
        setLang: _setCurrentLang,
        t,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
