import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet,TouchableWithoutFeedback } from 'react-native'
import { Input, Icon,Header } from 'react-native-elements'
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
        <View style={{flex:1}}>
          
          <View style={{flex:5.3,justifyContent:'center'}}>
          {Schedules.map((s,i)=>(
            <Card key={i}style={{elevation:0}}>
              <Card.Content>
              <View style={{padding:10,borderRadius:20,flexDirection:'row',alignItems:'center',justifyContent:'space-around', borderWidth:1,borderColor:colors.GREEN}}>
                <View style={{flex:2}}>
                  <Title>Schedule {s.number}</Title>
                  <Paragraph><Text>zone {s.zone}</Text></Paragraph>
                  <Paragraph><Text>crew {s.crew}</Text></Paragraph>
                </View>
                <View style={{flex:1}}>
                  <TouchableOpacity style={{borderRadius:10,backgroundColor:colors.GREEN,width:'100%',padding:10,alignItems:'center'}} onPress={()=>navigation.navigate("ScheduleEdit")}>
                    <Text style={{color:colors.WHITE}}>Manage</Text>
                  </TouchableOpacity>
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
