import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "./Screens/WelcomeScreen";
import { AppDrawerNavigator, AppSideNavigator } from "./components/AppDrawerNavigator";
import { AppTabNavigator } from "./components/AppTabNavigator";

export default function App() {
  return <AppContainer />;
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  Drawer: { screen: AppSideNavigator },
  BottomTab: { screen: AppTabNavigator }
});

const AppContainer = createAppContainer(switchNavigator);