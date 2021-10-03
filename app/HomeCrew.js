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
import db from "../db"
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
import moment from "moment";

import { colors } from './common/theme'

export default function HomeCrew(props) {
  const [screenView, setScreenView] = useState(true)

  const [user, setUser] = useState();
  const [crew, setCrew] = useState();
  const [schedules, setSchedules] = useState();
  const [municipalities, setMunicipalities] = useState();
  const [districts, setDistricts] = useState();
  const [districtLocation, setDistrictLocation] = useState();

  useEffect(() => {
    console.log("uid", firebase.auth().currentUser.uid);
    db.collection("Users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        const user = { id: doc.id, ...doc.data() };
        setUser(user);
        console.log("USERS", user);
      });
  }, []);

  useEffect(() => {
    let firstSch
    db.collection("Crews").onSnapshot((querySnapshot) => {
      const tempCrews = [];
      querySnapshot.forEach((doc) => {
        tempCrews.push({ id: doc.id, ...doc.data() });
      });
      console.log(" Current tempCrews: ", tempCrews);
      const userId = firebase.auth().currentUser.uid
      let tempCrew = tempCrews.filter(crew =>
        crew.collector1 == userId
        || crew.collector2 == userId
        || crew.driver == userId
        || crew.backupCollector1 == userId
        || crew.backupCollector2 == userId
        || crew.backupDriver == userId
      )[0]

      db.collection("Users")
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((uDoc) => {
            if (uDoc.data().id === tempCrew.driver)
              tempCrew.driverName = uDoc.data().firstName

            else if (uDoc.data().id === tempCrew.collector1)
              tempCrew.collector1Name = uDoc.data().firstName

            else if (uDoc.data().id === tempCrew.collector2)
              tempCrew.collector2Name = uDoc.data().firstName

            else if (uDoc.data().id === tempCrew.backupDriver)
              tempCrew.backupDriverName = uDoc.data().firstName

            else if (uDoc.data().id === tempCrew.backupCollector1)
              tempCrew.backupCollector1Name = uDoc.data().firstName

            else if (uDoc.data().id === tempCrew.backupCollector2)
              tempCrew.backupCollector2Name = uDoc.data().firstName
          });
          setCrew(tempCrew);
          console.log(" Current crew with names--: ", tempCrew);
        });


      db.collection("Crews")
        .doc(tempCrew.id)
        .collection("Schedules").orderBy("dateTime")
        .onSnapshot((querySnapshot) => {
          const tempSchedules = [];
          querySnapshot.forEach((docP) => {
            tempSchedules.push({ id: docP.id, ...docP.data() });
          });
          setSchedules([...tempSchedules]);
          console.log("schedules: ", tempSchedules)
          firstSch = tempSchedules[0]
        });

      db.collection("Municipalities").onSnapshot((querySnapshot) => {
        const tempMunicipalities = [];
        querySnapshot.forEach((doc) => {
          tempMunicipalities.push({ id: doc.id, ...doc.data() });
        });
        // console.log(" Current tempMunicipalities: ", tempMunicipalities);
        setMunicipalities([...tempMunicipalities]);
      });

      db.collection("Districts").onSnapshot((querySnapshot) => {
        const tempDistricts = [];
        querySnapshot.forEach((doc) => {
          tempDistricts.push({ id: doc.id, ...doc.data() });
        });
        // console.log(" Current promotion: ", tempDistricts);
        setDistricts([...tempDistricts]);
        const dis = tempDistricts.filter(d => d.id === firstSch.districtId)[0]
        setDistrictLocation(dis.location)
        console.log("tempDistricts[0].location", dis.location.U, dis.location.k)
      });

    });
  }, []);

  const getDistrict = (itemDId) => {
    const dis = districts && districts.length > 0 && districts.filter(d => d.id === itemDId)[0]
    const theName = dis ? dis.name + ", " + getMunicipality(dis.municipalityId) : ""
    return theName
  }
  const getMunicipality = (itemMId) => {
    const mun = municipalities && municipalities.length > 0 && municipalities.filter(m => m.id === itemMId)[0]
    const theName = mun ? mun.name : ""
    return theName
  }
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
          {crew &&schedules && schedules.length > 0 && <TouchableOpacity
            onPress={() => props.navigation.navigate('ScheduleMap', { disLong: districtLocation.k, disLat: districtLocation.U })}
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
                {moment(schedules[0].dateTime.toDate()).format("LLL")}
              </Text>

              <Text style={{ color: colors.DARKERGRAY }}>
                {getDistrict(schedules[0].districtId)}
              </Text>
              <Text style={{ color: colors.DARKERGRAY }}>Driver: {`(${schedules[0].driver})`} {schedules[0].driver === "main" ? crew.driverName : crew.backupDriverName}</Text>
              <Text style={{ color: colors.DARKERGRAY }}>Collector 1: {`(${schedules[0].collector1})`} {schedules[0].collector1 === "main" ? crew.collector1Name : crew.backupCollector1Name}</Text>
              <Text style={{ color: colors.DARKERGRAY }}>Collector 2: {`(${schedules[0].collector2})`} {schedules[0].collector2 === "main" ? crew.collector2Name : crew.backupCollector2Name}</Text>
            </View>
            <View style={{ width: '25%' }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ScheduleMap', { disLong: districtLocation.k, disLat: districtLocation.U })}
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
          </TouchableOpacity>}
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
            {schedules && schedules.length > 0 && schedules.map((item, index) => (
              <View
                key={index}
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
                key={item.id}
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
                    {moment(item.dateTime.toDate()).format("LLL")}
                  </Text>

                  <Text style={{ color: colors.DARKERGRAY }}>
                    {getDistrict(item.districtId)}
                  </Text>
                  <Text style={{ color: colors.DARKERGRAY }}>Driver: {`(${item.driver})`} {item.driver === "main" ? crew.driverName : crew.backupDriverName}</Text>
                  <Text style={{ color: colors.DARKERGRAY }}>Collector 1: {`(${item.collector1})`} {item.collector1 === "main" ? crew.collector1Name : crew.backupCollector1Name}</Text>
                  <Text style={{ color: colors.DARKERGRAY }}>Collector 2: {`(${item.collector2})`} {item.collector2 === "main" ? crew.collector2Name : crew.backupCollector2Name}</Text>
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
