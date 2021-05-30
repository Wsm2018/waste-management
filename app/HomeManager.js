import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StatusBar } from "react-native";
import db from "../db";
import MapView, { Marker, Callout } from "react-native-maps";
import { colors } from "./common/theme";
import { Icon } from "react-native-elements";
import { customMapStyle } from "./common/mapStyle";
import * as Location from "expo-location";

export default function HomeManager(props) {
  const latitudeDelta = 0.0922;
  const longitudeDelta = 0.0421;
  const latitude = 25.286106;
  const longitude = 51.534817;
  const [location, setLocation] = useState(null);
  const [municipalities, setMunicipalities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [bins, setBins] = useState([]);

  const fetchMunicipalities = () => {
    const unsub = db.collection("Municipalities").onSnapshot((querySnap) => {
      let array = [];
      querySnap.forEach((doc) => {
        array.push({ id: doc.id, ...doc.data() });
      });
      setMunicipalities([...array]);
    });
    return unsub;
  };

  const fetchDistricts = () => {
    const unsub = db.collection("Districts").onSnapshot((querySnap) => {
      let district = [];
      querySnap.forEach((doc) => {
        district.push({ id: doc.id, ...doc.data() });
      });
      setDistricts([...district]);
    });
    return unsub;
  };

  const fetchUserLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation);
  };

  const fetchBins = () => {
    const unsub = db.collection("Bins").onSnapshot((querySnap) => {
      let bin = [];
      querySnap.forEach((doc) => {
        bin.push({ id: doc.id, ...doc.data() });
      });
      setBins([...bin]);
    });
    return unsub;
  };

  useEffect(() => {
    const unsub = fetchBins();
    return () => {
      unsub();
    };

    // let unsubArr = [];
    // if (districts.length > 0) {
    //   let binArr = [];
    //   districts.map(async (item, index) => {
    //     const binRef = db
    //       .collection("Districts")
    //       .doc(item.id)
    //       .collection("bins");
    //     const unsub = binRef.onSnapshot((querySnap) => {
    //       querySnap.forEach((doc) => {
    //         db.collection("Bins").add({
    //           ...doc.data(),
    //           districtId: item.id,
    //           zone: item.zoneNumber,
    //         });
    //         binArr.push({
    //           id: doc.id,
    //           ...doc.data(),
    //           districtId: item.id,
    //           zone: item.zoneNumber,
    //         });
    //       });
    //       if (index === districts.length - 1) {
    //         setBins([...binArr]);
    //       }
    //     });

    //     unsubArr.push(unsub);
    //   });
    // }
    // return () => {
    //   unsubArr.forEach((item) => item());
    // };
  }, []);

  useEffect(() => {
    const unsub = fetchMunicipalities();
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = fetchDistricts();
    return () => {
      unsub();
    };
  }, []);

  // const changeBin = (item, index) => {
  //   item.capacity = 2;
  //   console.log(item)
  //   db.collection("Bins")
  //     .doc(item.id)
  //     .update({
  //       capacity: item.capacity,
  //       condition: item.condition,
  //       location: item.location,
  //       temp: item.temp,
  //       type: item.type,
  //       weight: item.weight,
  //       district: item.districtId,
  //       zone: item.zone
  //     });
  // };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden={true}
        // barStyle={"default"}
        // showHideTransition={"fade"}
      />
      {/* {console.log("-------------", props.navigation)} */}

      {/* {location && ( */}
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        provider="google"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        customMapStyle={customMapStyle}
        // userInterfaceStyle={"dark"}
      >
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
                  padding: 7,
                }}
              >
                {/* {console.log("item ", item)} */}
                <Icon
                  name="trashcan"
                  type="octicon"
                  color={colors.WHITE}
                  size={25}
                />
              </TouchableOpacity>
              <Callout
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
              </Callout>
            </Marker>
          ))}

        {/* {report &&
          report.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lng,
              }}

              // redraw
              // key={index}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.ORANGE,
                  aspectRatio: 1 / 1,
                  borderRadius: 100,
                  padding: 7,
                }}
              >
                <Icon
                  name="report"
                  type="material"
                  color={colors.WHITE}
                  size={25}
                />
              </TouchableOpacity>
              <Callout
                tooltip
                style={{}}
                onPress={() => props.navigation.navigate("ReportDetail")}
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
                    <Text style={{ color: colors.WHITE }}>View</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          ))} */}
      </MapView>
      {/* )} */}

      <View
        style={{
          alignSelf: "center",
          // backgroundColor: 'red',
          width: "90%",
          minHeight: 60,
          position: "absolute",
          top: "6%",
        }}
      >
        <TouchableOpacity
          onPress={() => props.navigation.openDrawer()}
          style={{
            height: 55,
            backgroundColor: colors.GREEN,
            aspectRatio: 1 / 1,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
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
          alignSelf: "center",
          // backgroundColor: 'red',
          width: "90%",
          minHeight: 60,
          position: "absolute",
          bottom: "4%",
        }}
      >
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Report")}
            // onPress={() => props.navigation.navigate('Priority')}
            style={{
              height: 55,
              backgroundColor: colors.ORANGE,
              aspectRatio: 1 / 1,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
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
              name="report"
              type="material"
              color={colors.WHITE}
              size={33}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <TouchableOpacity
              // onPress={() => props.navigation.navigate('Report')}
              onPress={() => props.navigation.navigate("Priority")}
              style={{
                height: 55,
                backgroundColor: colors.GREEN,
                aspectRatio: 1 / 1,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
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
                name="trashcan"
                type="octicon"
                color={colors.WHITE}
                size={28}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Chat")}
              style={{
                height: 55,
                backgroundColor: colors.GREEN,
                aspectRatio: 1 / 1,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
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
  );
}
