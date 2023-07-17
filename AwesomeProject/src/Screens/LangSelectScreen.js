import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard, 
  ImageBackground,
} from 'react-native';
import { AuthContext } from '../components/context';
import { LocalizationContext } from '../components/LocalisationContext';

export default function LangSelectScreen() {
  const { selectLang } = useContext(AuthContext);
  const { setAppLanguage } = useContext(LocalizationContext);
  const lang = [
    {shortform: 'hi', longform: 'हिंदी'},
    {shortform: 'en', longform: 'English'},
  ];
  global.lang = lang;

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
        
          <View style={styles.centerizedView}>
            <View style={styles.authBox}>
                <View style={styles.logoBox}>
                  <Image
                      style={{ width: 50, height: 50 , justifyContent:'center', alignItems:'center'}}
                      source={require('../../assets/images/icon.png')}
                  />
                  <Image
                      style={{ width: 200,  resizeMode: 'contain', justifyContent:'center', alignItems:'center'}}
                      source={require('../../assets/images/Logo.png')}
                  />
                </View>
                <View  style={styles.main}>
                  <Text style={styles.mainText}>अपनी भाषा का चयन करें</Text>
                  <Text style={styles.mainText}>Select your Language</Text>
                </View>
                {lang.map((item, key) => (
                <TouchableOpacity style={styles.hindiButton}key={key}
                        onPress={()=> {
                          console.log('here');
                          setAppLanguage(item.shortform);
                          selectLang(item.shortform);
                    }}>
                        <Text style={styles.hindiText}>{item.longform}</Text>
                </TouchableOpacity>
                ))}
            </View>
          </View>
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
    top: '25%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
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
    width: 280,
    height: 80,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  main : {
    marginTop : 5,
    alignItems : 'center',
    justifyContent : 'center',
  },
  mainText : {
    fontSize : 24,
    fontFamily : 'times new roman',
    fontWeight :'bold',
    textAlign : 'center',
    
  },
  hindiButton : {
    display : 'flex',
    alignItems : 'center',
    backgroundColor :'#B33771',
    borderRadius : 1000,
    elevation :  2,
    shadowColor : '#000',
    shadowOffset : {width :2, height : 2},
    shadowOpacity : 0.25,
    shadowRadius : 3.5,
    marginHorizontal: 60,
    paddingHorizontal:20,
    paddingVertical:10,
    marginTop :30,
  },
  hindiText:{
    color: '#fff',
    fontWeight : 'bold',
    fontFamily : 'times new roman' ,
    fontSize:22 ,
  },
});