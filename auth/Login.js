import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
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

    <View style={{ flex: 1, backgroundColor: colors.LIGHTGRAY }}>
      {/* <LinearGradient
        colors={['#82c582', '#60bd90', '#50ba94']}
        style={styles.container}
      > */}
      <View style={{ flex: 1 }}>
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
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor:colors.GREEN,
                borderBottomWidth:4
              }}
            >
              <Text style={{fontSize:20, color:colors.DARKGRAY}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor:colors.GREEN,
                borderBottomWidth:4
              }}
            >
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
          {/* <Text
            style={{
              fontSize: 30,
              borderBottomWidth: 4,
              borderColor: colors.GREEN,
              // backgroundColor:colors.WHITE,
              width:"50%",
              textAlign:"center"
            }}
          >
            Log In
          </Text> */}
        </View>
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
              Username
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
                  // backgroundColor: colors.WHITE,
                  // height: 50,
                  // borderRadius: 100,
                  // paddingLeft: 15,
                  // paddingRight: 15,
                  width: '90%',
                }}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  size={24}
                  type="ionicon"
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ width: '90%', alignItems: 'flex-end', marginTop: '3%' }}
          >
            <TouchableOpacity>
              <Text style={{ color: colors.DARKGRAY }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            //  backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => login()}
            style={{
              width: '80%',
              backgroundColor: colors.GREEN,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}
          >
            <Text style={{ color: colors.WHITE, fontSize: 18 }}>Login</Text>
          </TouchableOpacity>
        </View>
        {/* <Text>Login Screen</Text>
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
          <Button title="Login" onPress={() => login()} /> */}
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
            <Button color={'#005c1f'} title="Forgot Password" onPress={()=>navigation.navigate("Forgot")}/>
            <Button color={'#005c1f'} title="New User? Register" onPress={()=>navigation.navigate("Register")}/>
          </View>

          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            
            <TouchableOpacity 
            style={{justifyContent:'center',
              alignItems:'center',
              backgroundColor:'#a6edbe',
              width:'90%',
              borderRadius:20,
              height:'80%'}} 
              onPress={() => login()} >
                <Text  style={{fontSize:25,color:'#005c1f'}}>Login</Text>
              </TouchableOpacity>

            {/* <View style={{backgroundColor:'red',width:'100%',height:'70%'}}>
            </View> */}
          </View>

          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            {modalMessage}
          </Text>
        </View>
      </Modal>
      {/* </LinearGradient> */}

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
