import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import Home from "../app/Home";
import Details from "../app/Details";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

const HomeStack = createStackNavigator(
  {
    Home,
  },
  {
    headerMode: null,
  }
);

const DetailsStack = createStackNavigator(
  {
    Details,
  },
  {
    headerMode: null,
  }
);

const TabNavigator = createDrawerNavigator(
  {
    Home: HomeStack,
    Details: DetailsStack,
  },
  {
    drawerPosition: "left",
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
