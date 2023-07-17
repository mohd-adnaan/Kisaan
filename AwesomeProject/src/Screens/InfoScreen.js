import React, { useContext ,useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, 
    Image,Alert} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LocalizationContext } from '../components/LocalisationContext';

const B = (props) => <Text style={{fontWeight: 'bold', fontSize: 30}}>{props.children}</Text>
const I = (props) => <Text style={{fontStyle: 'italic'}}>{props.children}</Text>

export default function InfoScreen ({navigation}) {
    const { translations } = useContext(LocalizationContext)
    return(
                  
            <ImageBackground source={require('../../assets/images/bg2.jpg')}   style={{ flex: 1}}    >
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
                        <Text style = {styles.headerText}><B>{translations.Info.infoScreenText}</B></Text>
                        {/* <Image
                            style={styles.logo}
                            source={require('../../assets/images/Logo.png')}
                        /> */}
                        <Text style = {{
                            fontSize : 20,
                            marginTop : 30,
                            fontFamily : 'times new roman',
                            color:'yellow',
                            textShadowColor:'#000',
                            textShadowOffset:{width: 5, height: 2},
                            textShadowRadius:10,
                        }}>
                            <I>{translations.Info.app}</I>
                        </Text>
                        <Text style ={styles.logodescription}>
                            {translations.Info.appDescription}
                        </Text>
                    </View>
                    {/* <Animatable.View style = { styles.card} animation = 'fadeInUpBig'> */}
                        {/* <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> {
                                    navigation.navigate('Register')
                            }}>
                                <Text style={styles.buttonText}>{translations.Info.registerButton}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button}
                                onPress={()=> {
                                    navigation.navigate('LogIn')
                            }}>
                                <Text style={styles.buttonText}>{translations.Info.loginButton}</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.bottom}>
                                <Text style ={styles.creditText}>
                                    {translations.Info.credit}
                                </Text>
                                <Text style ={styles.footerText}>
                                {translations.Info.appfooter}
                                </Text>
                                <Text style ={styles.bottomText}>
                                {translations.Info.termsConditions}
                                </Text>
                        </View>
                    {/* </Animatable.View> */}
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
        fontSize : 30,
        marginTop : 40,
        fontFamily : 'times new roman',
        color:'yellow',
        textShadowColor:'#000',
        textShadowOffset:{width: 5, height: 2},
        textShadowRadius:10,
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
    card : {//width: '100%',
        //fontSize : 30,
        marginTop : 10,
        flex: 2,
        justifyContent: 'space-around',
       // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderTopLeftRadius: 50,
        borderTopRightRadius :50,
    },
    logodescription : {flex: 1,//width:'100%',
        fontSize : 20,
        marginTop : 30,
        fontFamily : 'times new roman' ,
        justifyContent: 'space-around',
        textAlign : 'center',
        paddingHorizontal : 5,
        lineHeight : 25,
        color:'black',
        fontWeight : 'bold',
        textShadowColor:'#fff',
        textShadowOffset:{width: 5, height: 3},
        textShadowRadius:10,
    },
    creditText : {flex: 1,//width:'100%',
    fontSize : 20,
    marginTop : 0,
    fontFamily : 'times new roman' ,
    justifyContent: 'space-around',
    textAlign : 'center',
    paddingHorizontal : 5,
    lineHeight : 25,
    color:'black',
    fontWeight : 'bold',
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
        color: '#000',
        fontSize :15,
        fontWeight : 'bold',
        position :'absolute',
        bottom :15,
        fontFamily : 'times new roman' ,
    },
    footerText : {
        fontSize :15,
        textAlign : 'center',
        color: '#000',
       // fontWeight : 'bold',
        position :'absolute',
        bottom :40,
        fontFamily : 'times new roman' ,
    },
    bottom:{
        alignItems:'center',
        color: '#000',//width:'100%',
        flex: 1,
       // backgroundColor: 'rgba(255, 255, 255, 0.7)',
    }

});
