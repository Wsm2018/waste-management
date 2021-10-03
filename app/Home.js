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
  // const [userType, setUserType] = useState({role:"Manager"});
  const [userType, setUserType] = useState({role:"Worker"});
  // const [userType, setUserType] = useState({role:"User"});

  //get the user role from db 
  useEffect(() => {
    // getUserType()
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
  // const user1 = "User"

  return (
      userType && userType.role === manager ?
      <HomeManager navigation={navigation}/> :
      userType && userType.role === crew ?
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
