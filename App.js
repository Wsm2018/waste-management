import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, LogBox } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./app/Home";
<<<<<<< Updated upstream
=======
import Details from "./app/Details";
import Forgot from "./auth/Forgot";
>>>>>>> Stashed changes
import db from "./db";
LogBox.ignoreAllLogs();
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

<<<<<<< Updated upstream
const AuthNavigator = createStackNavigator({
  Register,
  Login,
});
=======
const AuthNavigator = createStackNavigator(
  {
    // Welcome,

    Forgot,
    Register,
    Login,
  },
  {
    headerMode: null,
  }
);
>>>>>>> Stashed changes

const AuthContainer = createAppContainer(AuthNavigator);

const AppNavigator = createStackNavigator({
  Home,
});

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return user ? <AppContainer /> : <AuthContainer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
