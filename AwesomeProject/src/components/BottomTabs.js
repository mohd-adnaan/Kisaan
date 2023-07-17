import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import AdvisoryScreen from '../Screens/AdvisoryScreen';
import LinksScreen from '../Screens/LinksScreen';
import FeedbackScreen from '../Screens/FeedbackScreen';
import { LocalizationContext } from './LocalisationContext';

const Tab = createMaterialBottomTabNavigator();

const BottomTabScreens = () => {
    const { translations } = useContext(LocalizationContext);
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#fff"
            shifting={false}
  barStyle={{ backgroundColor: '#694fad' }}
            //labeled={false}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    //title: 'Home',
                    title: translations.Home.homeTitle,
                    tabBarLabel: translations.Home.home_tab,
                    tabBarColor: '#897396',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Advisory"
                component={AdvisoryScreen}
                options={{
                   // title: 'Agromet Advisory', 
                    title: translations.Advisory.advisoryTitle,
                    tabBarLabel: translations.Advisory.advisory_tab,
                    tabBarColor: '#009387',
                    tabBarIcon: ({ color }) => (
                        <Icon name="information-circle" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    //title: 'Feedback',
                    tabBarLabel: translations.Feedback.feedbackTitle,
                    tabBarLabel: translations.Feedback.feedback_tab,
                    tabBarColor: '#d0b206',
                    tabBarIcon: ({ color }) => (
                        <Icon name="chatbox-ellipses" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    //title: 'Useful Links',
                    title: translations.Links.linksTitle,
                    tabBarLabel: translations.Links.links_tab,
                    tabBarColor: '#d02860',
                    tabBarIcon: ({ color }) => (
                        <Icon name="link" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabScreens;
