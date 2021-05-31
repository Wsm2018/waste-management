import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback,ScrollView } from 'react-native'
import { Input, Icon, Header } from 'react-native-elements'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import Modal from 'react-native-modal'
import { colors } from './common/theme'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import db from "../db";
import moment from "moment";

export default function ScheduleManagement({ navigation }) {
  const [email, setEmail] = useState('')
  const [crews, setCrews] = useState()
  //const [schedules, setSchedules] = useState();
  const [municipalities, setMunicipalities] = useState();
  const [districts, setDistricts] = useState();

  useEffect(() => {
    db.collection("Crews").onSnapshot((querySnapshot) => {
      const tempCrews = [];
      
      querySnapshot.forEach((doc) => {
        db.collection("Crews")
          .doc(doc.id)
          .collection("Schedules").orderBy("dateTime")
          .onSnapshot((querySnapshot) => {
            const tempSchedules = [];
            querySnapshot.forEach((docP) => {
              tempSchedules.push({ id: docP.id, ...docP.data() });
            });
            tempCrews.push({ id: doc.id, schedules: [...tempSchedules], ...doc.data() });
            console.log(" Current tempCrews: ", tempCrews)
            setCrews([...tempCrews]);
          });
      });
    })


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

  let Schedules = [
    {
      number: 1,
      zone: 1,
      crew: 1
    },
    {
      number: 2,
      zone: 2,
      crew: 2
    },
  ]

  return (
    <View style={{ flex: 1,backgroundColor: colors.LIGHTGRAY }}>
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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Schedule</Text>
        }
        rightComponent={{
          icon: 'add' ,
          type: 'material',
          color: colors.WHITE,
          size: 30,
          component: TouchableWithoutFeedback,
          onPress: () => {navigation.navigate("ScheduleEdit")},
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

      
      <ScrollView>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 25, color: colors.BLACK,marginTop:15 }}>
            All Schedules
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
          {crews && crews.length > 0 && crews.map((crew, index) => (
            crew.schedules.map((item, index) => (
            <View
              style={{
                width: '100%',
                backgroundColor: colors.WHITE,
                minHeight: 100,
                marginTop: 20,
                padding:5,
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
              <View style={{ width: '100%', justifyContent:"space-evenly", paddingLeft:10}}>
                <Text style={{fontWeight:"bold", color:colors.black, fontSize:16}}>CrewNo.{crew.crewNo} - {moment(item.dateTime.toDate()).format("LL")}</Text>
                <Text style={{ color:colors.DARKGRAY}}>zone  {getDistrict(item.districtId)}</Text>
                <Text style={{ color:colors.DARKGRAY}}>Driver: {item.driver}, </Text>
                <Text style={{ color:colors.DARKGRAY}}>Collector 1: {item.collector1},</Text>
                <Text style={{ color:colors.DARKGRAY}}>Collector 2: {item.collector2}</Text>
              </View>
              
            </View>
          ))))}
          <View style={{ height: 50 }}></View>
        </ScrollView>
        
        </View>
      </View>


      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.GREEN
  },
  headerTitleStyle: {
    fontSize: 20, color: colors.WHITE
  },
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },

  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: responsiveHeight(8),
    backgroundColor: 'rgba(250,0,0, 0.7)',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
})