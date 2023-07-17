import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Hyperlink from 'react-native-hyperlink';
import { LocalizationContext } from '../components/LocalisationContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function SupportScreen({ navigation }) {
    const { translations } = useContext(LocalizationContext);
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
                <Text style={styles.heading}>{translations.Support.title}</Text>
            </View>
            <ScrollView>
            <View style={styles.description}>
            <Text style={styles.descriptionText1}>KISAN Version : 2.0</Text>
                <Text style={styles.descriptionText1}>{translations.Support.full_form}</Text>
                <Text style={styles.descriptionText2}>{translations.Support.description}</Text>
                <Text style={styles.contacts}>{translations.Support.contact}</Text>
                <Text style={[styles.contactPerson, {fontSize: 16, fontWeight: 'bold', paddingTop: 10}]}>{translations.Support.name}</Text>
                <Text style={styles.contactPerson}>{translations.Support.designation}</Text>
                <Text style={styles.contactPerson}>{translations.Support.department}</Text>
                <Text style={styles.contactPerson}>{translations.Support.address_line1}</Text>
                <Text style={styles.contactPerson}>{translations.Support.address_line2}</Text>
                <Text style={styles.contactPerson}>{translations.Support.address_line3}</Text>
                <View style={{flexDirection: 'row'}} >
                    <Text style={[styles.contactPerson, {fontSize: 16}]}>{translations.Support.email}: </Text>
                    <Hyperlink linkDefault={ true } >
                        <Text style={[styles.contactPerson, {fontSize: 16, color: 'blue', textDecorationLine: 'underline'}]} >khushboo_m@nrsc.gov.in</Text>
                    </Hyperlink>
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
      padding: 10,
    //  backgroundColor: '#F3EFCC',
    },
    header: {
        alignItems: 'center',
        paddingTop: 10
    },
    heading: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#32502E'
    },
    description:{
        padding: 10,
        borderColor:'#32502E',
        borderWidth:2,
        marginVertical:10,
        marginHorizontal: 10,
        borderRadius:10,
        backgroundColor:'#F3EFCC',
    },
    descriptionText1:{
        fontSize:16,
        color:'#000',
        textAlign:'justify',
        paddingTop:5,
    },
    descriptionText2:{
        fontSize:16,
        color:'#000',
        textAlign:'justify',
        paddingTop:5,
    },
    contacts:{
        fontSize:16,
        paddingTop:20,
        color:'#000',
        fontWeight:'bold',
    },
    contactPerson: {
        fontSize:16,
        color:'#000',
    },
})
