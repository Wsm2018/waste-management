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

import { customMapStyle } from "./common/mapStyle";
import { Marker, Callout } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as Location from "expo-location";
//import * as ImagePicker from "expo-image-picker";

export default function ReportUserCreate(props) {
  const [desc, setDesc] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null);
  const [permissions, SetHasCameraPermission] = useState(null);
  
  const [ useLocation , setUseLocation] = useState(true)
  const [process , setProcess] = useState(false)

  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;
  const latitude = 25.286106;
  const longitude = 51.534817;
  const [location , setLocation]= useState()
  const [municipalities, setMunicipalities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bins, setBins] = useState([]);


  useEffect(() => {
   // getPermission();
    handleLocation()
  }, []);

  // useEffect(()=>{

  // },[location])
 
  const submit = async () => {
    //console.log("loc",location)
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

  

   const handleLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("Permission Denied");
    } else {
      // const locations = await Location.getCurrentPositionAsync({});
      // //console.log("location",locations)
      // setLocation(locations);

      // navigator.geolocation.watchPosition((position) => {
      //   // Create the object to update this.state.mapRegion through the onRegionChange function
      //   let region = {
      //     latitude:       position.coords.latitude,
      //     longitude:      position.coords.longitude,
      //     latitudeDelta:  0.00922*1.5,
      //    longitudeDelta: 0.00421*1.5
      //   }
      //   setLocation(region)
    //  })
    }
    
    
console.log("the locatiooonnnnnn ", location)
 
   };

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
      
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        provider="google"
        // initialRegion={{
        //   latitude: latitude,
        //   longitude: longitude,
        //   latitudeDelta,
        //   longitudeDelta,
        // }}
        customMapStyle={customMapStyle}
        
        // userInterfaceStyle={"dark"}
      >
        {/* {bins &&
          bins.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.location.U,
                longitude: item.location.k,
              }}

              // redraw
              // key={index}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:
                    item.capacity === 3
                      ? colors.RED
                      : item.capacity === 2
                      ? colors.YELLOW
                      : colors.GREEN,
                  aspectRatio: 1/1,
                  borderRadius: 100,
                  padding: 7,
                }}
              >
              
                <Icon
                  name="trashcan"
                  type="octicon"
                  color={colors.WHITE}
                  size={22}
                />
              </TouchableOpacity>
              <Callout
                tooltip
                // onPress={() => changeBin(item, index)}
                // style={{}}
                onPress={() =>
                  props.navigation.navigate("PriorityAssign", { bin: item })
                }
              >
                <View
                  style={{
                    padding: 3,
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => props.navigation.navigate("ReportAssign")}
                    // onPress={() => calloutPress()}
                    style={{
                      backgroundColor: colors.GREEN,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 80,
                      height: 40,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: colors.WHITE }}>Assign</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))} */}

       
      </MapView>
      {/* )} */}
          
       
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
