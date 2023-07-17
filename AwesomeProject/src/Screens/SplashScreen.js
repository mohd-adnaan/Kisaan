import React from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen() {
    return (
        <ImageBackground
            source={require('../../assets/images/grass.png')}
            style={styles.container}
        >
            <Animatable.View animation = 'flash' duration = {3000} iterationCount = {1}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/Logo.png')}
                />
            </Animatable.View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 400,
        height: 100,
        marginTop : 20,
        alignItems:'center',
        justifyContent: 'center'
    },
})