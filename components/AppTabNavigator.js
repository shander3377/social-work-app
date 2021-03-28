
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import  DoWorkScreen from '../Screens/DoWorkScreen.js'
import AskForSocialWorkScreen from '../Screens/AskForSocialWorkScreen.js'
export const AppTabNavigator = createBottomTabNavigator({
    AskForSocialWorkScreen : {
    screen: AskForSocialWorkScreen,
    navigationOptions :{
    
      tabBarLabel : "Request People for Social Work",
    }
  },
  DoWorkScreen: {
    screen: DoWorkScreen,
    navigationOptions :{

      tabBarLabel : "Do Social Work",
    }
  }
});