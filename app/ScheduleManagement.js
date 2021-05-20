import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'
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
export default function ScheduleManagement({ navigation }) {
  const [email, setEmail] = useState('')
  
  let Schedules = [
    {
      number:1,
      zone:1,
      crew:1
    },
    {
      number:2,
      zone:2,
      crew:2
    },
  ]

  return (
    <View style={{ flex: 1, backgroundColor:colors.WHITE }}>
      
        <View style={{flex:1}}>
          <View style={{flex:0.7,justifyContent:'flex-end',alignItems:'center'}}>
            <Text style={{fontSize:25,color:colors.GREEN}}>Schedule</Text>
          </View>

          <View style={{flex:5.3,justifyContent:'center'}}>
          
          {Schedules.map((s,i)=>(
            <Card style={{elevation:0}}>
              <Card.Content>
              <View style={{padding:10,borderRadius:20,flexDirection:'row',alignItems:'center',justifyContent:'space-around', borderWidth:1,borderColor:colors.GREEN}}>
                <View>
                  <Title>Schedule {s.number}</Title>
                  <Paragraph><Text>zone {s.zone}</Text></Paragraph>
                  <Paragraph><Text>crew {s.crew}</Text></Paragraph>
                </View>
                <View>
                  <Button onPress={()=>navigation.navigate("ScheduleEdit")} color={colors.GREEN} title="Manage" />
                </View>
              </View>
              </Card.Content>

            </Card>
          ))}

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
})
