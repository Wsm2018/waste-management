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
import db from '../db'

import { colors } from './common/theme'

export default function Report(props) {
  const [screenView, setScreenView] = useState(true)
  const [reports, setReports] = useState([])

  useEffect(()=>{
    db.collection("Reports").onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
          r.push({ id: doc.id, ...doc.data() });
      });
      setReports([...r]);
 });
  
  })
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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Reports</Text>
        }
        rightComponent={{
          icon: screenView ? 'history' :'format-list-bulleted',
          type: 'material',
          color: colors.WHITE,
          size: 30,
          component: TouchableWithoutFeedback,
          onPress: () => {
            setScreenView(!screenView)
          },
        }}
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
            {screenView ? "Pending Reports" : "Reports History"}
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          {screenView ? <ScrollView>
            {reports.map((item, index) => (
              item.status == "done" ?
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
                  <Text style={{fontWeight:"bold", color:colors.black, fontSize:16}}>{index + 1}. {item.title}</Text>
                  {/* <Text style={{ color:colors.DARKGRAY}}>{item.location}</Text> */}
                  <Text style={{ color:colors.DARKGRAY}}>{item.status}</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <TouchableOpacity
                  onPress={()=>props.navigation.navigate('ReportDetail', {item})}
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
                    <Text style={{color:colors.WHITE,}}>Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
             : 
             null
            ))}
            <View style={{ height: 50 }}></View>
          </ScrollView> :
          <ScrollView>
          
          <View style={{ height: 50 }}></View>
        </ScrollView>
          }
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
