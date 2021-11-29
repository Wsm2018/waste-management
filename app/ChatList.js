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
    setChats([])
    db.collection("Users").onSnapshot(querySnapshot => {
      let r = [];
      querySnapshot.forEach(doc => {
        if( doc.id != firebase.auth().currentUser.uid){
          r.push({ id: doc.id, ...doc.data() });
        }
        
      });
      //setChats([...r]);
      setUsers([...r])
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
if(users){
  setChats([])
  let allChats = chatsF 
    allChats.push(chatsT)

console.log("chatssss", allChats)
    // add the latest messages to 
    let usersChats = []
    for( let i=0 ; i < users.length ; i++){
      
      //add latest message with number of not seen / and filter by date asc
      let c = allChats.filter( u => u.to == users[i].id || u.from == users[i].id )
      console.log("cccccccccc", c , users[i].id)
      //unseen
      let unseen = c.filter( r => r.from === users[i].id ).length

      //latest 
      let sorted = c.sort((a,b)=> a.date - b.date)[c.length -1]
      //console.log("example------------------------------------------------------------------------------------------------------- ", c , unseen , sorted)
      
      if( c.length > 0){
        let temp = chats
        temp.push({ user : users[i], message: sorted , unseen: unseen})
        setChats(temp)
      }
      
    }
}
  },[users])

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
          chats.map( item =>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Chat', { item})}
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
                <Text style={{ color: colors.DARKGRAY }}>{item.role}</Text>
              </TouchableOpacity>
          )
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
