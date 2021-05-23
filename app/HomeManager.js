import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StatusBar } from 'react-native'
import firebase from 'firebase'
import 'firebase/auth'
import MapView, { Marker, Callout } from 'react-native-maps'
import { colors } from './common/theme'
import { Icon } from 'react-native-elements'
import { customMapStyle } from './common/mapStyle'

export default function HomeManager(props) {
  const latitudeDelta = 0.0922
  const longitudeDelta = 0.0421
  const latitude = 25.286106
  const longitude = 51.5348170

  const [priority, setPriority] = useState([
    {
      id: 1,
      priority: "low",
      location: {
        lat: 25.286106,
        lng: 51.5348170
      }
    },
    {
      id: 2,
      priority: "medium",
      location: {
        lat: 25.286106 + 0.01,
        lng: 51.5348170 + 0.01
      }
    },
    {
      id: 3,
      priority: "high",
      location: {
        lat: 25.286106 - 0.02,
        lng: 51.5348170 - 0.02
      }
    },
    {
      id: 4,
      priority: "high",
      location: {
        lat: 25.286106 - 0.03,
        lng: 51.5348170 - 0.03
      }
    },

  ])

  const [report, setReport] = useState([
    {
      id: 1,
      priority: "low",
      location: {
        lat: 25.286106-0.02,
        lng: 51.5348170-0.03
      }
    },
    {
      id: 2,
      priority: "medium",
      location: {
        lat: 25.286106 - 0.04,
        lng: 51.5348170 - 0.04
      }
    },
    

  ])

  

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
      // hidden={true} 
      // barStyle={"default"}
      // showHideTransition={"fade"}
      />
      {/* {console.log("-------------", props.navigation)} */}
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        provider="google"
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        customMapStyle={customMapStyle}
      // userInterfaceStyle={"dark"}
      >
        {priority && priority.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.lng,
            }}

          // redraw
          // key={index}
          >
            <TouchableOpacity style={{
              backgroundColor: item.priority === "high" ? colors.RED : item.priority === "medium" ? colors.YELLOW : colors.GREEN,
              aspectRatio: 1 / 1, borderRadius: 100, padding: 7
            }}>
              <Icon name="trashcan" type="octicon" color={colors.WHITE} size={25} />

            </TouchableOpacity>
            <Callout tooltip style={{}} onPress={() => props.navigation.navigate("PriorityAssign")}>
              <View style={{
                padding: 3
              }}>
                <TouchableOpacity
                  // onPress={() => props.navigation.navigate("ReportAssign")}
                  // onPress={() => calloutPress()}
                  style={{ backgroundColor: colors.GREEN, justifyContent: "center", alignItems: "center", width: 80, height: 40, borderRadius: 10 }}>
                  <Text style={{ color: colors.WHITE }}>Assign</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}

{report && report.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.location.lat,
              longitude: item.location.lng,
            }}

          // redraw
          // key={index}
          >
            <TouchableOpacity style={{
              backgroundColor:colors.ORANGE,
              aspectRatio: 1 / 1, borderRadius: 100, padding: 7
            }}>
              <Icon name="report" type="material" color={colors.WHITE} size={25} />

            </TouchableOpacity>
            <Callout tooltip style={{}} onPress={() => props.navigation.navigate("ReportDetail")}>
              <View style={{
                padding: 3
              }}>
                <TouchableOpacity
                  // onPress={() => props.navigation.navigate("ReportAssign")}
                  // onPress={() => calloutPress()}
                  style={{ backgroundColor: colors.GREEN, justifyContent: "center", alignItems: "center", width: 80, height: 40, borderRadius: 10 }}>
                  <Text style={{ color: colors.WHITE }}>View</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>
      <View
        style={{
          alignSelf: 'center',
          // backgroundColor: 'red',
          width: '90%',
          minHeight: 60,
          position: 'absolute',
          top: '6%',
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.openDrawer()}
          style={{
            height: 55,
            backgroundColor: colors.GREEN,
            aspectRatio: 1 / 1,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <Icon name="menu" type="feather" color={colors.WHITE} size={25} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignSelf: 'center',
          // backgroundColor: 'red',
          width: '90%',
          minHeight: 60,
          position: 'absolute',
          bottom: '4%',

        }}
      >
        <View style={{marginBottom:15}}>
        <TouchableOpacity
              onPress={() => props.navigation.navigate('Report')}
              // onPress={() => props.navigation.navigate('Priority')}
              style={{
                height: 55,
                backgroundColor: colors.ORANGE,
                aspectRatio: 1 / 1,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Icon name="report" type="material" color={colors.WHITE} size={33} />
            </TouchableOpacity>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View>
            <TouchableOpacity
              // onPress={() => props.navigation.navigate('Report')}
              onPress={() => props.navigation.navigate('Priority')}
              style={{
                height: 55,
                backgroundColor: colors.GREEN,
                aspectRatio: 1 / 1,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Icon name="trashcan" type="octicon" color={colors.WHITE} size={28} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Chat')}
              style={{
                height: 55,
                backgroundColor: colors.GREEN,
                aspectRatio: 1 / 1,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Icon
                name="chatbubble-ellipses-sharp"
                type="ionicon"
                color={colors.WHITE}
                size={28}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
