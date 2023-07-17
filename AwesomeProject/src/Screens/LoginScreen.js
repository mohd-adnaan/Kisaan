import React, { useState, useContext } from 'react';
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
  Alert,
} from 'react-native';
import { LocalizationContext } from '../components/LocalisationContext';
import { AuthContext } from '../components/context';

export default function LoginScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    const { logIn } = useContext(AuthContext);
    const [mobileNo, setMobileNo] = useState('');

    const mobileNoCheck = (val) => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        for ( let i=0; i<numbers.length; i++ ) {
            if ( i == val.slice(-1) ) {
                setMobileNo( val )
          }
        }
    }
    
    const handleLogIn = () => {
        if( mobileNo.length<10 ) {
            Alert.alert(translations.Login.error)
        }
        else {
            logIn(mobileNo);
        }
    }
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
                                    style={{ width: 200, resizeMode: 'contain',  justifyContent:'center', alignItems:'center'}}
                                    source={require('../../assets/images/Logo.png')}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <Text style={styles.inputLabel}>{translations.Login.mobile}</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize='none'
                                    keyboardType="number-pad"
                                    textContentType='telephoneNumber'
                                    maxLength={10}
                                    onChangeText={(val) => {mobileNoCheck(val)}}
                                    value={mobileNo}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {handleLogIn()}}
                            >
                                <Text style={styles.loginButtonText}>{translations.Login.login}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=> {
                                    navigation.navigate('Register')
                                }}
                            >
                                <Text style={styles.registerText}>
                                {translations.Login.noAccount}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
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
        height: 90,
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
    loginButton: {
        backgroundColor: '#ff4757',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    registerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
  });
