//import liraries
import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";
var { width, height } = Dimensions.get("window");
// create a component
const EmptyChart = () => {
  return (
    <View className="flex justify-content items-center my-6 ">
      <Image
        source={require("../../assets/images/NoData/noChart.png")}
        // className="w-44 h-32 "
        style={{ height: height * 0.32, width: width * 0.72 }}
      />
      <Text className="font-bold text-xl m-7 text-red-400">No Chart Data </Text>
    </View>
  );
};

// define your styles

//make this component available to the app
export default EmptyChart;
