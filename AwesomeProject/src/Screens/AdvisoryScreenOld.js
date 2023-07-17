import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    useWindowDimensions,
    Alert,
} from 'react-native';
import bgImg from '../components/BgImg';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from '../components/LocalisationContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;

const Tab = createMaterialTopTabNavigator();

export default function AdvisoryScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()
     
    const [advisory, setAdvisory] = useState({
            adv_weather: {en: "",hi: ""},
            adv_wheat: {en: "",hi: ""},
            adv_rice: {en: "",hi: ""},
            adv_sugarcane: {en: "",hi: ""},
            adv_fodder: {en: "",hi: ""},
            adv_maize: {en: "",hi: ""},
            adv_potato: {en: "",hi: ""},
            adv_mustard: {en: "",hi: ""}, 
            adv_vegetables: {en: "",hi: ""},
            adv_horti: {en: "",hi: ""},
            adv_cattle: {en: "",hi: ""},
            adv_poultry: {en: "",hi: ""},
            adv_fisheries: {en: "",hi: ""},
            adv_gen: {en: "",hi:"" }
    });

    const [lang, setLang] = useState('');
    useEffect(async() => {
        let info;
        try {
            info = await AsyncStorage.getItem('userInfo')
        } catch(e) {
            console.log(e);
        }
        info = JSON.parse(info);

        let language;
        try {
            language = await AsyncStorage.getItem('appLanguage');
            console.log('the language in advisory is: '+language)
            setLang(language);
            getAdvisory(info.district_id)
        } catch(e) {
            console.log(e);
        }
        
    }, []);
    const lang2 = (lang === 'en') ? 'hi' : 'en';

    const getAdvisory = (id) => {
        let AdvisoryAPIURL = global.server_url+"/get_advisory.php";
        
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let Data = {
            location_id: id,
            //adv_date: new Date().toISOString().slice(0, 10),
        };

        fetch(
            AdvisoryAPIURL,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(Data)
            }
        )
        .then((response) => response.json())
        .then((response) => {
            response=response[0];
            if (response){

            console.log('advisory date '+ response.adv_date);
            var adv_date=new Date(response.adv_date).toDateString();
            adv_date=adv_date+"\n";
           // console.log(response);
            setAdvisory({
                adv_weather: {
                    en:adv_date+response.adv_weather_en,
                    hi:adv_date+ response.adv_weather_hi,
                }, 
                adv_wheat: {
                    en:adv_date+ response.adv_wheat_en,
                    hi:adv_date+ response.adv_wheat_hi},
                adv_rice: {
                    en:adv_date+ response.adv_rice_en,
                    hi:adv_date+ response.adv_rice_hi
                },
                adv_sugarcane: {
                    en:adv_date+ response.adv_sugarcane_en,
                    hi:adv_date+ response.adv_sugarcane_hi
                },
                adv_fodder: {
                    en:adv_date+ response.adv_fodder_en,
                    hi:adv_date+ response.adv_fodder_hi
                },
                adv_maize: {
                    en:adv_date+ response.adv_maize_en,
                    hi:adv_date+ response.adv_maize_hi,
                },
                adv_potato: { 
                    en:adv_date+ response.adv_potato_en,
                    hi:adv_date+ response.adv_potato_hi
                },
                adv_mustard: {
                    en:adv_date+ response.adv_mustard_en,
                    hi:adv_date+ response.adv_mustard_hi
                }, 
                adv_vegetables: {
                    en:adv_date+ response.adv_vegetables_en,
                    hi:adv_date+ response.adv_vegetables_hi
                },
                adv_horti: { 
                    en:adv_date+ response.adv_horti_en,
                    hi:adv_date+ response.adv_horti_hi
                },
                adv_cattle: {
                    en:adv_date+ response.adv_cattle_en,
                    hi:adv_date+ response.adv_cattle_hi
                },
                adv_poultry: {
                    en:adv_date+ response.adv_poultry_en,
                    hi:adv_date+ response.adv_poultry_hi
                },
                adv_fisheries: {  
                    en:adv_date+ response.adv_fisheries_en,
                    hi:adv_date+ response.adv_fisheries_hi
                },
                adv_gen: {
                    en:adv_date+ response.adv_gen_en,
                    hi:adv_date+ response.adv_gen_hi,
                }
            });
        }
        else{
            
            Alert.alert("Alert!","Data not available for selected location");

        }
        })
        .catch((error) => {
            console.log('advisory');
            Alert.alert("Error : " + error);
        })
    }

    const keys = Object.keys(advisory);

    let BgImg = '';

    let current = '';
    const display = ({ route }) => {
        current = route.name; 
        if ( current === 'adv_weather') {
            BgImg = bgImg;
        }
        if ( current === 'adv_wheat') {
            BgImg = require('../../assets/images/wheat.jpg');
        }
        else if ( current === 'adv_rice') {
            BgImg = require('../../assets/images/rice.jpg');
        }
        else if ( current === 'adv_sugarcane') {
            BgImg = require('../../assets/images/sugarcane.jpg');
        }
        else if ( current === 'adv_fodder') {
            BgImg = require('../../assets/images/fodder.jpg');
        }
        else if ( current === 'adv_maize') {
            BgImg = require('../../assets/images/maize.jpg');
        }
        else if ( current === 'adv_potato') {
            BgImg = require('../../assets/images/potato.jpg');
        }
        else if ( current === 'adv_mustard') {
            BgImg = require('../../assets/images/mustard.jpg');
        }
        else if ( current === 'adv_vegetables') {
            BgImg = require('../../assets/images/vegetables.png');
        }
        else if ( current === 'adv_horti') {
            BgImg = require('../../assets/images/horti.jpg');
        }        
        else if ( current === 'adv_cattle') {
            BgImg = require('../../assets/images/cattle.jpg');
        }       
        else if ( current === 'adv_poultry') {
            BgImg = require('../../assets/images/poultry.jpg');
        }       
        else if ( current === 'adv_fisheries') {
            BgImg = require('../../assets/images/fisheries.jpg');
        }
        else if ( current === 'adv_gen') {
            BgImg = require('../../assets/images/general.jpg');
        }

        let availLang;
        advisory[current][lang] !== null ? (availLang = lang) : (advisory[current][lang2] !== null ? availLang = lang2 : availLang = '');
        return (
            <>
                {
                    availLang !== '' ? (
                        <View
                            style={{width: windowWidth, height: windowHeight-195.2}} >
                            <ImageBackground
                            source={BgImg}
                            style={{
                                flex: 1,
                                }}
                            >
                                <View
                                    style={styles.container}
                                >
                                    {/* <View>
                                        <Text style={styles.nameText}>{translations.Advisory[current]}</Text>
                                    </View> */}
                                    <View style={styles.advisoryContainer}>
                                        <Text style={styles.advisoryText}>{advisory[current][availLang]}</Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                    ) : null
                }
            </>
        )
    }

    return (
        <>
            <Header title={translations.Advisory.advisoryTitle} barColor='#009387' />
            <Tab.Navigator>
                {keys.map((item, index) => {
                    return (
                        ( advisory[item][lang] !== null || advisory[item][lang2] !== null ) ? (
                        <Tab.Screen
                            name={item}
                            component={display}
                            key={index}
                            options={{
                                tabBarLabel: translations.Advisory[item],
                                tabBarScrollEnabled: true,
                            }}
                        />) : null
                    );
                })}
            </Tab.Navigator>
        </>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        padding: 10,
    },
    nameText: {
        color: '#fff',
        fontFamily: 'Courier',
        fontSize: 78,
    },
    advisoryContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginVertical: 5,
        borderRadius: 10,
        padding: 10,
        flex:1
    },
    advisoryText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
});
