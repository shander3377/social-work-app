import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import DoWorkScreen from '../Screens/DoWorkScreen';
import WorkDetailsScreen  from '../Screens/WorkDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  c : {
    screen : DoWorkScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  WorkDetailsScreen : {
    screen : WorkDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'DoWorkScreen'
  }
);
