import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet,TouchableWithoutFeedback } from 'react-native'
import { Input, Icon,CheckBox,Header } from 'react-native-elements';

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
export default function ScheduleEdit({ navigation }) {
  const [permaChange, setPermaChange] = useState(false)
  
  const [open1, setOpen1] = useState(true);
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

          <View style={{flex:5.3,justifyContent:'space-around',alignItems:'center'}}>

          <View style={{width:'80%',}}>
            <Text>Choose Available Crew</Text>
            <View style={{padding:10,borderRadius:7,borderColor:colors.GREEN,borderWidth:1}}>
            <PickerSelect
              items={crews}
              onValueChange={(value) => setSelectedCrew}
            />
            </View>
          </View>

          <View style={{width:'80%'}}>
            <Text>Choose Available Driver</Text>
            <View style={{padding:10,borderRadius:7,borderColor:colors.GREEN,borderWidth:1}}>
            <PickerSelect
              items={drivers}
              onValueChange={(value) => selectedDriver}
            />
            </View>
          </View>

          <View style={{width:'80%'}}>
            <Text>Choose First Collector</Text>
            <View style={{padding:10,borderRadius:7,borderColor:colors.GREEN,borderWidth:1}}>
            <PickerSelect
              items={firstCollectors}
              onValueChange={(value) => selectedFirstCollector}
            />
            </View>
          </View>

          <View style={{width:'80%'}}>
            <Text>Choose Second Collector</Text>
            <View style={{padding:10,borderRadius:7,borderColor:colors.GREEN,borderWidth:1}}>
            <PickerSelect
              items={secondCollectors}
              onValueChange={(value) => setSelectedSecondCollector}
            />
            </View>
          </View> 

          
          <View style={styles.checkboxContainer}>
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
          </View>

          
            <TouchableOpacity 
              style={{
                width:'25%',
                height:'6%',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:colors.GREEN,
                borderRadius:7
              }}
            >
              <Text style={{color:'white'}}>Save</Text>
            </TouchableOpacity>
          
          

          </View>

          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            
            
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
    width:20,
    height:20,
    borderColor:colors.GREEN,
    borderWidth:2
  },
})
