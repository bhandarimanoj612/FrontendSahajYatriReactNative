//import liraries
import React from "react";
import { TextInput } from "react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
// create a component
const Search = ({ placeholder }) => {
  return (
    <View>
      <View className="max-5 flex-row justify-between items-center mt-16 ">
        {/* text input view  */}
        <View className="mx-5 mb-4">
          <View
            style={styles.Shadow}
            className="bg-[#D9D9D9] flex-row items-center rounded-full p-3 space-x-2 pl-6"
          >
            {/* view for glass and search bar */}
            <TouchableOpacity>
              <Image source={require("../../assets/images/search.png")} />
            </TouchableOpacity>
            <TextInput
              placeholder={placeholder}
              className=" text-base  w-56 tracking-wider"
              placeholderTextColor={"#89858E"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
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
});

//make this component available to the app
export default Search;
