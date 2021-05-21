import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, } from 'react-native'
import { Input, Icon,CheckBox } from 'react-native-elements';

import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import Modal from 'react-native-modal'
import { colors } from './common/theme'
import DropDownPicker from 'react-native-dropdown-picker';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions'
import { LinearGradient } from 'expo-linear-gradient'
export default function ScheduleEdit({ navigation }) {
  const [permaChange, setPermaChange] = useState(false)
  
  const [open1, setOpen1] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState(null)
  const [crews, setCrews] = useState([
    {label: 'crew 1', value: 'apple'},
    {label: 'crew 2', value: 'banana'}
  ]);

  const [open2, setOpen2] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [drivers, setDrivers] = useState([
    {label: 'driver 1', value: 'apple'},
    {label: 'driver 2', value: 'banana'}
  ]);

  const [open3, setOpen3] = useState(false);
  const [selectedFirstCollector, setSelectedFirstCollector] = useState(null)
  const [firstCollectors, setFirstCollectors] = useState([
    {label: 'first Collectors 1', value: 'apple'},
    {label: 'first Collectors 2', value: 'banana'}
  ]);
  
  const [open4, setOpen4] = useState(false);
  const [selectedSecondCollector, setSelectedSecondCollector] = useState(null)
  const [secondCollectors, setSecondCollectors] = useState([
    {label: 'Second Collectors 1', value: 'apple'},
    {label: 'Second Collectors 2', value: 'banana'}
  ]);

  return (
    <View style={{ flex: 1, backgroundColor:colors.WHITE }}>
      
        <View style={{flex:1}}>
          <View style={{flex:0.7,justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={{fontSize:25,color:colors.GREEN}}>Schedule</Text>
          </View>

          <View style={{flex:5.3,justifyContent:'space-evenly',alignItems:'center'}}>

          <View style={{width:'80%'}}>
            <Text>Choose Available Crew</Text>
            <DropDownPicker
              style={{width:'100%',borderColor:colors.GREEN}}
              open={open1}
              value={selectedCrew}
              items={crews}
              setOpen={setOpen1}
              setValue={setSelectedCrew}
              
            />
          </View>

          <View>
            <Text>Choose Available Driver</Text>
            <DropDownPicker
              style={{width:'80%',borderColor:colors.GREEN}}
              open={open2}
              value={selectedDriver}
              items={drivers}
              setOpen={setOpen2}
              setValue={setSelectedDriver}
            />
          </View>

          <View>
            <Text>Choose First Collector</Text>
            <DropDownPicker
              style={{width:'80%',borderColor:colors.GREEN}}
              open={open3}
              value={selectedFirstCollector}
              items={firstCollectors}
              setOpen={setOpen3}
              setValue={setSelectedFirstCollector}
            />
          </View>

          <View>
            <Text>Choose Second Collector</Text>
            <DropDownPicker
              style={{width:'80%',borderColor:colors.GREEN}}
              open={open4}
              value={selectedSecondCollector}
              items={secondCollectors}
              setOpen={setOpen4}
              setValue={setSelectedSecondCollector}
            />
          </View> 

          <View style={styles.checkboxContainer}>
          <CheckBox
              center
              title='Permanently Change'
              checkedIcon='check-square'
              uncheckedIcon='square'
              checked={permaChange}
              containerStyle={{backgroundColor:colors.GREEN}}
              textStyle={{color:colors.WHITE}}
              checkedColor={colors.WHITE}
              uncheckedColor={colors.WHITE}
              onPress={()=>setPermaChange(!permaChange)}
            />
          </View>

          </View>

          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            
            
          </View>
        </View>

       
     
    </View>
  )
}

const styles = StyleSheet.create({
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
    width:20,
    height:20,
    borderColor:colors.GREEN,
    borderWidth:2
  },
})
