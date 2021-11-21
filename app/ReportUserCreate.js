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
import MapView from 'react-native-maps';
import { Marker, Callout } from "react-native-maps";
import { customMapStyle } from "./common/mapStyle";
import { CheckBox, Input, Icon, Header } from 'react-native-elements'
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
import * as Location from "expo-location";


//import * as ImagePicker from "expo-image-picker";

// user location done
// get all trash bins
// use geolib distance thingy
export default function ReportUserCreate(props) {
  const [desc, setDesc] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null);
  const [permissions, SetHasCameraPermission] = useState(null);
  const [location, setLocation] = useState(null)
  const [process, setProcess] = useState(false)
  const [bins, setBins] = useState(null)



  useEffect(() => {
    handleLocation()
    getbins()
  }, []);


  const handleLocation = async () => {

    let per = await Location.requestPermissionsAsync()
    if (per.granted) {
      const location = await Location.getCurrentPositionAsync();
      console.log("user location ", location);
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(userLocation)
    }
  }


  const getbins = async() =>{
    db.collection("Bins").onSnapshot(querySnapshot => {
      let b = [];
      querySnapshot.forEach(doc => {
          b.push({ id: doc.id, ...doc.data() });
      });
      setBins([...b]);
    })
  }



  const submit = async () => {
    console.log("loc", location)
    db.collection("Reports").add({ user: firebase.auth().currentUser.uid, description: desc, date: Date(), title, status: "Pending" })
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

              {location &&
                <Marker
                  //key={index}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}

                // redraw
                // key={index}
                >

                </Marker>
              }

              {/* {
                bins &&
             
                  bins.map((item, index))=>(
                    <Marker
                    coordinate={{
                      latitude: item.location.latitude,
                      longitude: item.location.longitude,
                    }}>

                    </Marker>

                  )
               
                
              } */}

            </MapView>


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
              onPress={() => submit()}
              disabled={!desc}
              style={{
                backgroundColor: colors.GREEN,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <Text style={{ color: colors.WHITE }}>{!process ? "Submit" : "Processing Please Wait"}</Text>
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
