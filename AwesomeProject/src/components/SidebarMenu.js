import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet,    Alert } from 'react-native';
import {
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import { Avatar } from "react-native-elements";
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { AuthContext } from './context';
import { LocalizationContext } from './LocalisationContext';

// import { SERVER_URL } from '@env';
// const serverUrlphp=SERVER_URL;
const changeLang =  async() => {
  //  var currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    //console.log(currentLanguage);     
    
};


export function SidebarMenu(props) {
    const { logOut,selectLang } = useContext(AuthContext);
    
 // const {  } = useContext(AuthContext);
 // const {  } = useContext(LocalizationContext);
    const { translations,setAppLanguage } = useContext(LocalizationContext);

    // const [location, setLocation] = useState({
    //     state: '',
    //     district: '',
    //     block: ''
    // });

    const[userInfo, setUserInfo] = useState({
        name: '',
        mobile: '',
        location_id: '',
        language:''
    });
    useEffect(async() => {
        let info;
        try {
            info = await AsyncStorage.getItem('userInfo')
        } catch(e) {
            console.log(e);
        }
        info = JSON.parse(info);
        setUserInfo({...info});
    }, [])

    

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar
                                size="medium"
                                rounded
                                title={userInfo.name}
                                titleStyle={{color: 'white', fontWeight: 'bold'}}
                                activeOpacity={0.7}
                                avatarStyle={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userInfo.mobile}</Title>
                                <Caption style={styles.caption}>{userInfo.name}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name="home-outline" 
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={translations.Sidebar.home}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name="account-outline" 
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={translations.Sidebar.profile}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon2
                                    name="settings-outline" 
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={translations.Sidebar.settings}
                            onPress={() => {props.navigation.navigate('Settings')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name="account-check-outline" 
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={translations.Sidebar.support}
                            onPress={() => {props.navigation.navigate('Support')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name="alphabetical" 
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Language - English"//{translations.Sidebar.language}
                            onPress={() => {
                                var lang='en';                            
                               
                               setAppLanguage(lang);
                            }
                            }
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                    name="alphabetical" 
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="भाषा - हिन्दी"//{translations.Sidebar.language}
                            onPress={() => {
                                var lang='hi';                            
                               
                               setAppLanguage(lang);
                            }
                            }
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                            name="exit-to-app" 
                            color={color}
                            size={size}
                        />
                    )}
                    label={translations.Sidebar.logout}
                    onPress={() => 
                        Alert.alert(
                            "Log Out",
                            "Do you really want to log out?",
                            [
                                {
                                  text: "Yes",
                                  onPress: () => logOut()
                                },
                                {
                                  text: "No",
                                  onPress: () => console.log("Cancelled Log Out!"),
                                  style: "cancel"
                                }
                              ]
                        )
                    }
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });