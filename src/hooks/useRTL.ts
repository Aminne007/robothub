import { useEffect } from "react";

export const useRTL = (lang: string) => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const { documentElement } = document;
    const previousDir = documentElement.dir;
    const previousLang = documentElement.lang;
    const nextDir = lang === "ar" ? "rtl" : "ltr";

    documentElement.dir = nextDir;
    documentElement.lang = lang;

    return () => {
      documentElement.dir = previousDir;
      documentElement.lang = previousLang;
    };
  }, [lang]);
};
