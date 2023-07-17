import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView,
  Alert
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DeviceInfo from 'react-native-device-info';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { SERVER_URL } from 'react-native-dotenv';

//import { SERVER_URL } from '@env';
//const serverUrlphp=SERVER_URL;
// import IMEI from 'react-native-imei';

import { LocalizationContext } from '../components/LocalisationContext';

export default function RegisterScreen({navigation}) {

  const { translations, setAppLanguage } = useContext(LocalizationContext);

  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [blockList, setBlockList] = useState([]);

  const os = DeviceInfo.getSystemName();
  const version = DeviceInfo.getSystemVersion();
  const model = DeviceInfo.getModel();
  // const imei = IMEI.getImei();

  const [info, setInfo] = useState({
    district_id:0,
    location_id: 0,
    sel_lang: '',
    user_name: '',
    user_mobile: '',
    mob_imei_no: '',
    mob_model: model,
    mob_os: os,
    os_version: version,
    registered_on: '',
  })

  useEffect( async () => {
    let lang;
    try {
      lang = await AsyncStorage.getItem('appLanguage');
      
      console.log('the language in register is: '+language)
    } catch(e) {
      console.log(e)
    }
    setInfo({
      ...info,
      sel_lang: lang,
    })
    getState();
  }, [])

  const { register } = useContext(AuthContext);

  const handleSubmit = () => {
    if ( (info.user_name.length == 0) && (info.user_mobile.length == 0) ) {
      Alert.alert(translations.Register.name_phone_empty)
    }
    else if ( info.user_name.length == 0 ) {
      Alert.alert(translations.Register.name_empty)
    }
    else if ( info.user_mobile.length <10 ) {
      Alert.alert(translations.Register.invalid_phone_no)
    }
    else if ( info.location_id === 0 ) {
      Alert.alert(translations.Register.location_empty)
    }
    else {

      register(info);
    }
  }

  const checkName = (val) => {
    const letters = ['', ' ', 'A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z', 'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ा',' ि', ' ी', ' ु', ' ू', 'ऋ', 'ॠ', 'ऌ', 'ॡ', 'ए', 'ऐ', 'ओ', 'औ', ' ृ', ' ॄ', ' ॢ', ' ॣ', ' े', ' ै', ' ो', ' ौ', ' ँ', ' ं', ' ः', ' ़', 'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़', 'य', 'र', 'ल', 'ळ', 'व', 'ह', 'श', 'ष', 'स', 'ऱ', 'ऴ', 'ऍ', 'ऑ', 'ऎ', 'ऒ', ' ॅ', ' ॉ', ' ॆ', ' ॊ'];
    letters.forEach(char => {
      if ( char === val.slice(-1) ) {
        setInfo({
          ...info,
          user_name: val,
        })
      }
    });
  }

  const mobileNoCheck = (val) => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    for ( let i=0; i<numbers.length; i++ ) {
      if ( i == val.slice(-1) ) {
        setInfo({
          ...info,
          user_mobile: val,
        })
      }
    }
  }

  //useEffect(() => {
  const getState = () => {
    console.log('get states');
    let StateAPIURL = global.server_url+"/get_state.php";
    console.log(StateAPIURL);
    let header = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    fetch(
      StateAPIURL,
      //'https://gkms.iitr.ac.in/app/agriadvisorymob/get_state1.php',
        {  method: 'POST',
            headers: header }
    )
    .then(response => response.json()
    )
    .then(response => {    
      console.log("response");  
      console.log(response);
      let state_list = 
        response.states.map((state, index) => {
          return (
            <Picker.Item label={state.state_name} value={state.state_code} key={index} />
          )
        })
      setStateList(state_list);
    })
    .catch(error => {
        Alert.alert("Error ", error+ "  "+StateAPIURL );        
        console.error("Error catch:    " +error+ "  "+StateAPIURL);
    })
  };
  //}, []);

  const getDistricts = (state) => {
    let DistrictAPIURL = global.server_url+"/get_district.php";
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let Data = {
      state_code: state,
    };

    fetch(
      DistrictAPIURL,
        {
            method: 'POST',
            headers: header,
            body: JSON.stringify(Data)
        }
    )
    .then((response) => response.json())
    .then((response) => {
      let district_list = 
        response.districts.map((district, index) => {
          return (
            <Picker.Item label={district.district_name} value={district.district_code} key={index} />
          )
        })
      setDistrictList(district_list);
    })
    .catch((error) => {
        Alert.alert("Error" + error);
    })
  };

  const getBlocks = (district) => {
    let BlockAPIURL =global.server_url+"/get_block.php";

    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let Data = {
      district_code: district,
    };

    fetch(
      BlockAPIURL,
        {
            method: 'POST',
            headers: header,
            body: JSON.stringify(Data)
        }
    )
    .then((response) => response.json())
    .then((response) => {
      let block_list = 
        response.blocks.map((block, index) => {
          return (
            <Picker.Item label={block.block_name} value={block.block_code} key={index} />
          )
        })
      setBlockList(block_list);
    })
    .catch((error) => {
        Alert.alert("Error" + error);
    })
  };

  const [ statePickerValue, setStatePickerValue ] = useState(0);
  const [ districtPickerValue, setDistrictPickerValue ] = useState(0);
  const [ blockPickerValue, setBlockPickerValue ] = useState(0);

  return (
    
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ImageBackground
        source={require('../../assets/images/grass.png')}
        style={{
            flex: 1,
            }}
      >
      <View style={styles.container}>
        <Image
          style={styles.bigCircle}
          source={require('../../assets/images/grass.png')}
        />
        <Image
          style={styles.smallCircle}
          source={require('../../assets/images/grass.png')}
        />
        <ScrollView>
          <View style={styles.centerizedView}>
            <View style={styles.authBox}>
              <View style={styles.logoBox}>
                    <Image
                      style={{ width: 40, height: 40 , justifyContent:'center', alignItems:'center'}}
                      source={require('../../assets/images/icon.png')}
                   />
                    <Image
                      style={{ width: 150,  justifyContent:'center', resizeMode: 'contain', alignItems:'center'}}
                      source={require('../../assets/images/Logo.png')}
                   />
              </View>
              <Text style={styles.registerTitleText}>{translations.Register.registerText}</Text>
              <View style={styles.hr} />
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{translations.Register.registerLanguage}</Text>
                <TouchableOpacity style={[styles.input, {height: 50, alignItems: 'center'}]}>
                  <Picker
                    style={styles.picker}
                    prompt={translations.Register.registerLanguage}
                    selectedValue={info.sel_lang}
                    onValueChange={ (itemValue) => {
                      setInfo({...info, sel_lang: itemValue});
                      setAppLanguage(itemValue);
                    }}
                    backgroundColor='#dfe4ea'
                  >
                    <Picker.Item label="English" value="en" />
                    <Picker.Item label="हिंदी" value="hi" />

                  </Picker>
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{translations.Register.registerName}</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="default"
                  textContentType='name'
                  maxLength={40}
                  onChangeText={(val) => {checkName(val)}}
                  value={info.user_name}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{translations.Register.registerMobileNo}</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize='none'
                  keyboardType="number-pad"
                  textContentType='telephoneNumber'
                  maxLength={10}
                  onChangeText={(val) => {mobileNoCheck(val)}}
                  value={info.user_mobile}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{translations.Register.registerState}</Text>
                <TouchableOpacity style={[styles.input, {height: 50, alignItems: 'center'}]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={statePickerValue}
                    onValueChange={ (itemValue) => {
                      setStatePickerValue(itemValue);
                      setBlockList([]);
                      getDistricts(itemValue);
                    } }
                    backgroundColor='#dfe4ea'
                  >
                    <Picker.Item label="Select state" enabled={true} />
                    {stateList}
                  </Picker>
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{translations.Register.registerDistrict}</Text>
                <TouchableOpacity style={[styles.input, {height: 50, alignItems: 'center'}]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={districtPickerValue}
                    onValueChange={ (itemValue) => {
                      setDistrictPickerValue(itemValue);
                      setInfo({
                        ...info,
                        district_id: itemValue,
                      })
                      getBlocks(itemValue);
                    } }
                    backgroundColor='#dfe4ea'
                  >
                    <Picker.Item label="Select district" enabled={true} />
                    {districtList}
                  </Picker>
                </TouchableOpacity>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>{translations.Register.registerBlock}</Text>
                <TouchableOpacity style={[styles.input, {height: 50, alignItems: 'center'}]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={blockPickerValue}
                    onValueChange={ (itemValue) => {
                      setBlockPickerValue(itemValue);
                      setInfo({
                        ...info,
                        location_id: itemValue,
                      })
                    } }
                    backgroundColor='#dfe4ea'
                  >
                    <Picker.Item label="Select block" enabled={true} />
                    {blockList}
                  </Picker>
                </TouchableOpacity>
              </View>
      
              <TouchableOpacity
                style={styles.registerButton}
                onPress = {() => {handleSubmit()}}
              >
                <Text style={styles.registerButtonText}>{translations.Register.registerText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=> {
                    navigation.navigate('LogIn')
                }}
              >
                <Text style={styles.loginText}>
                  {translations.Register.registerAccount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '2%',
  },
  authBox: {
    width: '95%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 250,
    height: 50,
    backgroundColor: '#eb4d4b',
    borderRadius: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -13,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  registerTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    color: 'black',
  },
  registerButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});