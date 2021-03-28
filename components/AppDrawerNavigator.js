import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'

import MyGivenWorksScreen from "../Screens/MyGivenWorksScreen.js"
import MyWorksScreen from "../Screens/MyWorksScreen.js"
import NotificationsScreen from "../Screens/NotificationsScreen"

import SettingScreen from "../Screens/SettingScreen.js"

import { Icon } from "react-native-elements";
export const AppSideNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    // navigationOptions:{
    //   drawerIcon:<Icon name="home" type="entypo"/>
    // }
    },
    Setting:{
      screen: SettingScreen,
      // navigationOptions:{
      //   drawerIcon:<Icon name="settings" type="ionicons"/>
      // }
    },
    MyGivenWorks: {
      screen: MyGivenWorksScreen,
      // navigationOptions:{
      //   drawerIcon:<Icon name="gift" type="fontawesome5"/>
      // }
    },
    Notifications: {
      screen: NotificationsScreen,
      // navigationOptions:{
      //   drawerIcon:<Icon name="notifications" type="ionicons"/>
      // }
    },
    MyWorks: {
      screen: MyWorksScreen,
      // navigationOptions:{
      //   drawerIcon:<Icon name="gift" type="entypo"/>
      // }
    }
  },

  {
    initialRouteName : 'Home'
  })