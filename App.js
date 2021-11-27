import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import db from "./db";
import AuthContainer from "./Navigator/AuthNav";
import AppContainer from "./Navigator/AppNav";
// LogBox.ignoreAllLogs();

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
if (message.indexOf('Setting a timer') <= -1) {
   _console.warn(message);
   }
};

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
