import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
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
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  const validate = () => {
    if (email.length === 0 || password.length === 0) {
      setModalMessage("Email address or Password cannot be empty");
      setIsModalVisible(true);
      return false;
    }

    if (
      !new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
      ).test(password)
    ) {
      setModalMessage("Enter a strong password");
      setIsModalVisible(true);
      return false;
    }

    signUp();
  };

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        // firebase
        //   .auth()
        //   .collection("users")
        //   .doc(user.user.uid)
        //   .set({
        //     emailVerified: user.user.emailVerified,
        //     email: user.user.email,
        //     phoneNumber: user.user.phoneNumber,
        //     photoURL: user.user.photoURL,
        //     created: user.user.metadata.creationTime,
        //     displayName: user.user.email.split("@")[0],
        //   });
        console.log("done");
      });
  };

  return (
    <View style={{flex:1}}>
      <LinearGradient colors={['#82c582', '#60bd90', '#50ba94']} style={styles.container}>
      {/* <Image
        style={{
          aspectRatio:1/1,
          flex:0.5,
          alignSelf:"center"
        }}
        source={require('../assets/bg1.png')}
      /> */}
      <Text>Register Screen</Text>
      <Input placeholder="Email" label="Email" onChangeText={setEmail} />

      <Input
        placeholder="Password"
        label="Password"
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              size={24}
              type="ionicon"
              name={showPassword ? "eye-off-outline" : "eye-outline"}
            />
          </TouchableOpacity>
        }
      />
      <Text>
        Already have an account ?
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text>Log In</Text>
        </TouchableOpacity>
      </Text>

      <Button title="Login" onPress={() => validate()} />
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
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    justifyContent: 'center',
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
