import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import 'firebase/auth'
import MapView from 'react-native-maps'
import { colors } from './common/theme'
import { Icon } from 'react-native-elements'
import { customMapStyle} from './common/mapStyle'
import { NavigationActions } from 'react-navigation';

export default function HomeManager({ props }) {
  const latitudeDelta = 0.0922
  const longitudeDelta = 0.0421
  const latitude = 25.286106
  const longitude = 51.534817

  return (
    <View style={{ flex: 1 }}>
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
      ></MapView>
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
          onPress={() => { props.navigation.toggleDrawer(); }}
        >
          <Icon
              name="menu"
              type="feather"
              color={colors.WHITE}
              size={25}
            />
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <TouchableOpacity
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
                    name="flag"
                    type="ionicon"
                    color={colors.WHITE}
                    size={28}
                  />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
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
  )
}
