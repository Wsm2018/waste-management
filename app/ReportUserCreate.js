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
import { getDistance, getPreciseDistance } from 'geolib';
import selectedMarker from '../assets/greenMarker.png'
import { color } from 'react-native-reanimated';
//import * as ImagePicker from "expo-image-picker";

// user location done
// get all trash bins
// use geolib distance thingy
export default function ReportUserCreate(props) {
  const [description, setDesc] = useState("")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null);
  // const [permissions, SetHasCameraPermission] = useState(null);
  const [userLocation, setUserLocation] = useState(null)
  const [closeBins, setCloseBins] = useState(null)
  const [process, setProcess] = useState(false)
  const [bins, setBins] = useState(null)
  const [selectedBin, setSelectedBin] = useState(null)



  useEffect(() => {
    handleLocation()
   
  }, []);

  useEffect(()=>{
    if(userLocation){
      getbins()
    }

  },[userLocation])

  

  const handleLocation = async () => {

    let per = await Location.requestPermissionsAsync()

    if (per.granted) {

      const l = await Location.getCurrentPositionAsync();
      console.log("user location ", l);
      const location = {
        latitude: l.coords.latitude,
        longitude: l.coords.longitude,
      };

      console.log("setting user location")
      setUserLocation(location)
    }
  }


  const getbins = async () => {
    console.log("getting bins")
    db.collection("Bins").onSnapshot(querySnapshot => {
      let b = [];
      querySnapshot.forEach(doc => {
        if(getDistance(
          { latitude: doc.data().location.latitude, longitude: doc.data().location.longitude },
          { latitude: userLocation.latitude, longitude: userLocation.longitude })
        <= 2000){
//should be 500 btw
            b.push({ id: doc.id, ...doc.data() });
        }
       
      });
      setCloseBins([...b]);
    })

  }



  const submit = async () => {
    //console.log("loc", location)
    db.collection("Reports").add({
      user: firebase.auth().currentUser.uid,
      description,
      date: Date(),
      status: "Pending",
      location: selectedBin,
      closingDateTime: null,
      handeldBy: null
    })
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

      {/* <View style={{flex: 2, backgroundColor: "red"}}></View> */}
      <View style={{
        flex: 1,
        //backgroundColor: "green",
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%"
      }}>
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
            value={description}
          />
        </View>
      </View>
      <View style={{
        flex: 2,
        //backgroundColor: "blue" ,
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto"
      }}>
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region
          provider="google"
          region={{
            latitude: userLocation ? userLocation.latitude : 25.3548,
            longitude: userLocation ? userLocation.longitude : 51.1839,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
          customMapStyle={customMapStyle}
        // userInterfaceStyle={"dark"}
        >

          {closeBins ? closeBins.map((item, index) => (

            <Marker
              key={index}
              coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
              }}
              //image= {selectedMarker}
              // pinColor={item == selectedBin ? '#4682B4' : "red"}
              onPress={()=>{
                if(selectedBin === item) {
                  setSelectedBin(null)

                } else {
                  setSelectedBin(item)
                }
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:selectedBin === item ? colors.GREEN:colors.DARKGRAY,
                  aspectRatio: 1/1,
                  borderRadius: 100,
                  // borderTopRightRadius:100,
                  // borderTopLeftRadius:100,
                  // borderBottomRightRadius:1000,
                  // borderBottomLeftRadius:1000,
                  padding: 7,
                }}
              >
                {/* {console.log("item ", item)} */}
                <Icon
                  name="trashcan"
                  type="octicon"
                  color={colors.WHITE}
                  size={22}
                />
              </TouchableOpacity>
              {/* {
                  selectedBin == item ?
                  <Callout
                    //tooltip
                    onPress={() => setSelectedBin(null)}
                    style={{ width: 70, height: 50 }}
                  //onPress={() =>setSelectedBin(item)}rr

                  >
                    <Text>Unselect</Text>
                    
                  </Callout>
                      :
                  <Callout
                    tooltip
                    onPress={(x) => {
                      setSelectedBin(item)
                      // x.currentTarget.
                    }}
                    style={{ width: 70, height: 50 }}
                  //onPress={() =>setSelectedBin(item)}rr

                  >
                    <Text> {selectedBin == item ?"Unselect" : "Select"}</Text>
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
                } */}
            </Marker>


          ))

            :
            null
          }

        </MapView>
        <Text style={{textAlign:"center", paddingTop:"1%", color:colors.RED}}>{closeBins && closeBins.length === 0 && "There are no bins close to your location"}</Text>
      </View>
      <View style={{
        flex: 1,
        //backgroundColor: "yellow"
      }}>
        <View
          style={{
            width: '45%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: "auto", marginBottom: "auto", marginLeft: "auto", marginRight: "auto"
          }}
        >
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('ReportAssign')}
            onPress={() => submit()}
            disabled={(!description || description === "" || description.length === 0 )&& !selectedBin}
            style={{
              backgroundColor: (!description || description === "" || description.length === 0)&& !selectedBin ?colors.GRAY :colors.GREEN,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Text style={{ color: colors.WHITE }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      {/* <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        

               */}


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
      {/* </ScrollView>

          </View>
        </View>
        <View style={{ flex: 1, width: '100%', height: "100%" }}>
          
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }} */}
      {/* > */}
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

      {/* 
        </View>
      </View> */}
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
    //marginBottom: 2,
    color: colors.BLACK,


  },
  inputView: {
    marginTop: "auto", marginBottom: "auto"
  }
})
