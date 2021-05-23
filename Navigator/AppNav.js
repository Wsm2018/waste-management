import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import Home from "../app/Home";
import Details from "../app/Details";
import ScheduleManagement from "../app/ScheduleManagement";
import ScheduleEdit from "../app/ScheduleEdit";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import {Dimensions} from 'react-native';
var { width, height } = Dimensions.get('window');
import SideMenu from '../app/SideMenu';

// const HomeStack = createStackNavigator(
//   {
//     Home,
//   },
//   {
//     headerMode: null,
//   }
// );

// const DetailsStack = createStackNavigator(
//   {
//     Details,
//   },
//   {
//     headerMode: null,
//   }
// );

// const ScheduleManagementStack = createStackNavigator(
//   {
//     ScheduleManagement,
//   },
//   {
//     headerMode: null,
//   }
// );

// const ScheduleEditStack = createStackNavigator(
//   {
//     ScheduleEdit,
//   },
//   {
//     headerMode: null,
//   }
// );

export const AppStack = {
  Home: {
    screen: Home,
    navigationOptions: {
        headerShown: false,
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
        headerShown: false,
    }
  },
  ScheduleManagement: {
    screen: ScheduleManagement,
    navigationOptions: {
        headerShown: false,
    }
  },
  ScheduleEdit: {
      screen: ScheduleEdit,
      navigationOptions: {
          headerShown: false,
      }
  },
}


//drawer routes, you can add routes here for drawer or sidemenu
const DrawerRoutes = {
  'Home': {
    name: 'Home',
    screen: createStackNavigator(AppStack, { initialRouteName: 'Home', headerMode: 'none' })
  },
  'Details': {
    name: 'Details',
    screen: createStackNavigator(AppStack, { initialRouteName: 'Details', headerMode: 'none' })
  },
  'ScheduleManagement': {
    name: 'ScheduleManagement',
    screen: createStackNavigator(AppStack, { initialRouteName: 'ScheduleManagement', headerMode: 'none' })
  },
  'ScheduleEdit': {
    name: 'ScheduleEdit',
    screen: createStackNavigator(AppStack, { initialRouteName: 'ScheduleEdit', headerMode: 'none' })
  },
};

const TabNavigator = createDrawerNavigator(
  DrawerRoutes,
  {
      drawerWidth: width-(width/4),
      initialRouteName: 'Home',
      contentComponent: SideMenu,
  }
);

// const TabNavigator = createDrawerNavigator(
//   {
//     Home: HomeStack,
//     Details: DetailsStack,
//     ScheduleManagement: ScheduleManagementStack,
//     ScheduleEdit: ScheduleEditStack,
//   },
//   {
//     drawerPosition: "left",
    
//   }
// );

const AppContainer = createAppContainer(TabNavigator);

export default AppContainer;
