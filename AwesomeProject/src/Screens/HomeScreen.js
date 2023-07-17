import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet,ActivityIndicator, ImageBackground, useWindowDimensions, Alert, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Moon, Rain, Sun, Cloud } from 'svg';
import bgImg from '../components/BgImg';
import Header from '../components/Header';
import { LocalizationContext } from '../components/LocalisationContext';


// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;

const weatherIcon = (weatherType) => {
    if (weatherType == 'Sunny') {
        return <Sun width={34} height={34} fill="#fff" />
    }
    if (weatherType == 'Rainy') {
        return <Rain width={34} height={34} fill="#fff" />
    }
    if (weatherType == 'Cloudy') {
        return <Cloud width={34} height={34} fill="#fff" />
    }
    if (weatherType == 'Night') {
        return <Moon width={34} height={34} fill="#fff" />
    }
}

export default function HomeScreen({navigation}) {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()
    //const { translations } = useContext(LocalizationContext);

    const { translations, setAppLanguage } = useContext(LocalizationContext);
    const [loading,setLoading]=useState(true);
    const [weather, setWeather] = useState([{}])
    let index=1




    const [location, setLocation] = useState({
        state: '',
        district: '',
        block: ''
    });
    const [lang, setLang] = useState('');

    // const[userInfo, setUserInfo] = useState({
    //     name: '',
    //     mobile: '',
    //     location_id: '',
    // });

    const getWeather = (id) => {
       // getmyloc();
        let WeatherAPIURL = global.server_url+"/get_weather.php";

        console.log(WeatherAPIURL);
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        let Data = {
            location_id: id,
            weather_date: new Date().toISOString().slice(0, 10),

        };
        fetch(
            WeatherAPIURL,
            {
                method: 'POST',
                headers: header,
                body: JSON.stringify(Data)
            }
        )
        .then((response) => response.json())
        .then((response) => {
           console.log("response length",response.length);
            //console.log(response);
            //console.log(Data);
            setLoading(false);
            if(response.length>0){
                setLoading(false);
                setWeather(response);

                //console.log(response);
              
                //storeWeatherType(response.weather_type_en);
                //console.log(response[1].rainfall);
                //console.log(setWeather);

            }
            else{
                Alert.alert("Alert!","Data not available for selected location");
                setLoading(false);
                


            }
            let adv_weather='adv_weather';
            //console.log(weather[adv_weather][lang]);
        })
        .catch((error) => {
            setLoading(false);
            console.log(" "+ error);
            //Alert.alert("Error! "+"  " + error);
            Alert.alert("Some error occurred");
            
        
        })

    }

    const storeWeatherType = async (type) => {
        try {
            await AsyncStorage.setItem('weatherType', type);
        } catch(e) {
            console.log(e);
        }
    }
    let info;
    let loc;
    async function getLoc(){
        try {
            info = await AsyncStorage.getItem('userInfo');
             loc=await AsyncStorage.getItem('userLocation')  ;
             loc = JSON.parse(loc);
             setLocation({...loc});
             info = JSON.parse(info);
            getWeather(info.location_id);
        } catch(e) {
            console.log(e);
        }
    }
   // useEffect(() => {
        useEffect(async() => {
        // console.log("home screen loaded");
        // AsyncStorage.getItem('userLocation').then((loc)=>{
        //     loc = JSON.parse(loc);
        //     setLocation({...loc});
        // })
        setTimeout( () => {
             getLoc();
        },3000);
        let language;
        try {
            language = await AsyncStorage.getItem('appLanguage');
            console.log('the language in home is: '+language);
            setLang(language);
            setAppLanguage(language);
        } catch(e) {
            console.log(e);
        }


        // try {
        //    loc= await AsyncStorage.getItem('userLocation');
        //         loc = JSON.parse(loc);
        //         console.log("getting loc "+loc);
        //         // setUserInfo({...info});
        //         setLocation({...loc});

        // } catch(e) {
        //     console.log(e);
        // }

    }, [])
    // useEffect(async() => {
    //     console.log("home screen loaded");
    //     let info;
    //     let loc;
    //     try {
    //         info = await AsyncStorage.getItem('userInfo');
    //         loc=await AsyncStorage.getItem('userLocation')  ;

    //     } catch(e) {
    //         console.log(e);
    //     }
    //     // AsyncStorage.getItem('userLocation').then((loc)=>{
    //     //     loc = JSON.parse(loc);
    //     //     setLocation({...loc});
    //     // })
    //     info = JSON.parse(info);
    //     getWeather(info.location_id);
    //     loc = JSON.parse(loc);
    //     setLocation({...loc});
    //     // try {
    //     //    loc= await AsyncStorage.getItem('userLocation');
    //     //         loc = JSON.parse(loc);
    //     //         console.log("getting loc "+loc);
    //     //         // setUserInfo({...info});
    //     //         setLocation({...loc});

    //     // } catch(e) {
    //     //     console.log(e);
    //     // }

    // }, [])

    return (
        <>



            <ImageBackground
                source={bgImg}
                style={{
                    flex: 1,
                    }}
            >
            {loading==true &&
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <ActivityIndicator color={"#694fad"} size="large" />
            </View>
          }
            {loading==false &&

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: 10,
                    }}
                >
                    <View style={styles.topContainer}>
                        <View>
                            <Text style={styles.location}>{location.block}, {location.district}, {location.state}</Text>
                            <Text style={styles.time}>{(new Date().toDateString())}</Text>
                        </View>
                       {/* <View>
                            <View style={{flexDirection: 'row',}}>
                                <View style={{paddingTop: 20}}>
                                    <Text style={styles.temperature}>{weather.cur_temp}</Text>
                                    <Text style={styles.weatherType}> {weather['adv_weather'][lang]}</Text>
                                </View>
                                <View style={{paddingLeft: 20, paddingTop: 5}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="caret-up" color='#ee8755' size={40} />
                                        <Text style={[styles.temperature2]}>{weather.max_temp}{(translations.Home.max)}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Icon name="caret-down" color='#55d3ee' size={40} />
                                        <Text style={[styles.temperature2]}>{weather.min_temp}{(translations.Home.min)}</Text>
                                    </View>
                                </View>
                            </View>

                        </View> */}
                    </View>
                    <Text style={{color:'#fff',textAlign: 'center', fontSize: 20,fontWeight: 'bold',padding:10}}>{translations.Home.forecast}</Text>
                   {/*<View style={styles.bottomContainer}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>{translations.Home.wind}</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{weather.wind}</Text>
                            <Text style={styles.detailsText}>{translations.Home.wind_unit}</Text>
                            <View style={styles.bar}>
                                <View style={{width: weather.wind/2, height: 5, backgroundColor: '#69F0AE'}} />
                            </View>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', marginRight: 20, borderRightWidth: 1}} />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>{translations.Home.rain}</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{weather.rain}</Text>
                            <Text style={styles.detailsText}>{translations.Home.rain_unit}</Text>
                            <View style={styles.bar}>
                                <View style={{width: weather.rain/2, height: 5, backgroundColor: '#F44336'}} />
                            </View>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', marginRight: 20, borderRightWidth: 1}} />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.detailsText}>{translations.Home.humidity}</Text>
                            <Text style={[styles.detailsText, {fontSize: 24}]}>{weather.humidity}</Text>
                            <Text style={styles.detailsText}>%</Text>
                            <View style={styles.bar}>
                                <View style={{width: weather.humidity/2, height: 5, backgroundColor: '#F44336'}} />
                            </View>
                        </View>
                </View>*/}
                
                {console.log("Weather Length",weather.length)}
                {console.log("Weather Length",weather)}
                {weather.length>1 ?

                <View style={{borderRadius:30,backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
                <View style={styles.bottomContainerLast}>
                        <View style={{justifyContent:'center',width:'15%'}}>
                            <Text style={styles.detailsTitle}>{translations.Home.date}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:'25%'}}>
                            <Text style={styles.detailsTitle}>{translations.Home.temp}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:'20%'}}>
                            <Text style={styles.detailsTitle}>{translations.Home.humidity}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:'20%'}}>
                            <Text style={styles.detailsTitle}>{translations.Home.wind}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:'20%'}}>
                            <Text style={styles.detailsTitle}>{translations.Home.cloud} / </Text>
                            <Text style={styles.detailsTitle}>{translations.Home.rain}</Text>
                        </View>
                </View>
                {weather.map((weather)=>(
                        <View key={index++} style={styles.bottomContainer}>
                            <View style={{justifyContent:'center',width:'15%'}}>
                                <Text style={styles.detailsText}>{weather.forecast_date}</Text>
                            </View>
                            <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                            <View style={{justifyContent: 'center',width:'25%'}}>
                                <Text style={styles.detailsText}>{parseInt(weather.temperature_max)}&deg;C{(translations.Home.max)}</Text>
                                <Text style={[styles.detailsText]}>{parseInt(weather.temperature_min)}&deg;C{(translations.Home.min)}</Text>

                            </View>
                            <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                            <View style={{justifyContent: 'center',width:'20%'}}>
                                <Text style={styles.detailsText}>{weather.humidity}%</Text>
                                <Text style={[styles.detailsText]}>{weather.humidity2}%</Text>


                            </View>
                            <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                            <View style={{justifyContent: 'center',width:'20%'}}>
                                <Text style={styles.detailsText}>{weather.wind_speed}{translations.Home.wind_unit}</Text>
                                <Text style={[styles.detailsText]}>{weather.wind_direction}&deg;</Text>


                            </View>
                            <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                            <View style={{justifyContent: 'center',width:'20%'}}>
                                <Text style={styles.detailsText}>{weather.cloud_cover}%</Text>
                                <Text style={styles.detailsText}>{weather.rainfall}{translations.Home.rain_unit}</Text>

                            </View>
                        </View>
                ))}

            {/*
                <View style={styles.bottomContainer}>
                        <View style={{justifyContent:'center',width:'auto'}}>
                            <Text style={styles.detailsText}>{weather1.weather_date}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:'auto'}}>
                            <Text style={styles.detailsText}>{weather1.max_temp}{(translations.Home.max)}</Text>
                            <Text style={[styles.detailsText]}>{weather1.min_temp}{(translations.Home.min)}</Text>

                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:'auto'}}>
                            <Text style={styles.detailsText}>{weather1.humidity}%</Text>
                            <Text style={[styles.detailsText]}>{weather1.humidity2}%</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:'auto'}}>
                            <Text style={styles.detailsText}>{weather1.wind_speed}{translations.Home.wind_unit}</Text>
                            <Text style={[styles.detailsText]}>{weather1.wind_dir}&deg;</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:'auto'}}>
                            <Text style={styles.detailsText}>{weather1.weather_type}%</Text>
                            <Text style={styles.detailsText}>{weather1.rain}{translations.Home.rain_unit}</Text>

                        </View>
                </View>
                <View style={styles.bottomContainer}>
                        <View style={{justifyContent:'center',width:50}}>
                            <Text style={styles.detailsText}>{weather2.weather_date}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:95}}>
                            <Text style={styles.detailsText}>{weather2.max_temp}{(translations.Home.max)}</Text>
                            <Text style={[styles.detailsText]}>{weather2.min_temp}{(translations.Home.min)}</Text>

                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather2.humidity}%</Text>
                            <Text style={[styles.detailsText]}>{weather2.humidity2}%</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather2.wind_speed}{translations.Home.wind_unit}</Text>
                            <Text style={[styles.detailsText]}>{weather2.wind_dir}&deg;</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather2.weather_type}%</Text>
                            <Text style={styles.detailsText}>{weather2.rain}{translations.Home.rain_unit}</Text>

                        </View>
                </View>
                <View style={styles.bottomContainer}>
                        <View style={{justifyContent:'center',width:50}}>
                            <Text style={styles.detailsText}>{weather3.weather_date}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:95}}>
                            <Text style={styles.detailsText}>{weather3.max_temp}{(translations.Home.max)}</Text>
                            <Text style={[styles.detailsText]}>{weather3.min_temp}{(translations.Home.min)}</Text>

                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather3.humidity}%</Text>
                            <Text style={[styles.detailsText]}>{weather3.humidity2}%</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather3.wind_speed}{translations.Home.wind_unit}</Text>
                            <Text style={[styles.detailsText]}>{weather3.wind_dir}&deg;</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather3.weather_type}%</Text>
                            <Text style={styles.detailsText}>{weather3.rain}{translations.Home.rain_unit}</Text>

                        </View>
                </View>
                <View style={styles.bottomContainer}>
                        <View style={{justifyContent:'center',width:50}}>
                            <Text style={styles.detailsText}>{weather4.weather_date}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:95}}>
                            <Text style={styles.detailsText}>{weather4.max_temp}{(translations.Home.max)}</Text>
                            <Text style={[styles.detailsText]}>{weather4.min_temp}{(translations.Home.min)}</Text>

                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather4.humidity}%</Text>
                            <Text style={[styles.detailsText]}>{weather4.humidity2}%</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather4.wind_speed}{translations.Home.wind_unit}</Text>
                            <Text style={[styles.detailsText]}>{weather4.wind_dir}&deg;</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather4.weather_type}%</Text>
                            <Text style={styles.detailsText}>{weather4.rain}{translations.Home.rain_unit}</Text>

                        </View>
                </View>
                <View style={styles.bottomContainerLast}>
                        <View style={{justifyContent:'center',width:50}}>
                            <Text style={styles.detailsText}>{weather5.weather_date}</Text>
                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)',  borderRightWidth: 1}} />

                        <View style={{justifyContent: 'center',width:95}}>
                            <Text style={styles.detailsText}>{weather5.max_temp}{(translations.Home.max)}</Text>
                            <Text style={[styles.detailsText]}>{weather5.min_temp}{(translations.Home.min)}</Text>

                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather5.humidity}%</Text>
                            <Text style={[styles.detailsText]}>{weather5.humidity2}%</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather5.wind_speed}{translations.Home.wind_unit}</Text>
                            <Text style={[styles.detailsText]}>{weather5.wind_dir}&deg;</Text>


                        </View>
                        <View style={{borderRightColor: 'rgba(255, 255, 255, 0.7)', borderRightWidth: 1}} />
                        <View style={{justifyContent: 'center',width:70}}>
                            <Text style={styles.detailsText}>{weather5.weather_type}%</Text>
                            <Text style={styles.detailsText}>{weather5.rain}{translations.Home.rain_unit}</Text>

                        </View>
                </View>
                */}

                </View>
                :
                <View>
                    <Text style={styles.detailsTitle}>Data not Available</Text>
                    
                </View>}
                






                {/*<TableExample />*/}

                </View>
              }
            </ImageBackground>

        </>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    FeedbackButton: {
        backgroundColor: '#897396',
        height: 50,
        width: 100,
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    FeedbackButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    location: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    time: {
        color: '#fff',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    temperature: {
        color: '#fff',
        fontFamily: 'Courier',
        fontSize: 35,
    },
    temperature2: {
        color: '#fff',
        fontFamily: 'Courier',
        fontSize: 20,
    },
    weatherType: {
        color: '#fff',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 20,
    },
    bottomContainer: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,
        borderTopColor: 'rgba(255, 255, 255, 0.7)',
        borderTopWidth: 1
    },
    bottomContainerLast: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 8,

    },
    detailsText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Courier New',

        textAlign:'center'
    },
    detailsTitle:{
        color: 'white',
        fontSize: 16 ,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        textAlign:'center'
    },
    bar: {
        width: 45,
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }
});
