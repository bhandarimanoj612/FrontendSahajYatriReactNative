//import liraries
import React, { Component, useState } from "react";
import { View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios"; //  axios for making HTTP requests
import { BASE_URL } from "../utils/config";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
// create a component
const SeachScreen = ({ setIsSearching }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const handleSearch = () => {
    //GET request to the backend API with search criteria
    axios
      .get(`${BASE_URL}Search?Name=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data);
        navigation.navigate("SearchResultScreen", { results: response.data });
      })
      .catch((error) => {
        console.error("Error searching hotels:", error);
      });
  };
  return (
    <View className="max-5 flex-row justify-between items-center  mt-16 mb-4">
      {/* text input view  */}
      <View className="mx-5 mb-4">
        <View
          onPress={handleSearch}
          style={styles.Shadow}
          className="bg-[#D9D9D9] flex-row items-center rounded-full p-4 space-x-2 pl-6"
        >
          {/* view for glass and search bar */}
          <TouchableOpacity>
            <Image source={require("../../../assets/images/search.png")} />
          </TouchableOpacity>
          <TextInput
            placeholder="Mustang"
            className=" text-base  w-56 tracking-wider"
            placeholderTextColor={"#89858E"}
            onPress={() => setIsSearching(true)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      <TouchableOpacity className="pr-2">
        <Image
          source={require("../../../assets/images/annapurna.png")}
          style={{
            height: wp(13),
            width: wp(13),
            borderRadius: wp(50),
            marginTop: wp(-4),
            paddingRight: wp(1),
            marginRight: wp(25),
            shadowOpacity: 10,
            shadowColor: "black",
            shadowOffset: { width: 3, height: 2 },
            shadowRadius: 8,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  // for adding inner shadow in text field
  Shadow: {
    borderColor: "#6E6C6C",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});

//make this component available to the app
export default SeachScreen;
