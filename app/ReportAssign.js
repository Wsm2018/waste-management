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
import db from '../db'
import { LinearGradient } from 'expo-linear-gradient'

import { colors } from './common/theme'

export default function ReportAssign(props) {
  const [email, setEmail] = useState('')
  const details = props.navigation.getParam("item", "some default value");
  const [crew, setCrew] = useState([])

  useEffect(() => {

    db.collection("Crews").onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        r.push({ id: doc.id, ...doc.data() });
      });
      setCrew([...r]);
    })
  })

  const assign = (c) =>{
    console.log("ahaa??",details)
    db.collection("Reports").doc(details.id).update({
      assignedTo:c ,
      handledBy: firebase.auth().currentUser.uid,
      status: "Done",
      closingDateTime: new Date()+""
      })
    props.navigation.navigate('Home')
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.LIGHTGRAY }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <StatusBar hidden={false} /> */}
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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Report Assign</Text>
        }
        // containerStyle={styles.headerStyle}
        // innerContainerStyles={styles.inrContStyle}
        // statusBarProps={{ barStyle: "light-content" }}
        // barStyle="light-content"
        containerStyle={
          {
            // justifyContent: 'space-around',
            // height: 80,
          }
        }
      />
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 25, color: colors.BLACK }}>
            Available Crew
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            {crew.map((item, index) => (
              <View
                style={{
                  width: '100%',
                  backgroundColor: colors.WHITE,
                  minHeight: 100,
                  marginTop: 10,
                  flexDirection: 'row',
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 1,

                  elevation: 1,
                }}
              >
                <View style={{ width: '75%', justifyContent:"space-evenly", paddingLeft:10}}>
                  <Text style={{fontWeight:"bold", color:colors.black, fontSize:16}}>{item.crewNo}</Text>
                  {/* <Text style={{ color:colors.DARKGRAY}}>{item.driver}</Text>
                  <Text style={{ color:colors.DARKGRAY}}>{item.collector1} & {item.collector2}</Text> */}
                </View>
                <View style={{ width: '25%' }}>
                  <TouchableOpacity
                  onPress={()=>assign(item.id)}
                    style={{
                      width: '100%',
                      backgroundColor: colors.GREEN,
                      minHeight: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius:10,
                      borderBottomRightRadius:10
                    }}
                  >
                    <Text style={{color:colors.WHITE,}}>Assign</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
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
