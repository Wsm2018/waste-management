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
import MapView , {Marker} from "react-native-maps";
import { colors } from './common/theme'

export default function ReportDetail(props) {
  const item = props.navigation.getParam("item", "some default value");
  const role = props.navigation.getParam("role", "some default value");
  
  useEffect(()=>{
    console.log("kkk", item.location)
  },[])
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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>
            Report Detail
          </Text>
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
        <View style={{ flex: 0.5 }}></View>
        <View
          style={{
            flex: 10,
            backgroundColor: colors.WHITE,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 0.95, width: '90%' }}>
            <Text style={{ fontSize: 25, color: colors.BLACK }}>
              Report Details
            </Text>
            <Text style={{ fontSize: 22, color: colors.BLACK }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 18, color: colors.BLACK }}>
              {/* {item.location} */}
            </Text>
            <Text style={{ fontSize: 18, color: colors.BLACK }}>
              {item.description}
            </Text>

            
              {
                item.location ?
                <MapView style={{ flex: 0.5 }}>
                <Marker coordinate={{
                  latitude : item.location.coords.latitude,
                  longitude : item.location.coords.longitude
                }}><Text>Report Location</Text>
                </Marker>
                </MapView>
                :
                null
              }
      {/* {
        locations.map( l =>
          l.latitude ? 
          <Marker coordinate={{
            latitude : l.latitude,
            longitude : l.longitude
          }}><Text>{l.displayName}</Text>
          </Marker>
          :
          null
          )
      } */}
      
          </View>
        </View>
        {
          role == "Manager" &&
<View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '45%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.GRAY,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.BLACK }}>Ignore</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '45%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
            onPress={()=>props.navigation.navigate('ReportAssign',{item})}
              style={{
                backgroundColor: colors.GREEN,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.WHITE }}>Assign</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
        
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
