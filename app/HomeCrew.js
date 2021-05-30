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

export default function HomeCrew(props) {
  const [screenView, setScreenView] = useState(true)
  const [schedule, setSchedule] = useState([
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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Schedule</Text>
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
          // backgroundColor: 'red',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.5 }}>{/* Empty */}</View>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{ fontSize: 20, color: colors.BLACK, fontWeight: 'bold' }}
            >
              Next:
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ScheduleMap')}
            style={{
              flex: 2,
              minHeight: 100,
              borderRadius: 10,
              backgroundColor: colors.WHITE,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1,

              elevation: 1,
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                width: '75%',
                justifyContent: 'space-evenly',
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  color: colors.black,
                  fontSize: 16,
                }}
              >
                Date
              </Text>
              <Text style={{ color: colors.DARKGRAY }}>Wakra, Qatar</Text>
              <Text style={{ color: colors.DARKGRAY }}>Status</Text>
              <Text style={{ color: colors.DARKGRAY }}>Priority</Text>
            </View>
            <View style={{ width: '25%' }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ScheduleMap')}
                style={{
                  width: '100%',
                  backgroundColor: colors.GREEN,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              >
                <Icon
                  name="doubleright"
                  type="ant-design"
                  color={colors.WHITE}
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>{/* Empty */}</View>
        </View>

        {/* -------WEEKLY SCHEDULE----------------------------------------------------------------------- */}

        <View style={{ flex: 1.5 }}>
          <View style={{ justifyContent: 'center' }}>
            <Text
              style={{ fontSize: 20, color: colors.BLACK, fontWeight: 'bold' }}
            >
              Weekly Schedule
            </Text>
          </View>
          <ScrollView>
            {schedule.map((item, index) => (
              <View
                style={{
                  width: '100%',
                  backgroundColor: colors.WHITE,
                  minHeight: 150,
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
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'space-evenly',
                    paddingLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: colors.black,
                      fontSize: 16,
                    }}
                  >
                    Date {index}
                  </Text>
                  <Text style={{ color: colors.DARKGRAY }}>Time</Text>
                  <Text style={{ color: colors.DARKGRAY }}>Wakra, Qatar</Text>
                  <Text style={{ color: colors.DARKGRAY }}>
                    Priority - Type
                  </Text>
                </View>
              </View>
            ))}
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          alignSelf: 'center',
          // backgroundColor: 'red',
          width: '90%',
          minHeight: 60,
          position: 'absolute',
          bottom: '2%',
          // flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChatList')}
          style={{
            height: 55,
            backgroundColor: colors.GREEN,
            aspectRatio: 1 / 1,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Icon
            name="chatbubble-ellipses-sharp"
            type="ionicon"
            color={colors.WHITE}
            size={28}
          />
        </TouchableOpacity>
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
