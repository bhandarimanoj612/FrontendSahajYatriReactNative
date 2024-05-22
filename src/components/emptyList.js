//import liraries
import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
var { width, height } = Dimensions.get("window");
// create a component
const EmptyList = () => {
  return (
    <View className="flex justify-content items-center my-9 mr-10">
      <Image
        source={require("../../assets/images/NoData/noList.png")}
        style={{
          height: height * 0.22,
          width: width * 0.72,
          borderRadius: 60,
        }}
      />
      <Text className="font-medium m-6 text-red-400">
        No Trip has been added{" "}
      </Text>
    </View>
  );
};

// define your styles

//make this component available to the app
export default EmptyList;
