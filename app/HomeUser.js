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
import TimedSlideshow from 'react-native-timed-slideshow'
import Image1 from '../assets/slideshow-1.jpg'
import Image2 from '../assets/slideshow-2.png'
import Image3 from '../assets/slideshow-3.jpg'
import Image4 from '../assets/slideshow-4.jpg'

export default function HomeUser(props) {
  const [screenView, setScreenView] = useState(true)

  const items = [
    {
      uri: Image1,
      // title: 'Michael Malik',
      // text: 'Minnesota, USA',
      // fullWidth:true,
    },
    {
      uri: Image2,
      // title: 'Michael Malik',
      // text: 'Minnesota, USA',
      // fullWidth:true,
    },
    {
      uri: Image3,
      // title: 'Michael Malik',
      // text: 'Minnesota, USA',
      // fullWidth:true,
    },
    {
      uri: Image4,
      // title: 'Michael Malik',
      // text: 'Minnesota, USA',
      // fullWidth:true,
    },
  ]

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.LIGHTGRAY }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <StatusBar hidden={false} /> */}
      <Header
        backgroundColor={colors.GREEN}
        leftComponent={{
          icon: 'menu',
          type: 'feather',
          color: colors.WHITE,
          size: 30,
          component: TouchableWithoutFeedback,
          onPress: () => {
            props.navigation.openDrawer()
          },
        }}
        centerComponent={
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Home</Text>
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
      // containerStyle={
      // {
      // justifyContent: 'space-around',
      // height: 80,
      // }
      // }
      />
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <View
        style={{
          flex: 1,
          // backgroundColor: colors.WHITE,
          width: '100%',
          // alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            // backgroundColor: 'red',
            flex: 1.1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TimedSlideshow
            items={items}
            progressBarColor={colors.GREEN}
            renderCloseIcon={() => null}
            renderIcon={() => null}
            progressBarDirection="fromLeft"
            renderFooter={() => null}
            footerStyle={{ height: 0, backgroundColor: colors.TRANSPARENT }}
          />
        </View>
        <View style={{ flex: 0.3, width: '100%' }}>{/* Empty */}</View>
        <View
          style={{
            backgroundColor: colors.WHITE,
            flex: 2,
            width: '100%',
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
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
          <View
            style={{
              height: 80,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{ fontSize: 24, color: colors.GREEN, fontWeight: 'bold' }}
            >
              About Us
            </Text>
          </View>
          <ScrollView>
            <View
              style={{
                minHeight: 100,
                width: '90%',
                // backgroundColor: 'red',
                alignSelf: 'center',
              }}
            >
              <Text style={{fontSize:16, textAlign:"justify"}}>
                Our Smart Waste Management App is mobile application for smartphones which permits
                residents to see and utilize real-time information from our servers that degree fill-levels
                in trash bins. This application advises individuals of the nearest-available trash bins
                and empowers them to be more ecologically dependable for disposal.
              </Text>
              <Text style={{fontSize:16, textAlign:"justify", marginTop:15}}>
                By giving real-time input through the app, Qatari residents can report any issues
                and in this way offer assistance diminish flooding and chaotic trash bins,
                making the city greener, cleaner and free of trash.
                </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  )
}
