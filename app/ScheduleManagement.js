import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
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

export default function ScheduleManagement(props) {
  const [email, setEmail] = useState('')
  const [crews, setCrews] = useState()
  //const [schedules, setSchedules] = useState();
  const [municipalities, setMunicipalities] = useState();
  const [districts, setDistricts] = useState();
  const [oldSchedules, setOldSchedules] = useState();
  const [schedules, setSchedules] = useState();
  const [todaySchedules, setTodaySchedules] = useState();

  useEffect(() => {
    db.collection("Crews").onSnapshot((querySnapshot) => {
      const tempCrews = [];
      let tempSchedules = [];

      querySnapshot.forEach((doc) => {
        db.collection("Crews")
          .doc(doc.id)
          .collection("Schedules").orderBy("dateTime")
          .onSnapshot((querySnapshot) => {
            const tempCrewSchedules = [];
            querySnapshot.forEach((docP) => {
              tempCrewSchedules.push({ id: docP.id, ...docP.data(), dateTime: docP.data().dateTime.toDate(), crewNo: doc.data().crewNo });
            });
            tempSchedules = tempSchedules.concat(tempCrewSchedules)
            tempSchedules = tempSchedules.filter((item, index) => {
              return (tempSchedules.map((e)=> { return e.id; }).indexOf(item.id) === index)
            })
            tempSchedules = tempSchedules.sort((a,b)=>{ return a.dateTime - b.dateTime });
            tempCrews.push({ id: doc.id, ...doc.data() });
            //console.log(" Current tempCrews: ", tempCrews)
            setCrews([...tempCrews]);
            const today = new Date();
            setSchedules([...tempSchedules.filter(schedule => schedule.dateTime > today && schedule.dateTime.getDate() !== today.getDate())])
            setOldSchedules([...tempSchedules.filter(schedule => schedule.dateTime < today && schedule.dateTime.getDate() !== today.getDate())])
            setTodaySchedules([...tempSchedules.filter(schedule => schedule.dateTime.toLocaleDateString() === today.toLocaleDateString())])
            //console.log(" Current tempSchedules: ", tempSchedules)
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

  return (
    <View style={{ flex: 1, backgroundColor: colors.LIGHTGRAY }}>
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
          icon: 'add',
          type: 'material',
          color: colors.WHITE,
          size: 30,
          component: TouchableWithoutFeedback,
          onPress: () => { props.navigation.navigate("ScheduleEdit") },
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
          <TouchableOpacity
            onPress={() => props.navigation.navigate('OldSchedules', { oldSchedules, role: "manager" })}
            style={{
              flex: 2,
              minHeight: 30,
              borderRadius: 10,
              backgroundColor: colors.GREEN,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1,
              elevation: 1,
              width: "60%",
              justifyContent: "center",
              alignItems: "center",
              margin: 5
            }}
          >
            <Text
              style={{ fontSize: 18, color: colors.BLACK }}
            >
              Schedule History
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 10 }}>
            <ScrollView>
              <View style={{ flex: 1.5 }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{ fontSize: 20, color: colors.BLACK, fontWeight: 'bold' }}
                  >
                    Today
                  </Text>
                </View>
                <ScrollView>
                  {todaySchedules && todaySchedules.length > 0 && todaySchedules.map((item, index) => (
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
                          {moment(item.dateTime).format("LLL")}
                        </Text>

                        <Text style={{ color: colors.DARKERGRAY }}>
                          {getDistrict(item.districtId)}
                        </Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Crew No.: {item.crewNo}</Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Driver: {item.driver}</Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Collector 1: {item.collector1}</Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Collector 2: {item.collector2}</Text>
                      </View>
                    </View>
                  ))}
                  <View style={{ height: 50 }}></View>
                </ScrollView>
              </View>
              <View style={{ flex: 1.5 }}>
                <View style={{ justifyContent: 'center' }}>
                  <Text
                    style={{ fontSize: 20, color: colors.BLACK, fontWeight: 'bold' }}
                  >
                    Upcoming Schedule
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
                          {moment(item.dateTime).format("LLL")}
                        </Text>

                        <Text style={{ color: colors.DARKERGRAY }}>
                          {getDistrict(item.districtId)}
                        </Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Crew No.: {item.crewNo}</Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Driver: {item.driver}</Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Collector 1: {item.collector1}</Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Collector 2: {item.collector2}</Text>
                      </View>
                    </View>
                  ))}
                  <View style={{ height: 50 }}></View>
                </ScrollView>
              </View>
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