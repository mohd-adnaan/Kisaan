import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;

export default function Header({ title, barColor, locationEnabled=true }) {

    const [location, setLocation] = useState({
        state: '',
        district: '',
        block: ''
    });

    useEffect(async() => {
        let loc;
        try {
            loc = await AsyncStorage.getItem('userLocation');
        } catch(e) {
            console.log(e);
        }
        loc = JSON.parse(loc);
        setLocation({...loc});
    }, [])

    return (
        <View style={[styles.header, {backgroundColor: barColor}]}>
            <View>
                <Text style={styles.heading}>{title}</Text>
            </View>
            {locationEnabled ? (
                <View style={styles.textbox}>
                    <Text style={styles.location}>{location.block}, {location.district}, {location.state}</Text>
                    {/* <Text style={styles.date}>{new Date().toDateString()}</Text> */}
                </View>
             ) : null}
        </View>
    )
}
 
const styles=StyleSheet.create({
    header: {
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    heading: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    textbox:{
        width:160,
        paddingLeft:10
       // backgroundColor: '#F00',

    },
    location: {
        alignItems: 'flex-start',
        color: '#000',
        fontSize: 11,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        lineHeight : 12,
    },
    date: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
})