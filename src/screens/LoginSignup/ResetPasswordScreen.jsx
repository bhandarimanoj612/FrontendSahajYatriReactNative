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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { showMessage, hideMessage } from "react-native-flash-message";

const ResetPasswordScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { email, OTP } = route.params;
  const [showPassword, setShowPassword] = useState(false);
  console.log(email, OTP);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleResetPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Auth/reset-password`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        otp: OTP,
      });
      // Handle success response
      console.log(response.data); // You may want to navigate to a success screen or show a confirmation message
      navigation.navigate("LoginScreen"); // Example: Navigate back to login screen
    } catch (error) {
      // Handle error response
      console.error("Error:", error.response.data);

      if (Platform.OS === "android") {
        Alert.alert(
          "Reset Password Failed",
          "An error occurred. Please try again later."
        );
      } else {
        showMessage({
          message: "Reset Password Failed",
          description:
            "An error occurred while verifying OTP. Please try again ",
          type: "danger",
          backgroundColor: "red",
          color: "white",
          icon: "danger",
        });
      }
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
        <View>
          <Text className="text-white font-light text-xl pb-6">
            New Password
          </Text>

          <TextInput
            style={styles.Shadow}
            className="p-4 bg-white  rounded-2xl"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your new password "
            secureTextEntry={!showPassword}
          />
        </View>
        <View>
          <Text className="text-white font-light text-xl pb-6 mt-5">
            Confirm Password
          </Text>

          <TextInput
            style={styles.Shadow}
            className="p-4 bg-white  rounded-2xl"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your new password"
            secureTextEntry={!showPassword}
          />

          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={40}
            color="white"
            onPress={toggleShowPassword}
            style={{ position: "absolute", top: 15, right: 10 }}
          />
        </View>
        <TouchableOpacity
          style={styles.Shadow2}
          className="py-4  rounded-xl bg-[#CB0A31] mt-9"
          onPress={handleResetPassword}
        >
          <Text className="text-white font-bold text-center ">
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 30,
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

export default ResetPasswordScreen;
