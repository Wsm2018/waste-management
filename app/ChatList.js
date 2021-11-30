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
import db from '../db'
import Chat from './Chat'
const { width, height } = Dimensions.get('window')

export default function ChatList(props) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [chatsF, setChatsF] = useState([])
  const [chatsT, setChatsT] = useState([])
  const [ users, setUsers] = useState([])
  const [chats , setChats] = useState([])
  const [others , setOthers] = useState([])

  useEffect(() => {
    //getUsers
    //setChats([])
    db.collection("Users").onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        r.push({ id: doc.id, ...doc.data() });
      });
      setUsers([...r]);
    })

    //getMessages FROM & TO the user
    db.collection("Chats").where("from","==",firebase.auth().currentUser.uid).onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        r.push({ id: doc.id, ...doc.data() });
      });
      setChatsF([...r]);
      //setUsers([...r])
    })
    db.collection("Chats").where("to","==",firebase.auth().currentUser.uid).onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        r.push({ id: doc.id, ...doc.data() });
      });
      setChatsT([...r]);
      //setUsers([...r])
    })
  },[])



  useEffect(()=>{

    
      //console.log("uzzzeeerrsss", users)
      let all = chatsF ; all.push(chatsT)
      let userArr = []
      for( let i=0 ; i < chatsT.length ; i++){
        // add user id if not in arr
        if( userArr.filter( u => u == chatsT[i].from).length == 0){
          userArr.push(chatsT[i].from)
        }

      }
      for( let i=0 ; i < chatsT.length ; i++){
        // add user id if not in arr
        if( userArr.filter( u => u == chatsT[i].from).length == 0){
          userArr.push(chatsT[i].from)
        }
      }

      //get users
      let finalList = []
      for( let i = 0 ; i < userArr.length ; i++){
        let seenCounter = chatsT.filter( c =>  userArr[i] == c.from && c.seen == false ).length
        let u = users.filter( u => u.id == userArr[i])[0]
        

        let lastMessage = chatsT.concat(chatsF) 
        lastMessage = lastMessage.filter( l => l.from == userArr[i] || l.to == userArr[i] )
        lastMessage = lastMessage.sort((a,b)=> a.date - b.date)[lastMessage.length -1]
        finalList.push({ user: u , unseen : seenCounter, message: lastMessage})
      }
      //order list
      finalList = finalList.sort((a,b)=> a.message.date - b.message.date)
      setChats(finalList)
     // console.log("--------", userArr )
      //console.log("FINALLLL", finalList)
      

    //remove chat users from other users list
    let temp = []
    for(let i=0 ; i < users.length ; i++){
      if (userArr.filter( u => u == users[i].id).length == 0){
        temp.push(users[i])
      }
    }
    setOthers(temp)
    
  },[chatsT,chatsF])


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
          <Text style={{ fontSize: 20, color: colors.WHITE }}>Chats</Text>
        }
      />
<ScrollView style={{}}>
      <View
        style={{
          flex: 1,
          //backgroundColor: 'red',
          backgroundColor: colors.WHITE,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {
          chats?
          chats.map( item =>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Chat',  {item : item.user})}
                style={{ 
                   justifyContent: "space-evenly",
                    paddingLeft: 30,
                     borderBottomWidth: 5,
                      borderColor:"#70a970", 
                      marginBottom:5, 
                      paddingTop:10 ,
                      backgroundColor:"#dfecdf", 
                      }}>
                <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.user.email}</Text>
                <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.message.message}</Text>
                <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.unseen}</Text>
                <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.message.mDate}</Text>
                <Text style={{ color: colors.DARKGRAY }}>{item.user.role}</Text>
              </TouchableOpacity>
          )
          :
          null
        }
        <Text>Others</Text>
        {
          others ?
          others.map( item =>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Chat',  {item})}
              style={{ 
                 justifyContent: "space-evenly",
                  paddingLeft: 30,
                   borderBottomWidth: 5,
                    borderColor:"#70a970", 
                    marginBottom:5, 
                    paddingTop:10 ,
                    backgroundColor:"#dfecdf", 
                    }}>
              <Text style={{ fontWeight: "bold", color: colors.black, fontSize: 16 }}>{item.email}</Text>
              <Text style={{ color: colors.DARKGRAY }}>{item.role}</Text>
            </TouchableOpacity>
        )
        :
        null
        }


        {Platform.OS === 'ios' && <View style={{ flex: 0.2 }}></View>}
      </View>
      </ScrollView>

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
