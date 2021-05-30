import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import Welcome from "../auth/Welcome";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Forgot from "../auth/Forgot";

LogBox.ignoreAllLogs();
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";

const AuthNavigator = createStackNavigator(
  {
    // Welcome,
    Login,
    Forgot,
    Register,
  },
  {
    headerMode: null,
  }
);

const AuthContainer = createAppContainer(AuthNavigator);
export default AuthContainer;
