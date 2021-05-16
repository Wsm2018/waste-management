import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import { Input, Icon } from "react-native-elements";
import { LinearGradient } from 'expo-linear-gradient';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";
  import * as Animatable from 'react-native-animatable';

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1}}>
      <LinearGradient colors={['#82c582', '#60bd90', '#50ba94']} style={styles.container}>
      {/* <LinearGradient colors={['#a6bd8d', '#6b9351', '#3a6230']} style={styles.container}> */}
          <View style={styles.topBody}>
          </View>
          <Animatable.View 
            style={styles.bottomBody}
            animation="zoomIn" 
            // iterationCount="infinite" 
            duration={3000} 
            // iterationDelay={3000} 
            easing="ease-in-out"            
          >
              <Image
                style={{
                aspectRatio:1/1,
                flex:0.8,
                // width:400,
                alignSelf:"center"
                }}
                source={require('../assets/bg1.png')}
            />            
          </Animatable.View>

          <View style={styles.overBody}>
              <View style={styles.overBodyTop}>
                <Text style={{fontSize:50, color:"white", fontFamily:"serif", fontWeight:"bold"}}>
                    Waste
                    </Text>
              </View>
              <View style={styles.overBodyMid}>
                <Text style={{fontSize:18, color:"white", fontFamily:"serif", fontWeight:"bold", textAlign:"center"}}>
                    A smart waste-management system in Qatar
                    </Text>
              </View>
              <View style={styles.overBodyBottom}>
                <TouchableOpacity style={styles.getStartedButton} onPress={()=> navigation.navigate("Login")}>
                    <Text style={{color:"white", fontFamily:"serif", fontWeight:"bold", fontSize:18,}}>
                        Get Started
                    </Text>
                </TouchableOpacity>
              </View>       
          </View>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: 'column',
      justifyContent: 'center',
    },
  
    modalContainer: {
      flex: 1,
      flexDirection: "row",
      maxHeight: responsiveHeight(8),
      backgroundColor: "rgba(250,0,0, 0.7)",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },

    topBody:{
        flex:1, 
        // backgroundColor:"red"
    },
    bottomBody:{
        flex:1, 
        justifyContent:"flex-end"
    },
    overBody:{
        flex:1,
        // backgroundColor:"red",
        position:"absolute",
        // borderWidth:1,
        // borderColor:"yellow",
        width:"100%",
        height:"70%",
        alignItems:"center",
        
    },
    overBodyTop:{
        flex:0.8,
        // justifyContent:"center"
    },
    overBodyMid:{
        flex:1,
        // borderWidth:1,
        width:300,
        
    },
    overBodyBottom:{
        flex:2,
        // justifyContent:"center"
    },
    getStartedButton:{
        backgroundColor:"#82c582",
        borderColor:"#50ba94",
        borderWidth:2,
        width:200,
        height:57,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,

        //Android Shadow
        elevation:5,

        //IOS Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    }
  });