import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from "react-native-elements";
import { LocalizationContext } from '../components/LocalisationContext';

// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;

export default function ProfileScreen({ navigation }) {

    const { translations } = useContext(LocalizationContext);

    const [location, setLocation] = useState({
        state: '',
        district: '',
        block: ''
    });

    const[userInfo, setUserInfo] = useState({
        name: '',
        mobile: '',
        location_id: '',
        language:''
    });

    useEffect(async() => {
        let info;
        let loc;
        try {
            info = await AsyncStorage.getItem('userInfo')
            loc = await AsyncStorage.getItem('userLocation');
        } catch(e) {
            console.log(e);
        }
        info = JSON.parse(info);
        loc = JSON.parse(loc);
        setUserInfo({...info});
        setLocation({...loc});
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Icon 
                    name="chevron-back" 
                    color='gray'
                    size={50}
                    onPress={() => {navigation.goBack()}}
                />
            </View>
            <View style={styles.header}>
                <Avatar
                    size="small"
                    rounded
                    title={userInfo.name.slice(0, 1)}
                    titleStyle={{color: 'white', fontWeight: 'bold'}}
                    activeOpacity={0.7}
                    avatarStyle={{backgroundColor: 'rgba(0, 87, 87, 0.2)'}}
                />
                <Text style={styles.heading}>{userInfo.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.bottom}>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.name}</Text>
                        <Text style={styles.field}>{userInfo.name}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.mobile}</Text>
                        <Text style={styles.field}>{userInfo.mobile}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.state}</Text>
                        <Text style={styles.field}>{location.state}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.district}</Text>
                        <Text style={styles.field}>{location.district}</Text>
                    </View>
                    <View style={styles.component}>
                        <Text style={styles.fieldName}>{translations.ProfileScreen.block}</Text>
                        <Text style={styles.field}>{location.block}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      padding: 20,
      backgroundColor: '#F3EFCC',
    },
    header: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    heading: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#32502E',
    },
    bottom: {
        padding: 5,
        borderColor:'#32502E',
        borderWidth:1,
        borderRadius : 10,
        backgroundColor: '#406343'
    },
    component: {
        padding: 5,
        paddingLeft: 25,
        marginHorizontal: 2,
        marginVertical:2,
        borderRadius: 0,
        borderWidth: 0,
        borderColor: '#5c5e5d',
        backgroundColor: '#F3EFCC',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 4,
    },
    fieldName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    field: {
        fontSize: 14,
        fontWeight:'700',
        color: '#406343',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: '85%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
    button: {
        backgroundColor: '#00a8a8',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
