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
  Dimensions,
} from 'react-native'

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
import { colors } from './common/theme'
import color from 'color'
import db from '../db'
const { width, height } = Dimensions.get('window')

export default function Chat(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const user = props.navigation.getParam("item", "some default value");
  const [newMessage, setNewMessage] = useState(null)
  const [sent, setSent] = useState([])
  const [recieved, setRecieved] = useState([])
  const [sortedChat, setSortedChat] = useState([])

  const send = () => {
    db.collection("Chats").add({
      from: firebase.auth().currentUser.uid,
      to: user.id,
      message: newMessage,
      date: new Date(),
      mDate: new Date + ""
    })
    setNewMessage(null)
  }

  useEffect(() => {

    db.collection("Chats").onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        r.push({ id: doc.id, ...doc.data() });

      });
      setSent([...r]);
    })

  }, [])


  useEffect(() => {
    if (sent.length > 0) {
      var filtering = sent.filter(m =>
        (m.to == user.id && m.from == firebase.auth().currentUser.uid)
        ||
        (m.to == firebase.auth().currentUser.uid && m.from == user.id)
      )
      console.log("all messages", filtering)

      filtering = filtering.sort(
        (a, b) => b.date.toDate() - a.date.toDate()
      );
      console.log("84")
      var temp = []
      for (let i = filtering.length - 1; i >= 0; i--) {
        console.log("iiii", i)
        temp.push(filtering[i])
      }
      
      // console.log("the sorted chat", sortedChat, filtering)

      //filter all date
      var dates = []
      for( let i=0 ; i < temp.length ; i++){
        
        if( dates.filter( d => d.date == 
          ( temp[i].mDate.split(" ")[0] + " " + 
           temp[i].mDate.split(" ")[1] +" " + 
           temp[i].mDate.split(" ")[2] +" " + 
           temp[i].mDate.split(" ")[3]) ).length == 0)
        {
          console.log("here 98")
          dates.push( { date : temp[i].mDate.split(" ")[0] +" " + 
          temp[i].mDate.split(" ")[1]+" " +
          temp[i].mDate.split(" ")[2] +" " +
          temp[i].mDate.split(" ")[3] })
          var allDates = temp.filter( d => 
            d.mDate.split(" ")[0]+" " +
            d.mDate.split(" ")[1]+" " +
            d.mDate.split(" ")[2] +" " +
            d.mDate.split(" ")[3] === dates[dates.length -1].date)

            dates[dates.length -1].allDates = allDates
            
        }

        //console.log("here is the date",toDate( sortedChat.date))
      }
      console.log("all date for date",dates)
      setSortedChat(...[dates])
    }
  }, [sent])


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        console.log("------ Keyboard")
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        console.log("------ No Keyboard")
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.WHITE }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>{user.email}</Text>
        }
      />

      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          backgroundColor: colors.WHITE,
          width: '100%',
          alignSelf: 'center',
        }}
      >

        <View style={{ flex: 10 }}>
          <ScrollView style={{}}>

            {sortedChat.length > 0 ?
              sortedChat.map((item, index) =>
              <View>
                <View style={{ marginLeft:"auto", marginRight:"auto", borderRadius: 15}}>
                  <Text style={{padding:5,textAlign: "center" , backgroundColor:"#dfecdf", width:"30%"}}>{item.date}</Text>
                  </View>
                  {
                    item.allDates.map( m => 
                      
                      m.from == firebase.auth().currentUser.uid ?

                    <View style={{
                      width: "100%", paddingLeft: 10,
                      marginTop: 10,
                      alignItems: "flex-start",
                      // backgroundColor: "red"
                    }}>
                      <View style={{ backgroundColor: colors.DARKGRAY, minHeight: 50, maxWidth: "60%", borderRadius: 15, borderTopLeftRadius: 0, justifyContent: "center", paddingLeft: 10, paddingRight: 10 }}>
                        <Text style={{ color: colors.WHITE }}>{m.message}</Text>
                      </View>
                      <View style={{ maxWidth: "60%", paddingLeft: 5, marginTop: 2 }}>
                        <Text>{m.mDate.split(" ")[4]}</Text>
                      </View>
                    </View>
                    :
                    <View style={{
                      width: "100%", paddingRight: 10,
                      marginTop: 10,
                      alignItems: "flex-end"
                      // backgroundColor: "red"
                    }}>
                      <View style={{
                        backgroundColor: colors.GREEN,
                        minHeight: 50,
                        maxWidth: "60%",
                        borderRadius: 15,
                        borderTopRightRadius: 0,
                        justifyContent: "center",
                        paddingLeft: 10,
                        paddingRight: 10
                      }}>
                        <Text style={{ color: colors.WHITE }}>{m.message}</Text>
                      </View>
                      <View style={{ maxWidth: "60%", paddingRight: 5, marginTop: 2 }}>
                        <Text>{m.mDate.split(" ")[4]}</Text>
                      </View>
                    </View>
                      
                      
                      
                      )
                    
                  }
                  

                  </View>
                
              )

              : null}

            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: isKeyboardVisible ?
              Platform.OS === 'ios' ? -200 : -200
              :
              0,
            flex: 1,
            borderTopWidth: 1,
            borderColor: colors.LIGHTGRAY,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
            <TextInput
              style={{
                backgroundColor: colors.WHITE,
                flex: 0.8,
                width: "90%",
                borderRadius: 100,
                paddingLeft: 8,
                paddingRight: 8,
                borderWidth: 2,
                borderColor: colors.GREEN
              }}
              onChangeText={setNewMessage}
              value={newMessage}
              placeholder={"Type here"}
            />
          </View>
          <View style={{ flex: 1, justifyContent: "center", }}>
            <TouchableOpacity
              style={{
                // flex: 0.8,
                height: 50,
                width: 50,
                aspectRatio: 1 / 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: !newMessage ? colors.GRAY : colors.GREEN,
                borderRadius: 100
              }}
              disabled={!newMessage}
              onPress={() => send()}
            >
              <Icon name="send" type="material" color={colors.WHITE} size={20} />
            </TouchableOpacity>
          </View>
        </View>
        {Platform.OS === 'ios' && <View style={{ flex: 0.2 }}></View>}
      </View>
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
