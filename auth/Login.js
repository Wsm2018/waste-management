import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

import { Input, Icon } from 'react-native-elements'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import Modal from 'react-native-modal'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'

import { colors } from '../app/common/theme'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)

  const [screenView, setScreenView] = useState('login')
  /**
   * Runs if modalVisible is true
   * Shows the error message for three seconds
   * Closes the modal after 3 seconds
   *
   */
  useEffect(() => {
    if (isModalVisible) {
      const time = setTimeout(() => {
        setIsModalVisible(false)
      }, 3000)
      return () => {
        console.log('from here pass')
        clearTimeout(time)
      }
    }
  }, [isModalVisible])

  const login = () => {
    if (email.length === 0 || password.length === 0) {
      setModalMessage('Email or Password cannot be empty')
      setIsModalVisible(true)
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
    }
  }

  // ---------REGISTER------------

  const validate = () => {
    if (registerEmail.length === 0 || registerPassword.length === 0) {
      setModalMessage(
        'registerEmail address or registerPassword cannot be empty',
      )
      setIsModalVisible(true)
      return false
    }

    if (
      !new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$',
      ).test(registerPassword)
    ) {
      setModalMessage('Enter a strong registerPassword')
      setIsModalVisible(true)
      return false
    }

    signUp()
  }

  const signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then((user) => {
        db.collection("users")
          .doc(user.user.uid)
          .set({
            emailVerified: user.user.emailVerified,
            email: user.user.email,
            phoneNumber: user.user.phoneNumber,
            photoURL: user.user.photoURL,
            created: user.user.metadata.creationTime,
            displayName: user.user.email.split("@")[0],
          });
        console.log("done");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setModalMessage("That email address is already in use!");
          setIsModalVisible(true);
        }
        if (error.code === "auth/invalid-email") {
          setModalMessage("That email address is invalid!");
          setIsModalVisible(true);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.LIGHTGRAY }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: colors.WHITE,
              height: 60,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={
                screenView === 'login'
                  ? styles.selectedScreen
                  : styles.unselectedScreen
              }
              onPress={() => setScreenView('login')}
            >
              <Text
                style={
                  screenView === 'login'
                    ? styles.selectedText
                    : styles.unselectedText
                }
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                screenView === 'signup'
                  ? styles.selectedScreen
                  : styles.unselectedScreen
              }
              onPress={() => setScreenView('signup')}
            >
              <Text
                style={
                  screenView === 'signup'
                    ? styles.selectedText
                    : styles.unselectedText
                }
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {screenView === 'login' ? (
          <View
            style={{
              flex: 3,
              // backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                marginBottom: '10%',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: '5%',
                  color: colors.BLACK,
                }}
              >
                E-mail
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.WHITE,
                  height: 50,
                  borderRadius: 100,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: '5%',
                  color: colors.BLACK,
                }}
              >
                Password
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: colors.WHITE,
                  height: 50,
                  borderRadius: 100,
                  paddingLeft: 15,
                  paddingRight: 15,
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={{
                    width: '90%',
                  }}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  value={password}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    size={24}
                    type="ionicon"
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: '90%',
                alignItems: 'flex-end',
                marginTop: '3%',
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: colors.DARKGRAY }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 3,
              // backgroundColor: 'yellow',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
                marginBottom: '10%',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: '5%',
                  color: colors.BLACK,
                }}
              >
                E-mail
              </Text>
              <TextInput
                style={{
                  backgroundColor: colors.WHITE,
                  height: 50,
                  borderRadius: 100,
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                onChangeText={setRegisterEmail}
                value={registerEmail}
              />
            </View>
            <View
              style={{
                width: '90%',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  marginBottom: '5%',
                  color: colors.BLACK,
                }}
              >
                Password
              </Text>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: colors.WHITE,
                  height: 50,
                  borderRadius: 100,
                  paddingLeft: 15,
                  paddingRight: 15,
                  alignItems: 'center',
                }}
              >
                <TextInput
                  style={{
                    width: '90%',
                  }}
                  onChangeText={setRegisterPassword}
                  secureTextEntry={!showRegisterPassword}
                  value={registerPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowRegisterPassword(!showRegisterPassword)}
                >
                  <Icon
                    size={24}
                    type="ionicon"
                    name={
                      showRegisterPassword ? 'eye-off-outline' : 'eye-outline'
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View
          style={{
            flex: 1,
            //  backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={screenView === 'login' ? () => login() : () => validate()}
            style={{
              width: '80%',
              backgroundColor: colors.GREEN,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
          >
            <Text style={{ color: colors.WHITE, fontSize: 18 }}>
              {screenView === 'login' ? 'Login' : 'Register'}
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
      </TouchableWithoutFeedback>
      

      {/* Error Message Modal */}
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        hasBackdrop={false}
        animationInTiming={1000}
        animationOutTiming={1000}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <View style={styles.modalContainer}>
          <View style={{ marginRight: 10 }}>
            <Icon
              type="material"
              name="error-outline"
              size={24}
              color="white"
            />
            {/* <Button
              color={'#005c1f'}
              title="Forgot Password"
              onPress={() => navigation.navigate('Forgot')}
            />
            <Button
              color={'#005c1f'}
              title="New User? Register"
              onPress={() => navigation.navigate('Register')}
            /> */}
          </View>

          {/* <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#a6edbe',
                width: '90%',
                borderRadius: 20,
                height: '80%',
              }}
              onPress={() => login()}
            >
              <Text style={{ fontSize: 25, color: '#005c1f' }}>Login</Text>
            </TouchableOpacity>

           
          </View> */}

          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {modalMessage}
          </Text>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: responsiveHeight(8),
    backgroundColor: 'rgba(250,0,0, 0.7)',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  selectedScreen: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GREEN,
    borderBottomWidth: 4,
  },
  unselectedScreen: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: colors.GREEN,
    // borderBottomWidth: 4,
  },
  selectedText: {
    fontSize: 20,
    color: colors.BLACK,
  },
  unselectedText: {
    fontSize: 20,
    color: colors.DARKGRAY,
  },
})
