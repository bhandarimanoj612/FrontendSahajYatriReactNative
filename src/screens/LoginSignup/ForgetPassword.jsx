import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { Image } from "expo-image";
const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Auth/forgot-password`, {
        email: email,
      });
      // Handle success response
      console.log(response.data); // You may want to navigate to a success screen or show a confirmation message
      navigation.navigate("OtpCode", {
        email: email,
      });
    } catch (error) {
      // Handle error response
      console.error("Error:", error.response.data);
      Alert.alert(
        "Forgot Password Failed",
        "An error occurred. Please try again later."
      );
    }
  };

  return (
    <View className="bg-[#2B3384] h-full w-full">
      {/* making status white  */}
      <StatusBar style="light" />

      <View className="flex-row justify-around w-full absolute">
        <Image
          className="h-[150] w-[220] mt-10"
          source={require("../../../assets/images/LoginBackground.png")}
        />
      </View>
      <View style={styles.container}>
        <Text className="text-white font-light text-xl pb-6">Enter Email</Text>

        <TextInput
          style={styles.Shadow}
          className="p-4 bg-white  rounded-2xl"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
        />
        <TouchableOpacity
          style={styles.Shadow2}
          className="py-4  rounded-xl bg-[#CB0A31] mt-9"
          onPress={handleForgotPassword}
        >
          <Text className="text-white font-bold text-center ">
            Forget Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    margin: 25,
  },
  Shadow: {
    borderColor: "black",
    borderWidth: 2,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 2,
  },
  Shadow2: {
    borderColor: "red",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "#7B061E",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: "80%",
    backgroundColor: "#CB0A31",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
