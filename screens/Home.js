import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';

import {RFValue } from "react-native-responsive-fontsize";

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {     
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.titleText1}>Look</Text><Text style={styles.titleText2}>me...</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.subHeading1}>Try Out</Text><Text style={styles.subHeading2}> Cool Frames</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={{ flex: 0.5 }}>
                        <Text style={styles.contentText}>Look Me is the best photo filter app for pic with the camera effects. With the stunning live photo filters directly on your face.</Text>
                    </View>
                    <View style={{ flexDirection: "row", flex: 0.25 }}>
                        <View style={{ flex: 0.5 }}>
                            <Image source={require('../assets/crown-pic2.png')} style={{ height: 64, width: 160 }} />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Image source={require('../assets/crown-pic3.png')} style={{ height: 64, width: 160 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", flex: 0.25 }}>
                        <View style={{ flex: 0.5 }}>
                            <Image source={require('../assets/flower-pic1.png')} style={{ height: 64, width: 160 }} />
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Image source={require('../assets/flower-pic2.png')} style={{ height: 64, width: 160 }} />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Main")}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Try Now!</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

    const styles=StyleSheet.create({
      container:{
        flex:1,
        backgroundColor:"skyblue",
      },
      droidSafeArea:{
        marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
      },
      headingContainer:{
        flex:0.2,
        alignItems:"center",
        justifyContent:"center",
      },
      titleText1:{
        fontSize:RFValue(30),
        fontWeight:"bold",
        color:"orange",
        fontStyle:"italic"
      },
      titleText2:{
        fontSize:RFValue(30),
        fontWeight:"bold",
        color:"orange",
        fontStyle:"italic"
      },
      subHeading1:{
        fontSize:RFValue(30),
        fontWeight:"bold",
        color:"red",
        fontStyle:"italic"
      },
      subHeading2:{
        fontSize:RFValue(30),
        fontWeight:"bold",
        color:"red",
        fontStyle:"italic"
      },
      contentContainer:{
        flex:0.6,
        margin:RFValue(5),
        backgroundColor:"white",
        height:"100%",
        padding:RFValue(20),
        borderRadius:RFValue(15)
      },
      buttonContainer:{
        flex:0.2,
        justifyContent:"center",
        alignItems:"center",
      },
      button:{
        backgroundColor:"yellow",
        paddingLeft:50,
        paddingRight:50,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:20
      },
      buttonText:{
        fontSize:25,
        fontStyle:"bold"
      }
    })
        
