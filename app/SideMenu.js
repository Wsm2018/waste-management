import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import SideMenuHeader from './SideMenuHeader';
import { colors } from './common/theme';
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import db from "../db"

var { width, height } = Dimensions.get('window');


{/* <Button title="Logout" onPress={() => firebase.auth().signOut()} /> */}

export default function SideMenu(props) {

    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        // console.log("FETCH USR - ", firebase.auth().currentUser.uid)
        var docRef = await db.collection("Users").doc(firebase.auth().currentUser.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.id);
                setUser({id: doc.id, ...doc.data()})
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      };
    

    useEffect(() => {
        // console.log("-----")
        fetchUser()
    }, []);

    const sideMenuListManager = [
        { name: 'Home', navigationName: 'Home', icon: 'home', type: 'ant-design' },
        // { name: 'Details', navigationName: 'Details', icon: 'home', type: 'font-awesome' },
        { name: 'Schedule', navigationName: 'ScheduleManagement', icon: 'car-sports', type: 'material-community' },
        { name: 'Report', navigationName: 'ReportUser', icon: 'report', type: 'material' },
        { name: 'Logout', icon: 'logout', type: 'material' },
    ];

    const sideMenuListWorker = [
        { name: 'Home', navigationName: 'Home', icon: 'home', type: 'ant-design' },
        // { name: 'Details', navigationName: 'Details', icon: 'home', type: 'font-awesome' },
        // { name: 'Schedule', navigationName: 'ScheduleManagement', icon: 'car-sports', type: 'material-community' },
        // { name: 'Report', navigationName: 'ReportUser', icon: 'report', type: 'material' },
        { name: 'Logout', icon: 'logout', type: 'material' },
    ];

    const sideMenuListUser = [
        { name: 'Home', navigationName: 'Home', icon: 'home', type: 'ant-design' },
        // { name: 'Details', navigationName: 'Details', icon: 'home', type: 'font-awesome' },
        // { name: 'Schedule', navigationName: 'ScheduleManagement', icon: 'car-sports', type: 'material-community' },
        { name: 'Report', navigationName: 'ReportUser', icon: 'report', type: 'material' },
        { name: 'Logout', icon: 'logout', type: 'material' },
    ];


    //navigation to screens from side menu
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        props.navigation.dispatch(navigateAction);
    }

    return (
        <View style={styles.mainViewStyle}>
            
            <SideMenuHeader headerStyle={styles.myHeader} user={user&&user}></SideMenuHeader>
            <View style={styles.compViewStyle}>
                {/* <View style={[styles.vertialLine, { height: (width <= 320) ? width / 1.53 : width / 1.68 }]}></View> */}
                
                    <FlatList
                        data={user && user.role && user.role === "Manager"? sideMenuListManager : user && user.role && user.role === "Worker"? sideMenuListWorker : sideMenuListUser}
                        keyExtractor={(item, index) => index.toString()}
                        
                        bounces={false}
                        renderItem={({ item, index }) => {
                            
                                return (
                                    item.name === "Logout" ? 
                                    <TouchableOpacity
                                        onPress={
                                            ()=> firebase.auth().signOut()
                                        }
                                        
                                        // style={
                                        //     [styles.menuItemView, { marginTop: (index == sideMenuList.length - 1) ? width / 10 : 0 }]
                                        // }
                                        style={[styles.menuItemView]}
                                    >
                                        <View style={styles.viewIcon}>
                                            <Icon
                                                name={item.icon}
                                                type={item.type}
                                                color={colors.WHITE}
                                                size={18}
                                                containerStyle={styles.iconStyle}
                                            />
                                        </View>
                                        <Text style={styles.menuName}>{item.name}</Text>
                                    </TouchableOpacity> 
                                    :
                                    <TouchableOpacity
                                        onPress={
                                            navigateToScreen(item.navigationName)
                                        }
                                        
                                        // style={
                                        //     [styles.menuItemView, { marginTop: (index == sideMenuList.length - 1) ? width / 10 : 0 }]
                                        // }
                                        style={[styles.menuItemView]}
                                    >
                                        <View style={styles.viewIcon}>
                                            <Icon
                                                name={item.icon}
                                                type={item.type}
                                                color={colors.WHITE}
                                                size={18}
                                                containerStyle={styles.iconStyle}
                                            />
                                        </View>
                                        <Text style={styles.menuName}>{item.name}</Text>
                                    </TouchableOpacity> 
                                )
                            }
                        
                        } />
                    
            </View>
            <View style={{flex:1,justifyContent:'space-around',alignItems:'center'}}>
            
            
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    myHeader: {
        marginTop: 0,
    },
    vertialLine: {
        width: 1,
        backgroundColor: colors.DARKGRAY,
        position: 'absolute',
        left: 22,
        top: 24
    },
    menuItemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop:height/70,
        paddingBottom:height/70,
        borderBottomColor: colors.WHITE,
        borderBottomWidth: 0.2,
        marginLeft:height/50,
        marginRight:height/50,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        minHeight:70
        // backgroundColor:"red"
    },
    viewIcon: {
        width: 28,
        // height: 24,
        aspectRatio: 1 / 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREEN,
        borderColor:colors.WHITE,
        borderWidth:1,
        left: 1
    },
    menuName: {
        color: colors.WHITE,
        // fontWeight: 'bold',
        marginLeft: 8,
        width: "100%",
        
    },
    mainViewStyle: {
        backgroundColor: colors.GREEN,
        height: '100%',
        // height: height,
        //justifyContent:'space-between'
    },
    compViewStyle: {
        position: 'relative',
        
        // flex: 10,
        // height: height-180-80,
        // backgroundColor:"blue"
    },
    iconStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },

})