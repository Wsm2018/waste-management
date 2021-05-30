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
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
       <Header
                backgroundColor={colors.GREEN}
                leftComponent={{
                    icon: "md-menu",
                    type: "ionicon",
                    color: colors.WHITE,
                    size: 30,
                    component: TouchableWithoutFeedback,
                    onPress: () => {
                      navigation.toggleDrawer();
                    },
                }}
                centerComponent={
                    <Text style={styles.headerTitleStyle}>Schedule</Text>
                }
                containerStyle={styles.headerStyle}
                innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
            />
      <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ borderRadius: 10, backgroundColor: colors.GREEN, width: '100%', padding: 10, alignItems: 'center' }} onPress={() => navigation.navigate("ScheduleEdit")}>
            <Text style={{ color: colors.WHITE }}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 5.3, justifyContent: 'center' }}>
          {/* <Text onPress={console.log("crews on click---",crews)}>{crews &&crews.map((crew, index) => (crew.crewNo))} hello </Text> */}
          {crews && crews.length > 0 && crews.map((crew, index) => (
            crew.schedules.map((item, i) => (
              <Card key={i} style={{ elevation: 0 }}>
                <Card.Content>
                  <View style={{ padding: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: 1, borderColor: colors.GREEN }}>
                    <View style={{ flex: 2 }}>
                      <Title>CrewNo.{crew.crewNo} - {moment(item.dateTime.toDate()).format("LL")}</Title>
                      <Paragraph><Text>zone  {getDistrict(item.districtId)}</Text></Paragraph>
                      <Paragraph><Text style={{ color: colors.DARKERGRAY }}>Driver: {item.driver}, </Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Collector 1: {item.collector1}, </Text>
                        <Text style={{ color: colors.DARKERGRAY }}>Collector 2: {item.collector2}</Text>
                      </Paragraph>
                    </View>
                  </View>
                </Card.Content>

              </Card>))
          ))}


        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


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