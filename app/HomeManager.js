import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import MapView from 'react-native-maps';
export default function HomeManager({ navigation }) {
  const latitudeDelta = 0.0922
  const longitudeDelta = 0.0421
  const latitude = 25.286106
  const longitude = 51.534817

  return (

    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}
        showsUserLocation={true}
        provider="google"
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }}
      // userInterfaceStyle={"dark"}

      >
      </MapView>
      <View style={{ alignSelf:"center", backgroundColor: "red", width: "90%", minHeight: 60, position: "absolute", top: "6%" }}>
      <TouchableOpacity style={{height:65, backgroundColor:"yellow", aspectRatio:1/1, borderRadius:100, justifyContent:"center", alignItems:"center"}}>
            <Text>Drawer</Text>
          </TouchableOpacity>

      </View>

      <View style={{ alignSelf:"center", backgroundColor: "red", width: "90%", minHeight: 60, position: "absolute", bottom: "4%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

        <View>
        <TouchableOpacity style={{height:65, backgroundColor:"yellow", aspectRatio:1/1, borderRadius:100, justifyContent:"center", alignItems:"center"}}>
            <Text>Report List</Text>
          </TouchableOpacity>

        </View>
        <View>
        <TouchableOpacity style={{height:65, backgroundColor:"yellow", aspectRatio:1/1, borderRadius:100, justifyContent:"center", alignItems:"center"}}>
            <Text>Chat</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>

  );
}
