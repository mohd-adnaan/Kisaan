import LocalizedStrings from 'react-native-localization';
import * as en from 'english';
import * as hi from 'hindi';

const translations = {
   en : en,
   hi : hi,
};

export default new LocalizedStrings(translations);
