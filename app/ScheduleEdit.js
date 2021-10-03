import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Input, Icon, CheckBox, Header } from 'react-native-elements';

import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import Modal from 'react-native-modal'
import { colors } from './common/theme'
import PickerSelect from "react-native-picker-select";;
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
import db from "../db";
import DatePicker from "react-native-datepicker";
import moment from "moment";

export default function ScheduleEdit({ navigation }) {
  const [permaChange, setPermaChange] = useState(false)
  const [selectedCrew, setSelectedCrew] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [selectedFirstCollector, setSelectedFirstCollector] = useState(null)
  const [selectedSecondCollector, setSelectedSecondCollector] = useState(null)
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    collector1: "main",
    collector2: "main",
    driver: "main",
    dateTime,
    districtId,
    crew
  })
  const { collector1,
    collector2,
    driver,
    dateTime,
    districtId, crew } = formData

  const [crews, setCrews] = useState([
    { label: 'crew 1', value: '1' },
    { label: 'crew 2', value: '2' }
  ]);
  const [districts, setDistricts] = useState([
    { label: 'districts 1', value: '1' },
    { label: 'districts 2', value: '2' }
  ]);
  const [drivers, setDrivers] = useState([
    { key: 'main', label: 'Main', value: 'main' },
    { key: 'backup', label: 'Backup', value: 'backup' }
  ]);
  const [firstCollectors, setFirstCollectors] = useState([
    { key: 'main', label: 'Main', value: 'main' },
    { key: 'backup', label: 'Backup', value: 'backup' }
  ]);
  const [secondCollectors, setSecondCollectors] = useState([
    { key: 'main', label: 'Main', value: 'main' },
    { key: 'backup', label: 'Backup', value: 'backup' }
  ]);

  useEffect(() => {
    db.collection("Crews").onSnapshot((querySnapshot) => {
      const tempCrews = [];
      querySnapshot.forEach((doc) => {
        tempCrews.push({ key: doc.id, value: doc.id, label: `Crew ${doc.data().crewNo}` });
      });
      //console.log(" Current tempCrews: ", tempCrews)
      setCrews([...tempCrews]);
    })

    db.collection("Districts").onSnapshot((querySnapshot) => {
      const tempDistricts = [];
      querySnapshot.forEach((doc) => {
        tempDistricts.push({ key: doc.id, value: doc.id, label: `District ${doc.data().name}` });
      });
      // console.log(" Current promotion: ", tempDistricts);
      setDistricts([...tempDistricts]);
    });

  }, []);

  const addSchedule = () => {
    console.log("formData", formData)

    db.collection("Crews")
      .doc(crew)
      .collection("Schedules")
      .add(formData)
    navigation.goBack();
  }
  const onChange = (value, name) =>
    setFormData({ ...formData, [name]: value });

  const handleDate = (date) => {
    setDate(date)
    onChange(new Date(date), 'dateTime')
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.WHITE }}>

      <View style={{ flex: 1 }}>
        <Header

          leftComponent={{
            icon: "arrow-back-outline",
            type: "ionicon",
            color: colors.WHITE,
            size: 30,
            component: TouchableWithoutFeedback,
            onPress: () => {
              navigation.goBack();
            },
          }}
          centerComponent={
            <Text style={styles.headerTitleStyle}>Schedule Edit</Text>
          }
          containerStyle={styles.headerStyle}
          innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
        />

        <View style={{ flex: 5.3, justifyContent: 'space-around', alignItems: 'center' }}>

          <DatePicker
            style={{
              borderRadius: 8,
              borderWidth: 1.5,
              marginTop: "2%",
              borderColor: colors.GREEN,
              height: "10%",
              width: "80%",
              color: "#185a9d",
              fontSize: 18,
            }}
            date={date}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            minDate={moment(new Date()).format("YYYY-MM-DD")}
            // maxDate={moment(new Date()).add(10, "days").format("YYYY-MM-DD")}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              placeholderText: {
                color: "#5D626B",
                fontSize: 18,
                paddingTop: "2%",
                alignSelf: "flex-start",
              },
              dateInput: {
                marginLeft: 36,
                borderColor: colors.GREEN,
                borderRadius: 10,
                borderWidth: 0,
                width: "70%",
                height: "80%",
                color: "#185a9d",
                fontSize: 18,
                paddingLeft: "1%",
              },
              dateText: {
                color: "#185a9d",
                fontSize: 18,
                paddingTop: "2%",
                alignSelf: "flex-start",
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => handleDate(date)}
          />

          <View style={{ width: '80%', }}>
            <Text>Choose District</Text>
            <View style={{ padding: 10, borderRadius: 7, borderColor: colors.GREEN, borderWidth: 1 }}>
              <PickerSelect
                useNativeAndroidPickerStyle={false}
                items={districts}
                onValueChange={(value) => onChange(value, "districtId")}
                value={formData.districtId}
              />
            </View>
          </View>


          <View style={{ width: '80%', }}>
            <Text>Choose Crew</Text>
            <View style={{ padding: 10, borderRadius: 7, borderColor: colors.GREEN, borderWidth: 1 }}>
              <PickerSelect
                useNativeAndroidPickerStyle={false}
                items={crews}
                onValueChange={(value) => onChange(value, "crew")}
                value={formData.crew}
              />
            </View>
          </View>

          <View style={{ width: '80%' }}>
            <Text>Choose Driver</Text>
            <View style={{ padding: 10, borderRadius: 7, borderColor: colors.GREEN, borderWidth: 1 }}>
              <PickerSelect
                useNativeAndroidPickerStyle={false}
                items={drivers}
                onValueChange={(value) => onChange(value, "driver")}
              />
            </View>
          </View>

          <View style={{ width: '80%' }}>
            <Text>Choose First Collector</Text>
            <View style={{ padding: 10, borderRadius: 7, borderColor: colors.GREEN, borderWidth: 1 }}>
              <PickerSelect
                useNativeAndroidPickerStyle={false}
                items={firstCollectors}
                onValueChange={(value) => onChange(value, "collector1")}
              />
            </View>
          </View>

          <View style={{ width: '80%' }}>
            <Text>Choose Second Collector</Text>
            <View style={{ padding: 10, borderRadius: 7, borderColor: colors.GREEN, borderWidth: 1 }}>
              <PickerSelect
                useNativeAndroidPickerStyle={false}
                items={secondCollectors}
                onValueChange={(value) => onChange(value, "collector2")}
              />
            </View>
          </View>


          {/* <View style={styles.checkboxContainer}>
          <CheckBox
              center
              title='Permanently Change'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checked={permaChange}
              textStyle={{color:colors.BLACK}}
              checkedColor={colors.GREEN}
              uncheckedColor={colors.GRAY}
              onPress={()=>setPermaChange(!permaChange)}
            />
          </View> */}


          <TouchableOpacity
            style={{
              width: '25%',
              height: '6%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.GREEN,
              borderRadius: 7
            }}
            onPress={() => addSchedule()}
          >
            <Text style={{ color: 'white' }}>Save</Text>
          </TouchableOpacity>



        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>


        </View>
      </View>



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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,

  },
  checkbox: {
    alignSelf: "center",
    width: 20,
    height: 20,
    borderColor: colors.GREEN,
    borderWidth: 2
  },
})