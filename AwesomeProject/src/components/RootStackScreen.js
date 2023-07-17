import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../Screens/WelcomeScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';

const RootStack = createStackNavigator();

export default function RootStackScreen() {
    return (
        <RootStack.Navigator screenOptions={{headerShown: false}}>
            <RootStack.Screen name='Welcome' component={Welcome} />
            <RootStack.Screen name='Register' component={RegisterScreen} />
            <RootStack.Screen name='LogIn' component={LoginScreen} />
        </RootStack.Navigator>
    )
}
