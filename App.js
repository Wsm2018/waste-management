import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import Welcome from "./auth/Welcome";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./app/Home";
import Details from "./app/Details";
//import Forgot from "./auth/Forgot";
import db from "./db";
LogBox.ignoreAllLogs();
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { responsiveScreenHeight } from "react-native-responsive-dimensions";

const AuthNavigator = createStackNavigator({
  Welcome,
  Register,
  Login,
  
},{
  headerMode:null
}
);

const AuthContainer = createAppContainer(AuthNavigator);

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

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: HomeStack,
    Details: DetailsStack,
  },
  {
    // barStyle: {
    //   marginBottom: responsiveScreenHeight(2),
    //   width: "90%",
    //   alignSelf: "center",
    // },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return user !== false ? (
    user !== null ? (
      <AppContainer />
    ) : (
      <AuthContainer />
    )
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
