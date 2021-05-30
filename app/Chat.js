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
const { width, height } = Dimensions.get('window')

export default function Chat({ navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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
      style={{ flex: 1, backgroundColor: colors.WHITE }}
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
            navigation.goBack()
          },
        }}
        centerComponent={
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Crew</Text>
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
          backgroundColor: colors.WHITE,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {/* <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 25, color: colors.BLACK }}>
            Priority List
          </Text>
        </View> */}
        <View style={{ flex: 10 }}>
          <ScrollView style={{}}>
            {/* -------------Chat Left--------------- */}
            <View style={{
              width: "100%", paddingLeft: 10,
              marginTop: 10,
              alignItems: "flex-start"
              // backgroundColor: "red"
            }}>
              <View style={{ backgroundColor: colors.DARKGRAY, minHeight: 50, maxWidth: "60%", borderRadius: 15, borderTopLeftRadius: 0, justifyContent: "center", paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: colors.WHITE }}>Hello</Text>
              </View>
              <View style={{ maxWidth: "60%", paddingLeft: 5, marginTop: 2 }}>
                <Text>Manager - Date</Text>
              </View>
            </View>


            {/* ---------------Chat Right------------ */}
            <View style={{
              width: "100%", paddingRight: 10,
              marginTop: 10,
              alignItems: "flex-end"
              // backgroundColor: "red"
            }}>
              <View style={{
                backgroundColor: colors.GREEN,
                minHeight: 50,
                maxWidth: "60%",
                borderRadius: 15,
                borderTopRightRadius: 0,
                justifyContent: "center",
                paddingLeft: 10,
                paddingRight: 10
              }}>
                <Text style={{ color: colors.WHITE }}>Hello</Text>
              </View>
              <View style={{ maxWidth: "60%", paddingRight: 5, marginTop: 2 }}>
                <Text>Manager - Date</Text>
              </View>
            </View>

            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: isKeyboardVisible ?
              Platform.OS === 'ios' ? -200 : -200
              :
              0,
            flex: 1,
            borderTopWidth: 1,
            borderColor: colors.LIGHTGRAY,
            flexDirection: "row",
            alignItems:"center",
            justifyContent:"center"
          }}>
          <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                flex: 0.8,
                width: "90%",
                borderRadius: 100,
                paddingLeft: 8,
                paddingRight: 8,
                borderWidth: 2,
                borderColor: colors.GREEN
              }}
              placeholder={"Type here"}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center", }}>
            <TouchableOpacity
              style={{
                // flex: 0.8,
                height:50,
                width:50,
                aspectRatio: 1 / 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.GREEN,
                borderRadius: 100
              }}>
              <Icon name="send" type="material" color={colors.WHITE} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === 'ios' && <View style={{ flex: 0.2 }}></View>}
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
