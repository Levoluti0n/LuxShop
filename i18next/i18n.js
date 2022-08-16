import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import am from './translations/am';
import ru from './translations/ru';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    otherLanguages: ['ru', 'am'],
    debug: true,
    resources: {
        en,
        ru,
        am
    },
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: 'v3',
});

export default i18n;
