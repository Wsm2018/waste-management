import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import  HomeManager from './HomeManager';
import  HomeCrew  from './HomeCrew';
import  HomeUser  from './HomeUser';
// import { HomeManager, HomeCrew, HomeUser } from './';


export default function Home({ navigation }) {
  const [userType, setUserType] = useState("Manager");
  // const [userType, setUserType] = useState("Crew");
  // const [userType, setUserType] = useState("User");


  const manager = "Manager"
  const crew = "Crew"
  const user = "User"

  return (
    userType === manager ?
      <HomeManager /> :
      userType === crew ?
        <HomeCrew />
        :
        <HomeUser />
  );
}
