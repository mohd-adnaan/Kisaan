/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useMemo, useReducer, useContext,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import './global.js';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
  View,Modal,
  Alert
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RootStackScreen from './components/RootStackScreen';
import BottomTabScreens from './components/BottomTabs';
import SettingsScreen from './Screens/SettingsScreen';
import SplashScreen from './Screens/SplashScreen';
import { SidebarMenu } from './components/SidebarMenu';
import LangSelectScreen from './Screens/LangSelectScreen';
import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationProvider, LocalizationContext } from './components/LocalisationContext';
import SupportScreen from './Screens/SupportScreen';
import ProfileScreen from './Screens/ProfileScreen';

import InfoScreen from './Screens/InfoScreen';

// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
   primary: "green",
   accent: "white"
  },
};

const Drawer = createDrawerNavigator();



const App = () => {

  const { setAppLanguage, initializeAppLanguage } = useContext(LocalizationContext);

  const [modalVisible,setModalVisible]=useState(false);
  // useEffect(() => {
  //   console.log('1 : ');
  //   initializeAppLanguage();
  // }, []);

  function LogoTitle() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{ width: 40, height: 40 ,  resizeMode:'contain'}}
          source={require('../assets/images/icon.png')}
        />
        <Image
          style={{ width: '70%', height: 40 ,  resizeMode:'contain'}}
          source={require('../assets/images/Logo.png')}
        />
        <Icon name='md-information-circle-outline' 
          //  onPress={() => Alert.alert('Information','info')} 
            onPress={()=>setModalVisible(!modalVisible)} 
            style={{margin:5, width: 30}} size={30} color="#FFF" />
      </View>
    );
  }

  const setLocation = (id) => {
    console.log('location is called');
    let LocationAPIURL = global.server_url+"/get_location.php";
    
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let Data = {
        location_id: id,
    };

    fetch(
      LocationAPIURL,
      {
        method: 'POST',
        headers: header,
        body: JSON.stringify(Data)
      }
    )
    .then((response) => response.json())
    .then(async (response) => {
      
      console.log("Location reponse"+response);
      let location = {
        state: response.state_name,
        district: response.district_name,
        block: response.block_name,
      };
      try {
        await AsyncStorage.setItem('userLocation', JSON.stringify(location));
      } catch(e) {
        console.log(e);
      }
    })
    .catch((error) => {
      Alert.alert("Error" + error);
    })
  }

  const initialLoginState = {
    isLoading: true,
    isFirstRegistration: true,
    userToken: null,
    mobNo: '',
    language: '',
  };

  const loginReducer = ( prevState, action ) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
          isFirstRegistration: action.first,
        };
      case 'LOGIN':
        return {
          ...prevState,
          mobNo: action.id,
          userToken: action.token,
          isLoading: false,
          isFirstRegistration: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          mobNo: '',
          userToken: null,
          isLoading: false,
          isFirstRegistration: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          mobNo: action.id,
          userToken: action.token,
          isLoading: false,
          isFirstRegistration: false,
          language: action.lang,
        };
      case 'LANGUAGE':
        return {
          ...prevState,
          mobNo: '',
          userToken: null,
          isLoading: false,
          isFirstRegistration: false,
          language: action.id,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    logIn: (mobNo) => {
      let LoginAPIURL = global.server_url+"/login.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        user_mobile: mobNo,
      };

      fetch (LoginAPIURL,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }
      )
      .then((response) => response.json())
      .then(async (response) => {
          console.log(response);
          if ( response.id != 0 ) {
            let userToken;
            let userInfo = {
              name: response.user_name,
              mobile: response.user_mobile,
              location_id: response.location_id,
              language:response.sel_lang,
              district_id:response.district_id
            };
            console.log("dist id"+userInfo.district_id)
            setLocation(response.location_id);
            userToken = null;
            try {
              userToken = response.id;
              await AsyncStorage.setItem('userToken', JSON.stringify(userToken))
              await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
              await AsyncStorage.setItem('isFirstRegistration', JSON.stringify(false))
            //  await AsyncStorage.setItem('userlanguage', response.sel_lang);
            } catch(e) {
              console.log(e);
            }
            setAppLanguage(response.sel_lang);
            dispatch({ type: 'LOGIN', id: userInfo.mobile, token: userToken });
      }
      else{
        Alert.alert('Login Error', "No User Exists for the given number");
      }
    })
      .catch((e) => {
        console.log(LoginAPIURL);
        console.log('login ' + e);
        console.error(e);
        Alert.alert("ERROR " + e);
      })
    },

    logOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userInfo')
        await AsyncStorage.removeItem('userLocation')
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },

    register: (info) => {
      let RegisterAPIURL = global.server_url+"/register.php";

      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };

      let Data = {
        district_id:info.district_id,
        location_id: info.location_id,
        sel_lang: info.sel_lang,
        user_name: info.user_name,
        user_mobile: info.user_mobile,
        mob_model: info.mob_model,
        mob_os: info.mob_os,
        os_version: info.os_version,
      };

      fetch (RegisterAPIURL,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }
      )
      .then((response) => response.json())
      .then(async (response) => {
        console.log(response);
         Alert.alert(response.Message);
          if ( response.id !== 0 ) {
            let userToken;
            let userInfo = {
              name: info.user_name,
              mobile: info.user_mobile,
              location_id: info.location_id,
              district_id:info.district_id,
              language:info.language,
            };
            //console.log("response"+response.location_id+"info"+info.location_id);
            setLocation(info.location_id);
            userToken = null;
            try {
              userToken = info.location_id;
              await AsyncStorage.setItem('userToken', JSON.stringify(userToken))
              await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
              await AsyncStorage.setItem('isFirstRegistration', JSON.stringify(false))
            //  await AsyncStorage.setItem('userlanguage', response.sel_lang);
            } catch(e) {
              console.log(e);
            }
            console.log(info)
            
           dispatch({ type: 'REGISTER', id: info.user_mobile, lang: info.sel_lang, token: userToken });
      }
    })
      .catch((e) => {
        console.log('register');
        Alert.alert("ERROR " + e);
      })
    },

    selectLang: (lang) => {      
    //  AsyncStorage.setItem('userlanguage', lang);
      dispatch({ type: 'LANGUAGE', id: lang });
    },
  }), [])

  useEffect(() => {
    console.log('launched: ');
    initializeAppLanguage();
    setTimeout( async() => {
     // let userLang=  await AsyncStorage.getItem('userlanguage');      
     // if(userLang) setAppLanguage(userLang);
      let userToken;
      let language;
      userToken = null;
      let isFirstRegistration;
      isFirstRegistration = true;
      try {
        userToken = await AsyncStorage.getItem('userToken')
        isFirstRegistration = JSON.parse( await AsyncStorage.getItem('isFirstRegistration') )
        language = await AsyncStorage.getItem('appLanguage');            
        console.log('the language in app is: '+language);
        
        //  if (language){
        //      setLang(language);
        //      setAppLanguage(language);
        //  }
        if ( isFirstRegistration == null ) {
          isFirstRegistration = true;
        }
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, first: isFirstRegistration });
    }, 1000);
  }, [])

  if ( loginState.isLoading ) {
    return <SplashScreen />;
  }
   else{
    //setModalVisible(true);
  //   setTimeout( async() => {
  //     return <InfoScreen />;
  //   }, 3000)
  // }
}

  return (    
    <LocalizationProvider>
      <SafeAreaProvider>
        <AuthContext.Provider value={authContext}>
        {loginState.userToken &&
          <Modal animationType="slide" transparent={true} visible={!modalVisible}>
          <TouchableOpacity style={styles.modalContainer} onPress={() => { setModalVisible(!modalVisible)}}>
       
          <InfoScreen/>
          
          </TouchableOpacity>
          </Modal>
        }
          <NavigationContainer>
            <PaperProvider theme={theme}>
            <StatusBar barStyle='dark-content' backgroundColor="gray" />
            { loginState.isFirstRegistration ?
              <LangSelectScreen /> : (
              loginState.userToken !== null ? (
                <Drawer.Navigator
                  initialRouteName="Home"
                  drawerContent={props => <SidebarMenu {...props} />}
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#000',
                    },
                    headerTintColor: '#fff',
                    headerTitle: props => <LogoTitle {...props} />,
                }} >
                  <Drawer.Screen name="HOME" component={BottomTabScreens} />
                  <Drawer.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}} />
                  {/* <Drawer.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} /> */}
                  <Drawer.Screen name="Support" component={SupportScreen} options={{headerShown: false}} />
                </Drawer.Navigator>
              ) :
                <RootStackScreen />
              )
            }
            </PaperProvider>
          </NavigationContainer>
        </AuthContext.Provider>
      </SafeAreaProvider>
    </LocalizationProvider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
