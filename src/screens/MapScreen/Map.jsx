import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text, Platform } from "react-native";
import Search from "../../components/Search";
import { useContext } from "react";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"; //this is used for adding google map direction api
// import { Api_Key } from "./Api";
// import { GOOGLE_API_KEY } from "./environments";
import Constants from "expo-constants";
import { useColorScheme } from "nativewind";
// import GlobalApi from "../../Services/GlobalApi";s
export default function Map() {
  const [mapRegion, setmapRegion] = useState();
  const { colorScheme } = useColorScheme(); //getting the color scheme from the native wind
  const { location, setSelectedLocation } = useContext(UserLocationContext);
  useEffect(() => {
    if (location) {
      setmapRegion;
      ({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, []);

  const darkMapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#263238", // Darker shade of gray for map geometry
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ffffff", // White color for text labels
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#000000", // Black outline for text labels
          weight: 2, // Increased thickness for better visibility
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#37474F", // Darker shade for roads
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ffffff", // White color for road labels
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#000000", // Black outline for road labels
          weight: 2, // Increased thickness for better visibility
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ffffff", // White color for points of interest labels
        },
      ],
    },
    // More styles...
  ];

  return (
    // <View style={styles.container}>
    <View>
      <MapView
        customMapStyle={colorScheme === "dark" ? darkMapStyle : []}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsTraffic={true}
        showsBuildings={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        style={styles.map}
        initialRegion={mapRegion}
        mapPadding={{ top: 0, right: 0, left: 0, bottom: 230 }} //customizing my show my map button
        provider={PROVIDER_GOOGLE}
      />
      {/* <View style={styles.searchContainer1}>
        <Search placeholder="Enter Your Start Destination" />
      </View> */}

      {/* <View style={styles.searchContainer}>
        <Search placeholder="Enter Your End Destination" />
        
      </View> */}
      {/* <View style={styles.Direction}>
        <TouchableOpacity
          className="bg-[#D9D9D9] p-3 ml-36 rounded-2xl"
          style={styles.Shadow}
        >
          <Text className="text-black font-bold ">Direction</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search "
          styles={{ textInput: styles.input }}
          // className=" dark:bg-neutral-800 text-Input-red "
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          query={{
            key: "AIzaSyBTTmffWdrtR0QlnOEicA6zb_lsGe8WZWY",
            language: "en",
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Shadow: {
    borderColor: "#D8D5D5",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 1,
    overflow: "visible",
    shadowOffset: { width: 1, height: 6 },
  },
  input: {
    // borderColor: "blue",
    // borderWidth: 1,
  },
  map: {
    padding: 5,
    width: "100%",
    height: "100%",
  },
  // searchContainer1: {
  //   position: "absolute",
  //   right: 32,
  //   top: 35, // Adjust as needed
  //   // Adjust as needed
  //   flexDirection: "row",
  //   alignItems: "center",
  //   elevation: 4,
  // },
  // searchContainer2: {
  //   position: "absolute",
  //   right: 32,
  //   top: 120, // Adjust as needed
  //   // Adjust as needed
  //   flexDirection: "row",
  //   alignItems: "center",
  //   elevation: 4,
  // },
  searchContainer: {
    position: "absolute",
    marginLeft: 13,
    marginTop: 15,
    width: "90%",
    // backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
    borderColor: "#D8D5D5",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 1,
    overflow: "visible",
    shadowOffset: { width: 1, height: 6 },
  },
  Direction: {
    position: "absolute",
    alignItems: "center",
    top: 280, // Adjust as needed
    // Adjust as needed
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
});
