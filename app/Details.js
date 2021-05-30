import React from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
import "firebase/auth";
export default function Details({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details</Text>
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />
    </View>
  );
}
