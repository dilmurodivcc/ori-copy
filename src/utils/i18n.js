import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uzk from "../utils/locales/uzk.json";
import en from "../utils/locales/en.json";
import ru from "../utils/locales/ru.json";

const resources = {
  uzk: { translation: uzk },
  ru: { translation: ru },
  en: { translation: en }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("selectedLang") || "uzk", // 👈 читаем язык из localStorage
    interpolation: {
      escapeValue: false
    }
  });
const handleLanguageSelect = (selectedOption) => {
  const langCode = selectedOption.value;

  i18n.changeLanguage(langCode);                  // Меняем язык
  localStorage.setItem("selectedLang", langCode); // Сохраняем в localStorage
  window.location.reload();                       // Обновляем страницу
};


export default i18n;
