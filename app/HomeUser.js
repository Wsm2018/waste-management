import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
import "firebase/auth";
export default function HomeUser({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Text>User Home</Text>
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />

    </View>

  );
}
