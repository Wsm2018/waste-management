import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import db from "../db"
import firebase from 'firebase'
export default function Details({ navigation }) {

  const disctrictID = "JMaD9lLn6ZXp8q47jQYb"

  const coords = [
    {
      lat:25.26347289101081, lng:51.40807664310735
    },
    {
      lat:25.26634480535935, lng:51.42207853808261
    },    
    {
      lat:25.268302889825293, lng:51.42640902106465
    },
    {
      lat:25.275482262617693, lng:51.41182972835845
    },
    {
      lat:25.25864270003971, lng:51.426120322199175
    },
    {
      lat:25.25302899346851, lng:51.42727511766106
    },
    
  ]

  const generate = async () => {
    coords.forEach(element => {
      console.log("Adding to DB");
      const res = db.collection('Districts').doc(disctrictID).collection("bins").add({
        capacity: 0,
        condition: false,
        location: new firebase.firestore.GeoPoint(element.lat, element.lng),
        temp: 0,
        type: "plastic",
        weight: 0
      });
      console.log('Added document with ID: ', res.id);
    });

  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details</Text>
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />
      <Text>Bin Generation</Text>
      <Button title="Generate Bin" onPress={() => generate()} />
    </View>
  );
}
