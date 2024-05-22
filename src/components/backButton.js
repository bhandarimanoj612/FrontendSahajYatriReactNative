//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// create a component
const BackButton = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className={"flex-row justify-between items-center w-full absolute "}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="p-2 rounded-full "
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default BackButton;
