import React, { useEffect, useState } from "react";

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
} from "react-native";

import { Input, Icon, Header } from "react-native-elements";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import Modal from "react-native-modal";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "./common/theme";
import db from "../db";

export default function PriorityAssign(props) {
  const [crews, setCrews] = useState([]);
  const [users, setUsers] = useState([]);

  const getCrew = () => {
    const unsub = db.collection("Crews").onSnapshot((query) => {
      let crew = [];
      query.forEach((doc) => {
        const data = doc.data();
        const driver = getCrewName(data.driver);
        const collector1 = getCrewName(data.collector1);
        const collector2 = getCrewName(data.collector2);
        const backupCollector1 = getCrewName(data.backupCollector1);
        const backupCollector2 = getCrewName(data.backupCollector2);

        crew.push({
          id: doc.id,
          driver,
          collector1,
          collector2,
          backupCollector1,
          backupCollector2,
        });
      });
      setCrews([...crew]);
    });
    return unsub;
  };

  const getCrewName = (id) => {
    const user = users.filter((item) => id === item.id)[0];
    return user.firstName;
  };

  const getUser = () => {
    const unsub = db.collection("Users").onSnapshot((query) => {
      let user = [];
      query.forEach((doc) => {
        user.push({ id: doc.id, ...doc.data() });
      });
      setUsers([...user]);
    });
    return unsub;
  };

  useEffect(() => {
    const usersUnsub = getUser();
    return () => {
      usersUnsub();
    };
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const crewsUnsub = getCrew();
      return () => {
        crewsUnsub();
      };
    }
  }, [users]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.LIGHTGRAY }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <StatusBar hidden={false} /> */}
      <Header
        backgroundColor={colors.GREEN}
        leftComponent={{
          icon: "angle-left",
          type: "font-awesome",
          color: colors.WHITE,
          size: 30,
          component: TouchableWithoutFeedback,
          onPress: () => {
            props.navigation.goBack();
          },
        }}
        centerComponent={
          <Text style={{ fontSize: 20, color: colors.WHITE }}>
            Priority Assign
          </Text>
        }
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
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          width: "90%",
          alignSelf: "center",
        }}
      >
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={{ fontSize: 25, color: colors.BLACK }}>
            Available Crew
          </Text>
        </View>
        <View style={{ flex: 10 }}>
          <ScrollView>
            {crews.map((item, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  backgroundColor: colors.WHITE,
                  minHeight: 100,
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
              >
                <View style={{ width: '75%', justifyContent:"space-evenly", paddingLeft:10}}>
                  <Text style={{fontWeight:"bold", color:colors.black, fontSize:16}}>Crew {index+1} </Text>
                  <Text style={{ color:colors.DARKGRAY}}>Driver - {item.driver}</Text>
                  <Text style={{ color:colors.DARKGRAY}}>Collectors - {`${item.collector1} & ${item.collector2}`}</Text>
                </View>
                <View style={{ width: '25%' }}>
                  <TouchableOpacity
                  onPress={()=>props.navigation.navigate('Home')}
                    style={{
                      width: '100%',
                      backgroundColor: colors.GREEN,
                      minHeight: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius:10,
                      borderBottomRightRadius:10
                    }}
                  >
                    <Text style={{color:colors.WHITE,}}>Assign</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
  },
});
