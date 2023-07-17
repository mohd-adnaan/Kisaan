import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground,ScrollView} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Header from '../components/Header';
import { LocalizationContext } from '../components/LocalisationContext';

export default function LinksScreen({navigation}) {
    const { translations } = useContext(LocalizationContext);
    return (
        <>
            <Header title={translations.Links.linksTitle} barColor='#d02860' />
            <ImageBackground
                source={require('../../assets/images/useful-links.jpg')}
                style={{
                    flex: 1,
                    }}
            >
            <View style={styles.container}>
            
            <ScrollView>

                <Hyperlink linkDefault={ true }>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>1. {translations.Links.aws}:</Text>
                        <Text style={styles.linksText}>http://aws.imd.gov.in:8091</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>2.{translations.Links.dehradun_met}:</Text>
                        <Text style={styles.linksText}>https://rmcnewdelhi.imd.gov.in/MET_CENTRES/MCDDN</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>3. {translations.Links.amfu}:</Text>
                        <Text style={styles.linksText}>http://gkms.iitr.ac.in</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>4. {translations.Links.crowdsource}:</Text>
                        <Text style={styles.linksText}>https://city.imd.gov.in/citywx/crowd/enter_th_datag.php</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>5. {translations.Links.DAMINI}:</Text>
                        <Text style={styles.linksText}>https://play.google.com/store/apps/details?id=com.lightening.live.damini&hl=en</Text>
                    </View>
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>6. {translations.Links.Mausam}:</Text>
                        <Text style={styles.linksText}>https://play.google.com/store/apps/details?id=com.imd.masuam&hl=en</Text>
                    </View>                    
                    <View style={styles.linkBox}>
                        <Text style={styles.sourceText}>7. {translations.Links.Meghdoot}:</Text>
                        <Text style={styles.linksText}>https://play.google.com/store/apps/details?id=com.aas.meghdoot&hl=en</Text>
                    </View>
                    

                </Hyperlink>
            </ScrollView>
            </View>
            </ImageBackground>
        </>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,237,244, 0.7)'
    },
    linkBox: {
        padding: 10,
    },
    sourceText: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Courier New',
        fontWeight: 'bold',
    },
    linksText: {
        color: 'blue',
        fontSize: 16,
        fontFamily: 'Courier New',
        textDecorationLine: 'underline'
    },
})
