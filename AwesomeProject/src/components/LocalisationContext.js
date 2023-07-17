import React, { createContext, useState } from 'react';
import translations from '../../assets/languages/translations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_LANGUAGE = 'appLanguage';

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: '',
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState('');

  const setLanguage = async (language) => {
    translations.setLanguage(language);
    setAppLanguage(language);
    try {
      await AsyncStorage.setItem(APP_LANGUAGE, language);
     // await AsyncStorage.setItem('appLanguage', language);
     console.log('language in context: '+language);
     
    } catch(e) {
      console.log(e);
    }
  };

  const initializeAppLanguage = async () => {
    console.log('lang initialise');
    let currentLanguage;
    console.log("currentLanguage "+currentLanguage);
    try {
      currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
      setLanguage(currentLanguage);
      translations.setLanguage(currentLanguage);
    } catch(e) {
      console.log(e);
    }
    
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};