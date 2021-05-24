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
import { LinearGradient } from 'expo-linear-gradient'

import { colors } from './common/theme'

export default function Priority(props) {
  const [screenView, setScreenView] = useState(true)
  const [priority, setPriority] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
  ])

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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Priority</Text>
        }
        // rightComponent={{
        //   icon: screenView ? 'history' :'format-list-bulleted',
        //   type: 'material',
        //   color: colors.WHITE,
        //   size: 30,
        //   component: TouchableWithoutFeedback,
        //   onPress: () => {
        //     setScreenView(!screenView)
        //   },
        // }}
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
            Priority List
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            {priority.map((item, index) => (
              <View
              key={index}
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
                  <Text style={{fontWeight:"bold", color:colors.black, fontSize:16}}> !! Priority {index}</Text>
                  <Text style={{ color:colors.DARKGRAY}}>Wakra, Qatar</Text>
                  <Text style={{ color:colors.DARKGRAY}}>Status - Date</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <TouchableOpacity
                  onPress={()=>props.navigation.navigate('PriorityAssign')}
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
                    <Text style={{color:colors.WHITE, textAlign:"center"}}>Find Crew</Text>
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
