import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Icon } from "react-native-elements";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import Modal from "react-native-modal";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import db from "../db";

export default function Forgot({ navigation }) {
  const [email, setEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = db.collection("users").onSnapshot((query) => {
      const userList = [];
      query.forEach((doc) => {
        userList.push(doc.data().email);
      });
      setUsers([...userList]);
    });
    return () => {
      unsub();
    };
  }, []);

  /**
   * Runs if modalVisible is true
   * Shows the error message for three seconds
   * Closes the modal after 3 seconds
   *
   */
  useEffect(() => {
    if (isModalVisible) {
      const time = setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);
      return () => {
        console.log("from here pass");
        clearTimeout(time);
      };
    }
  }, [isModalVisible]);

  const forgot = () => {
    if (email.length === 0) {
      setModalMessage("Email cannot be empty");
      setIsModalVisible(true);
    } else {
      if (users.includes(email)) {
        firebase
          .auth()
          .sendPasswordResetEmail(email)
          .then(() => {
            navigation.goBack();
          });
      } else {
        setModalMessage("User does not exist ");
        setIsModalVisible(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Forgot</Text>
      <Input placeholder="Email" label="Email" onChangeText={setEmail} />
      <Button title="Send Email" onPress={() => forgot()} />
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        hasBackdrop={false}
        animationInTiming={1000}
        animationOutTiming={1000}
        style={{ flex: 1, justifyContent: "flex-end" }}
      >
        <View style={styles.modalContainer}>
          <View style={{ marginRight: 10 }}>
            <Icon
              type="material"
              name="error-outline"
              size={24}
              color="white"
            />
          </View>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {modalMessage}
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: "center",
  },

  modalContainer: {
    flex: 1,
    flexDirection: "row",
    maxHeight: responsiveHeight(8),
    backgroundColor: "rgba(250,0,0, 0.7)",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
