import React, { useEffect, useState } from 'react'
import { View, Text, Button, TouchableOpacity, StatusBar, Modal , StyleSheet, Dimensions,ScrollView} from 'react-native'
import firebase from 'firebase'
import 'firebase/auth'
import db from "../db";
import MapView, { Marker, Callout } from 'react-native-maps'
import { colors } from './common/theme'
import { Icon } from 'react-native-elements'
import { customMapStyle } from './common/mapStyle'
const { width, height } = Dimensions.get("window")

export default function ScheduleMap(props) {
  const latitudeDelta = 0.0922
  const longitudeDelta = 0.0421
  const latitude = props.navigation.getParam("disLat");
  const longitude = props.navigation.getParam("disLong");
  const districtId = props.navigation.getParam("districtId");
  const description = props.navigation.getParam("description");
  const [bins, setBins] = useState([]);
  const [binsCoords, setBinsCoords] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const fetchBins = () => {
    const unsub = db.collection("Bins").where("districtId", "==", `${districtId}`).onSnapshot((querySnap) => {
      let bin = [];
      querySnap.forEach((doc) => {
        bin.push({ id: doc.id, ...doc.data() });
      });
      setBins([...bin]);
      let binLocations = bin.map(b => {
        return `${b.location.U},${b.location.k}`
      })
      new Promise(function (resolve, reject) {

        fetch(
          `https://api.tomtom.com/routing/1/calculateRoute/${binLocations.join(":")}/json?key=AVDrLKH88fjFF21wAzG5FjQ4RA704AA7`
        )
          .then((response) => response.json())
          .then((res) => {
            let finalPoints = []
            res.routes[0].legs.forEach(leg => {
              finalPoints = finalPoints.concat(leg.points)
            })
            setBinsCoords(finalPoints)
            console.log("==========res length=========", finalPoints.length)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    });
    return unsub;
  };

  useEffect(() => {
    const unsub = fetchBins();
    return () => {
      unsub();
    };
  }, []);

  const descriptionModal = () => {
    return (
      <Modal
        animationType="fade"
        visible={openModal}
      >
        <View style={styles.detailsModalContainer}>
          <View
            style={styles.detailsModalInnerContainer}
          >
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>Report Details</Text>

              <View style={styles.horizontalLLine} />
              <ScrollView
                style={styles.scrollViewStylePhone}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                <View style={styles.detailsmsgContainer}>
                  <Text style={styles.detailsMsgText} selectable>
                    {description}
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.okButtonContainer}>
                <TouchableOpacity
                  style={styles.okButtonStyle}
                  onPress={() => {
                    setOpenModal(false)
                  }}
                >
                  <Text style={styles.signInTextStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

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



  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar
      // hidden={true} 
      // barStyle={"default"}
      // showHideTransition={"fade"}
      /> */}
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
        {/* {priority && priority.map((item, index) => (
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
                padding:3
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
        ))} */}

        {bins &&
          bins.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.location.U,
                longitude: item.location.k,
              }}

            // redraw
            // key={index}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:
                    item.capacity === 3
                      ? colors.RED
                      : item.capacity === 2
                        ? colors.YELLOW
                        : colors.GREEN,
                  aspectRatio: 1 / 1,
                  borderRadius: 100,
                  // borderTopRightRadius:100,
                  // borderTopLeftRadius:100,
                  // borderBottomRightRadius:1000,
                  // borderBottomLeftRadius:1000,
                  padding: 7,
                }}
              >
                {/* {console.log("item ", item)} */}
                <Icon
                  name="trashcan"
                  type="octicon"
                  color={colors.WHITE}
                  size={22}
                />
              </TouchableOpacity>
              {/* <Callout
                tooltip
                // onPress={() => changeBin(item, index)}
                // style={{}}
                onPress={() =>
                  props.navigation.navigate("PriorityAssign", { bin: item })
                }
              >
                <View
                  style={{
                    padding: 3,
                  }}
                >
                  <TouchableOpacity
                    // onPress={() => props.navigation.navigate("ReportAssign")}
                    // onPress={() => calloutPress()}
                    style={{
                      backgroundColor: colors.GREEN,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 80,
                      height: 40,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: colors.WHITE }}>Assign</Text>
                  </TouchableOpacity>
                </View>
              </Callout> */}
            </Marker>
          ))}
        {bins.length > 0 && <MapView.Polyline
          coordinates={binsCoords}
          strokeWidth={4}
          strokeColor="green"
        />}
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
          onPress={() => props.navigation.goBack()}
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
          <Icon name="angle-left" type="font-awesome" color={colors.WHITE} size={25} />
        </TouchableOpacity>
      </View>
      {description && <View
        style={{
          alignSelf: 'flex-end',
          // backgroundColor: 'red',
          width: '20%',
          minHeight: 60,
          position: 'absolute',
          top: '6%',
        }}
      >
        <TouchableOpacity
          onPress={() => setOpenModal(true)}
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
          <Text style={{ color: colors.WHITE, textAlign: "center" }}>Details</Text>
        </TouchableOpacity>
      </View>}

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
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
        {/* <View>
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
        </View> */}
        {descriptionModal()}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  //details modal
  horizontalLLine: {
    width: width - 110,
    height: 0.5,
    backgroundColor: colors.BLACK,
    alignSelf: "center",
  },
  okButtonContainer: {
    flex: 1,
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  okButtonStyle: {
    flexDirection: "row",
    backgroundColor: "#6e6e6e",
    alignItems: "center",
    minHeight: 45,
    justifyContent: "center",
    width: "90%",
    borderRadius: 5,
  },
  signInTextStyle: {
    fontFamily: "Roboto-Bold",
    fontSize: 25,
    fontWeight: "700",
    color: colors.WHITE,
  },
  detailsModalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  detailsModalInnerContainer: {
    height: 580,
    width: width * 0.9,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7,
  },
  detailsModalInnerContainerPhone: {
    height: 200,
    width: width * 0.9,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7,
  },
  detailsContainer: {
    flex: 2,
    justifyContent: "space-between",
    width: width - 80,
  },
  detailsText: {
    flex: 1,
    top: 15,
    color: colors.BLACK,
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    alignSelf: "center",
  },
  detailsMsgText: {
    color: colors.BLACK,
    fontFamily: "Roboto-Regular",
    fontSize: 17,
    alignSelf: "stretch",
    textAlign: "left",
    justifyContent: "space-between",
  },
  scrollViewStyle: {
    width: width - 80,
    height: 400,
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: colors.GREY.primary,
  },
  scrollViewStylePhone: {
    width: width - 80,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  detailsmsgContainer: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "space-between",
  },

  //alert modal
  alertModalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  alertModalInnerContainer: {
    height: 200,
    width: width * 0.85,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7,
  },
  alertContainer: {
    flex: 2,
    justifyContent: "space-between",
    width: width - 100,
  },
})
