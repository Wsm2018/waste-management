import React, { useEffect, useState } from 'react';
import { Text, View, Image,TouchableOpacity, Platform, StatusBar,Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from './common/theme';

//make a compontent
var { height, width } = Dimensions.get('window');



const SideMenuHeader = ({headerStyle, user}) =>{
   return (
        <View style={[styles.viewStyle,headerStyle]}>
            {/* {console.log("FIREBASE", firebase.auth().currentUser.uid)} */}
           <View style={{backgroundColor:colors.WHITE, borderRadius:100}}>
           <Image
                style={{
                aspectRatio:1/1,
                height:height/6,
                // width:400,
                // alignSelf:"center"
                
                }}
                source={require('../assets/user-icon.png')}
            />  
           </View>
            <View style={styles.headerTextStyle}>
                <Text style={{color:colors.WHITE, fontWeight:"bold", fontSize:18}}>{user? user.firstName : "loading.."}</Text>
                <Text style={{color:colors.WHITE}}>{user? user.role : "loading.."}</Text>
            </View>
        </View>
   );
 
};

const styles = {
    viewStyle:{
        // backgroundColor:colors.YELLOW,
        // backgroundColor:"red",
        justifyContent:'center',
        alignItems:'center',
        // height:height/4,
        paddingTop:Platform.OS=='ios'?20:StatusBar.currentHeight,
        borderBottomColor: colors.WHITE,
        borderBottomWidth: 0.2,
        position:'relative',
        flexDirection:'column',
        marginLeft:height/50,
        marginRight:height/50,
        // width:width/4,
        height:height/2.5,
    },
    textStyle:{
        fontSize:20,
        color:colors.WHITE
    },
    headerTextStyle:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 10,
        
        // width:height/0.5
    },
    iconStyle:{
       
    },
    userImageView: {
        width: height/9,
        height: height/9,
        borderRadius: 50,
        overflow: 'hidden',
        
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        // backgroundColor:"red"
    },
    ProfileNameStyle:{
        fontWeight: 'bold', 
        color: colors.WHITE,
        fontSize: 15
    },
    iconViewStyle:{
        width:150,
        justifyContent: 'center', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 4
    },
    emailStyle:{
        color: colors.WHITE, 
        fontSize: 13,
        marginLeft: 4,
        textAlign:'center'
    },
    imageStyle:{
        width: 100, 
        height:100
        // height:"100%",
        // width:"100%",
        // aspectRatio:1/1
    }
}
//make the component available to other parts of the app
export default SideMenuHeader;