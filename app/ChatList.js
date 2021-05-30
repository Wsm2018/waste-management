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
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native'

import { Input, Icon, Header } from 'react-native-elements'
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
import { colors } from './common/theme'
import db from '../db'
const { width, height } = Dimensions.get('window')

export default function ChatList(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [chats, setChats] = useState([])

  useEffect(() => {
    db.collection("Users").onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        r.push({ id: doc.id, ...doc.data() });
      });
      setChats([...r]);
    })
  })

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        console.log("------ Keyboard")
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        console.log("------ No Keyboard")
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);



  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.WHITE }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <Header
        backgroundColor={colors.GREEN}
        leftComponent={{
          icon: 'angle-left',
          type: 'font-awesome',
          color: colors.WHITE,
          size: 30,
          component: TouchableWithoutFeedback,
          onPress: () => {
            props.navigation.goBack()
          },
        }}
        centerComponent={
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Chats</Text>
        }
      />
<ScrollView style={{}}>
      <View
        style={{
          flex: 1,
          //backgroundColor: 'red',
          backgroundColor: colors.WHITE,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {
          chats.map(item =>
            item.id == firebase.auth().currentUser.uid ?
              null
              :
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Chat', { item })}
                style={{ 
                   justifyContent: "space-evenly",
                    paddingLeft: 30,
                     borderBottomWidth: 5,
                      borderColor:"#70a970", 
                      marginBottom:5, 
                      paddingTop:10 ,
                      backgroundColor:"#dfecdf", 
                      }}>
                <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.email}</Text>
                <Text style={{ color: colors.DARKGRAY }}>{item.role}</Text>
              </TouchableOpacity>
          )
        }


        {Platform.OS === 'ios' && <View style={{ flex: 0.2 }}></View>}
      </View>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
})
