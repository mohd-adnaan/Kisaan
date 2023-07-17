import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    useWindowDimensions,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import bgImg from '../components/BgImg';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from '../components/LocalisationContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Transition,Transitioning } from 'react-native-reanimated';

// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;

const Tab = createMaterialTopTabNavigator();

const transition=(
    <Transition.Together>
        <Transition.In type="fade" durationMs={200}/>
        <Transition.Change/>
        <Transition.Out type="fade" durationMs={200}/>
    </Transition.Together>
)

export default function AdvisoryScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions()
    const [data,setData]=useState([]);
    const [data2,setData2]=useState([]);
    const [currentIndex,setCurrentIndex]=React.useState(null); 
    const [loading,setLoading]=useState(true);
    let k=0;
    let index=0;
    const ref=React.useRef();

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
            getAdvisory(info.location_id,info.district_id);
            console.log("loc_id"+info.location_id+" dist_id"+info.district_id);
        } catch(e) {
            console.log(e);
        }
        
    }, []);
    const lang2 = (lang === 'en') ? 'hi' : 'en';

    const getAdvisory = (id,d_id) => {
        let AdvisoryAPIURL = global.server_url+"/get_advisory.php";
        
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        let Data = {
            location_id: id,
            district_id: d_id
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
            setLoading(false);
            //response=response[0];
            if (response.length>0){
                setLoading(false);
            setData(response)
           
            }
        else{
            setLoading(false);
            Alert.alert("Alert!","Data not available.");

        }
        })
        .catch((error) => {
            setLoading(false);
            console.log("Error : " + error);
            Alert.alert("Some error occurred");
        })
    }
    let BgImg = require('../../assets/images/cloudy.png');


    

    
        return (
            <>
                {
                
                        <Transitioning.View
                        ref={ref}
                        transition={transition}
                            style={{width: windowWidth, height: windowHeight}} >
                            <ImageBackground
                            source={BgImg}
                            style={{
                                flex: 1,
                                }}
                            >
                                {data.length>0 ?
                        
        
                              <ScrollView>
                              
                                <View style={[styles.cardAcordion]}>
            {data.map(({custom_date,crop_name,advisory_eng,advisory_reg},index)=>{
                return<TouchableOpacity style={[styles.touchable]} key={k++} 
                onPress={()=>{
                    ref.current.animateNextTransition();
                    setCurrentIndex(index===currentIndex ? null:index);
                }} >
                <View style={[styles.card]}>
                <View style={{
        justifyContent:'space-between',
        display:'flex',
        flexDirection:'row',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius:10,
        padding:10,
        alignItems:'center'}}>
                    <Text style={{ color: '#000000',
        fontSize: 16 ,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        textAlign:'center'}}>{crop_name}</Text>
                    <Icon name={index===currentIndex ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={"#000000"} />
                    </View>
                    {index===currentIndex && (
                        <View style={[styles.advisory]}>
                        <View>
                    <Text>Date : {custom_date}</Text>
                    </View>
                    <View>
                    <Text>{advisory_eng}</Text>
                    </View>

                    <View>
                    <Text>{advisory_reg}</Text>
                    </View>
                    </View> )}
                </View>
                </TouchableOpacity>
                
                
            })}
            </View>
            <View style={[styles.extra]}></View>
            </ScrollView>
            : 
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,color:'#000000',textAlign:'center',fontWeight:'bold'}}>Data not Available</Text>
            </View>}
          

                            </ImageBackground>
                        </Transitioning.View>
                    
                }
            </>
        )
    
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
    card:{
        flexGrow:1,
        
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10
        
        
    },
    extra:{
        
        height:100,
        margin:40},

    advisory:{
        padding:10,
        fontSize:12,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius:10
        
    },
    
    
});
