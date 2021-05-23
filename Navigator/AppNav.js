import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import Home from "../app/Home";
import Details from "../app/Details";
import Report from "../app/Report";
import ReportDetail from "../app/ReportDetail";
import ReportAssign from "../app/ReportAssign";
import Priority from "../app/Priority";
import PriorityAssign from "../app/PriorityAssign";
import ScheduleMap from "../app/ScheduleMap";
import Chat from "../app/Chat";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

const HomeStack = createStackNavigator(
  {
    Home,
    Report,
    ReportDetail,
    ReportAssign,
    Priority,
    PriorityAssign,
    ScheduleMap,
    Chat
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
