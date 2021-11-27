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

import { CheckBox ,Input, Icon, Header } from 'react-native-elements'
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
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Image1 from '../assets/greenMarker.png'
//import * as ImagePicker from "expo-image-picker";

export default function ReportUserCreate(props) {
  const [desc, setDesc] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null);
  const [permissions, SetHasCameraPermission] = useState(null);
  const [location , setLocation]= useState()
  const [ useLocation , setUseLocation] = useState(true)
  const [process , setProcess] = useState(false)
  // useEffect(() => {
  //  // getPermission();
  //   handleLocation()
  // }, []);

  // useEffect(()=>{

  // },[location])
 
  const submit = async () => {
    console.log("loc",location)
    db.collection("Reports").add({ user: firebase.auth().currentUser.uid, description: desc , date : Date(), title, status:"Pending"})
    // await db.collection("Reports").add({ 
    //   user: firebase.auth().currentUser.uid,
    //    description: desc ,
    //     date : Date(),
    //     handledBy: null,
    //     status: "Pending",
    //     image: "",
    //     location : useLocation?  location : null,
    //     title
    //   })
    props.navigation.navigate("ReportUser")
  };

  

  // const handleLocation = async () => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== "granted") {
  //     alert("Permission Denied");
  //   } else {
  //     const locations = await Location.getCurrentPositionAsync({});
  //     //console.log("location",locations)
  //     setLocation(locations);
  //   }
  // };

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
            Report an Issue
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
            // backgroundColor: colors.WHITE,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View style={{ flex: 0.95, width: '90%' }}>
            <ScrollView>
              <View style={styles.inputView}>
                <Text style={styles.textInputHeader}>Title</Text>
                <TextInput
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: colors.WHITE,
                    borderRadius: 10,
                    paddingLeft: 5,
                  }}
                  onChangeText={setTitle}
                  placeholder={"Enter Here"}
                  value={title}
                />
              </View>
              <View style={styles.inputView}>
                <Text style={styles.textInputHeader}>Description</Text>
                <TextInput
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: colors.WHITE,
                    borderRadius: 10,
                    paddingLeft: 5,
                  }}
                  onChangeText={setDesc}
                  placeholder={"Enter Here"}
                  value={desc}
                />
              </View>
              {/* <View style={styles.inputView}>
                <Text style={styles.textInputHeader}>Priority</Text>
                <TextInput
                  style={{
                    width: '100%',
                    height: 50,
                    backgroundColor: colors.WHITE,
                    borderRadius: 10,
                    paddingLeft: 5,
                  }}
                  placeholder={'Enter Here'}
                />
              </View> */}
              <View style={styles.inputView}>
                <Text style={styles.textInputHeader}>Use My Current Location</Text>
                <CheckBox
          checked={useLocation}
          onPress={()=>setUseLocation(!useLocation)}
          //style={styles.checkbox}
        />
              </View>
              {/* <View style={styles.inputView}>
                <Text style={styles.textInputHeader}>Image</Text>
               
                {image && <Image source={{ uri: image }} />}
                <Button
                  buttonStyle={{ backgroundColor: "#B0C4DE" }}
                  titleStyle={{ alignItems: "center", color: "#263c5a" }}
                  title="Choose file"
                  onPress={() => _pickImage()}
                />
              </View> */}
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          {/* <View
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
          </View> */}
          <View
            style={{
              width: '45%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
             // onPress={() => props.navigation.navigate('ReportAssign')}
             onPress={()=>submit() }
             disabled = {!desc}
              style={{
                backgroundColor: colors.GREEN,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.WHITE }}>{!process? "Submit": "Processing Please Wait"}</Text>
            </TouchableOpacity>
          </View>
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
  textInputHeader: {
    fontSize: 16,
    marginBottom: 2,
    color: colors.BLACK
  },
  inputView: {
    marginBottom: 20
  }
})
