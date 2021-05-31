import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import HomeManager from './HomeManager';
import HomeCrew from './HomeCrew';
import HomeUser from './HomeUser';
import db from '../db'
// import { HomeManager, HomeCrew, HomeUser } from './';


export default function Home({ navigation }) {
  //const [userType, setUserType] = useState("Manager");
   const [userType, setUserType] = useState("Crew");
  const [user, setUser] = useState();
  // const [userType, setUserType] = useState("User");

  //get the user role from db 
  useEffect(() => {
    getUserType()
  })
  //get the user role from db
  const getUserType = async () => {
    const loggedInUser = await db
      .collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .get();
    setUserType(loggedInUser.data().role)
  }
  const manager = "Manager"
  const crew = "Worker"
  const user1 = "User"

  return (
    user && user.role === manager ?
      <HomeManager navigation={navigation}/> :
      user && user.role === crew ?
        <HomeCrew navigation={navigation} />
        :
        <HomeUser navigation={navigation} />
    // <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
    //   <TouchableOpacity onPress={()=> navigation.navigate('Report')}>
    //   <Text >GO</Text>
    //   </TouchableOpacity>

    // </View>
  );
}
