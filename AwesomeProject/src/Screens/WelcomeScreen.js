import React, { useState,useContext,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image,Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from '../components/LocalisationContext';

const B = (props) => <Text style={{fontWeight: 'bold', fontSize: 30}}>{props.children}</Text>
const I = (props) => <Text style={{fontStyle: 'italic'}}>{props.children}</Text>

export default function Welcome ({navigation}) {
 //   const { translations } = useContext(LocalizationContext)
    
    const { translations, setAppLanguage } = useContext(LocalizationContext);
    
    const [lang, setLang] = useState('');

    useEffect(async() => {

        
        let language;
        language = await AsyncStorage.getItem('appLanguage');            
        console.log('the language in welcome is: '+language);
        
         if (language){
             setLang(language);
             setAppLanguage(language);
         }
    })
    
    return(
            <ImageBackground  source={require('../../assets/images/bg1.jpg')}
                style={{ flex: 1}}
            >
                <View style = { [styles.container, {flexDirection :'column'}] }>
                <View style = {styles.logocontainer}>
                <View style={{ alignItems : 'center' }} >
                    <Image
                             style={styles.logo1}
                            source={require('../../assets/images/iitrlogo.png')}
                        /></View>       
                        
                <View style={{flex:1 ,height:100, alignItems : 'center'}} >               
                        <Image
                             style={styles.logo2}
                            source={require('../../assets/images/imd_logo.png')}
                        /> 
                </View>                         
                <View style={{ alignItems : 'center'  }} >
                        <Image
                             style={styles.logo1}
                            source={require('../../assets/images/nrsc-logo.png')}
                        /></View>
                </View>
                    <View style = {[styles.header, {flex : 3}]}>
                        <Text style = {styles.headerText}>{translations.Welcome.welcomeText}</Text>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/images/Logo.png')}
                        />
                        <Text style = {{
                            fontSize : 20,
                            marginTop : 0,
                            fontFamily : 'times new roman',
                            color:'white',
                        }}>
                            <I>{translations.Welcome.app}</I>
                        </Text>
                        <Text style ={styles.logodescription}>
                            {translations.Welcome.appDescription}
                        </Text>
                    </View>
                    <Animatable.View style = { styles.card} animation = 'fadeInUpBig'>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> {
                                    navigation.navigate('Register')
                            }}>
                                <Text style={styles.buttonText}>{translations.Welcome.registerButton}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> {
                                    navigation.navigate('LogIn')
                            }}>
                                <Text style={styles.buttonText}>{translations.Welcome.loginButton}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottom}>
                                <Text style ={styles.footerText}>
                                {translations.Welcome.appfooter}
                                </Text>
                                <Text style ={styles.bottomText}>
                                {translations.Welcome.termsConditions}
                                </Text>
                        </View>
                    </Animatable.View>
                    </View>
            </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1   ,
        width: '100%',       
        margin : 0,
        alignItems:  'center',
        padding:0,  
    },    
    logocontainer : {
      //  backgroundColor :'#B33771', 
         width: '100%',
        flex: 1,      
      margin : 10,
      padding:10,
    flexDirection :'row',alignItems:  'center'
    },
    header : {
        alignItems : 'center',
        color:'#FFE77AFF',
    },
    headerText : {
        fontSize : 20,
        marginTop : 40,
        fontFamily : 'times new roman',
        color:'white',
    },
    logo2: {
        height: 140,
        resizeMode: 'contain',
        margin : 10,
        padding:10,
    aspectRatio: 1,
    },
    logo1: {
        width: 80,
        height: 80,
        margin : 10,
        padding:10,
        resizeMode: 'contain',
    },
    logo3: {
        width: 100,
        height: 100,
       // margin : 10,
        padding:10,
        resizeMode: 'contain',
    },
    logo: {
       // width: '100%',
        height: 70,
        margin : 0,
        padding:0,
        resizeMode: 'contain'
    },
    card : {width: '100%',
        //fontSize : 30,
        marginTop : 0,
        flex: 2,
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 50,
        borderTopRightRadius :50,
    },
    logodescription : {
        fontSize : 20,
      //  marginTop : 10,
        fontFamily : 'times new roman' ,
        textAlign : 'center',
        paddingHorizontal : 5,
        lineHeight : 25,
        color:'white',
    },
    buttonWrapper: {        
        alignItems:'center',
        flex: 1,
        padding:0,
       // margin:20,
    },
    button : {
        display : 'flex',
        alignItems : 'center',
        backgroundColor :'#B33771',
        borderRadius : 10,
        elevation :  2,
        shadowColor : '#000',
        shadowOffset : {width :2, height : 2},
        shadowOpacity : 0.25,
        shadowRadius : 3.5,
        height:40,
        margin:5,
        width:'80%',
    },
    buttonText : {
        marginTop:6,
        color: '#fff',
        fontWeight : 'bold',
         fontFamily : 'times new roman' ,
        fontSize:20 ,
    },
    bottomText : {
        fontSize :15,
        fontWeight : 'bold',
        position :'absolute',
        bottom :15,
        fontFamily : 'times new roman' ,
    },
    footerText : {
        fontSize :15,
        textAlign : 'center',
       // fontWeight : 'bold',
        position :'absolute',
        bottom :40,
        fontFamily : 'times new roman' ,
    },
    bottom:{
        alignItems:'center',
        flex: 1,
    }

});
