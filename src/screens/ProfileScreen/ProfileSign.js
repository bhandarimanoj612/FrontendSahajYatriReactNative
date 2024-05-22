import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { removeItem } from "../utils/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
export default function ProfileSign() {
  const navigation = useNavigation();
  const handleReset = async () => {
    await removeItem("onboarded");
    navigation.push("Onboarding");
  };
  const handleVerify = async () => {
    navigation.push("LoginVerifyOtp");
  };

  return (
    <View className="bg-[#2A3288] h-[850] w-full dark:bg-neutral-900 ">
      <StatusBar style="light" />
      <View className="flex-row justify-around w-full absolute dark:bg-neutral-900 ">
        <Image
          className="h-[600] w-[300] mt-10 marker: "
          source={require("../../../assets/images/profile.png")}
        />
      </View>

      <View className="m-10 top-96 dark:bg-neutral-900 ">
        <TouchableOpacity
          style={style.Shadow2}
          className="py-4  m-10 rounded-xl  bg-[#CB0A31]"
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text className="text-white font-bold text-center ">Sign in</Text>
        </TouchableOpacity>
        {/* for sign up */}
        <View className="flex-row justify-center">
          <Text className="text-white">Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text className="text-red-500 font-bold ">Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-3">
          <Text className="text-white">Show me Onboarding</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text className="text-red-500 font-bold   ">Reset </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-3">
          <Text className="text-white">Haven't verify email ?</Text>
          <TouchableOpacity onPress={handleVerify}>
            <Text className="text-red-500 font-bold   ">Verify Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Shadow2: {
    borderColor: "black",
    borderWidth: 1,
    shadowColor: "#7B061E",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});
