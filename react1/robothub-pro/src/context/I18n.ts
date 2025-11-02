import i18n from "i18next";
import { initReactI18next } from "react-i18next";



const resources = {
    en: {
        translation: {
            brand: "RobotHub Pro",
            nav: { home: "Home", catalog: "Catalog", cart: "Cart", admin: "Admin", login: "Login" },
            hero: { title: "Robotics parts & knowledge", subtitle: "Find, learn, build.", },
      Login: {
                title: "Login",
                email: "Email",
                password: "Password",
                submit: "Sign in",
                invalid: "Invalid email or password",
                success: "Logged in successfully",
            },
        }
    },
    ar: {
        translation: {
            brand: "روبوتهاب برو",
            nav: { home: "الرئيسية", catalog: "المتجر", cart: "السلة", admin: "لوحة التحكم", login: "تسجيل الدخول" },
            hero: { title: "قطع ومراجع للروبوتات", subtitle: "ابحث وتعلّم وابنِ." },
      Login: {
                title: "تسجيل الدخول",
                email: "البريد الإلكتروني",
                password: "كلمة المرور",
                submit: "دخول",
                invalid: "بيانات الدخول غير صحيحة",
                success: "تم تسجيل الدخول بنجاح",
            },
        }
    },
};

i18n.use(initReactI18next).init({

    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },


});
export default i18n;