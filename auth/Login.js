import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
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
export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

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

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#82c582', '#60bd90', '#50ba94']}
        style={styles.container}
      >
        <View style={{flex:1}}>
          <Text>Login Screen</Text>
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
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                />
              </TouchableOpacity>
            }
          />
        <Button title="Register Screen" onPress={()=> navigation.navigate("Register")} />
          <Button title="Login" onPress={() => login()} />
        </View>

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
            </View>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {modalMessage}
            </Text>
          </View>
        </Modal>
      </LinearGradient>
    </View>
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
})
