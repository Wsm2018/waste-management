import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import HomeManager from "./HomeManager";
import HomeCrew from "./HomeCrew";
import HomeUser from "./HomeUser";
import db from "../db";
// import { HomeManager, HomeCrew, HomeUser } from './';

export default function Home({ navigation }) {
  // const [userType, setUserType] = useState({role:"Manager"});
  // const [userType, setUserType] = useState({role:"Worker"});
  const [userType, setUserType] = useState(false);

  //get the user role from db
  useEffect(() => {
    getUserType();
  }, []);
  
  //get the user role from db
  const getUserType = async () => {
    const loggedInUser = await db
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    setUserType(loggedInUser.data());
  };

  return userType !== false ? (
    userType !== null ? (
      userType.role === "Manager" ? (
        <HomeManager navigation={navigation} />
      ) : userType.role === "Worker" ? (
        <HomeCrew navigation={navigation} />
      ) : userType.role === "User" ? (
        <HomeUser navigation={navigation} />
      ) : (
        <ActivityIndicator />
      )
    ) : (
      <ActivityIndicator />
    )
  ) : (
    <ActivityIndicator />
  );
}
