import { useEffect } from "react";
export const useRTL = (lang: string) => {

useEffect(() => {

document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
document.documentElement.lang =lang;



}, [lang]);



}