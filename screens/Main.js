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

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import * as Permissions from "expo-permissions";

import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';

import Filter1 from './Filter1'
import Filter2 from './Filter2'
import Filter3 from './Filter3'
import Filter4 from './Filter4'

const filters={
    "crown-pic1": {
    src: require("../assets/crown-pic2.png"),
    width: 3.5,
    height: 0.7,
    left: 0.46,
    right: 0.15,
    top: 1.5
    },
    "crown-pic2": {
    src: require("../assets/crown-pic3.png"),
    width: 3.5,
    height: 1.2,
    left: 0.46,
    right: 0.15,
    top: 0.7
    },
    "flower-pic1": {
    src: require("../assets/imageFilter1.png"),
    width: 3.5,
    height: 0.7,
    left: 0.46,
    right: 0.15,
    top: 1.5
    },
    "flower-pic2": {
    src: require("../assets/imageFilter2.png"),
    width: 3.5,
    height: 1.2,
    left: 0.46,
    right: 0.15,
    top: 0.7
    },
 }

let data = {
"crowns":
[
    {
        "id": "crown-pic1",
        "image": require('../assets/crown-pic2.png')
    },
    {
        "id": "crown-pic2",
        "image": require('../assets/crown-pic3.png')
    }
],
"flowers":[
    {
        "id": "flower-pic1",
        "image": require('../assets/flower-pic1.png')
    },
    {
        "id": "flower-pic2",
        "image": require('../assets/flower-pic2.png')
    }
]
}




export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            current_filter: "filter_1",
            selected:"crow-pic1"
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission({ status }) {
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces })
    }

    onFaceDetectionError(error) {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.titleText1}>FR</Text><Text style={styles.titleText2}>APP</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Text style={styles.subheading1}>Try Our</Text><Text style={styles.subheading2}> Cool Frames</Text>
                    </View>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                             mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map(face => {
                            <Filter
                            key={`face-id-${face.faceID}`}
                            face={face}
                            source={filters[this.state.current_filter].src}
                            width={filters[this.state.current_filter].width}
                            height={filters[this.state.current_filter].height}
                            left={filters[this.state.current_filter].left}
                            right={filters[this.state.current_filter].right}
                            top={filters[this.state.current_filter].top}
                            />
                            
                        })
                    }
                </View>
                <View style={styles.framesContainer}>
                <View style={styles.categoryContainer}>
                        <TouchableOpacity style={this.state.selected == "crowns" ? styles.categoryBoxSelected : styles.categoryBox} onPress={() => this.setState({ selected: `crowns` })}>
                            <Text>Crowns</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.selected == "flowers" ? styles.categoryBoxSelected : styles.categoryBox} onPress={() => this.setState({ selected: `flowers` })}>
                            <Text>Flowers</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <ScrollView style={{ flexDirection: "row", flex: 0.6 }} horizontal showsHorizontalScrollIndicator={false}>
                        {
                            data[this.state.selected].map(filter_data => {
                                return (
                                    <TouchableOpacity style={styles.filterImageContainer} onPress={() => this.setState({ current_filter: `filter_${filter_data.id}` })}>
                                        <Image source={filter_data.image} style={{ height: 32, width: 80 }} />
                                    </TouchableOpacity>

                
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#6278e4"
    },
    titleText1: {
        fontSize: RFValue(30),
        fontWeight: "bold",
        color: "#efb141",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    titleText2: {
        fontSize: RFValue(30),
        fontWeight: "bold",
        color: "white",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    subheading1: {
        fontSize: RFValue(20),
        color: "#efb141",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    subheading2: {
        fontSize: RFValue(20),
        color: "white",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    cameraStyle: {
        flex: 0.65
    },
    framesContainer: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: "#6278e4"
    },
    filterImageContainer: {
        height: RFPercentage(8),
        width: RFPercentage(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e4e7f8",
        borderRadius: 30,
        marginRight: 20
    },
    categoryContainer:{
      flex:0.4,
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
      marginBottom:RFValue(10)
    },
    categoryBox:{
      flex:0.2,
      borderRadius:30,
      borderWidth:1,
      backgroundColor:"orange",
      width:"150%",
      padding:RFValue(3),
      margin:1,
      alignItems:"center",
    },
    categoryBoxSelected:{
      flex:0.2,
      borderRadius:30,
      borderWidth:1,
      margin:1,
      alignItems:"center",
      padding:RFValue(3),
      width:"150%",
      backgroundColor:"purple"
    },
});