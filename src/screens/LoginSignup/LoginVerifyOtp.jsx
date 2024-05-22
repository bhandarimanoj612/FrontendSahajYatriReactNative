import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { Image } from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { TextInput } from "react-native";
import { showMessage, hideMessage } from "react-native-flash-message";
const LoginVerifyOtp = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Auth/verify-email`, {
        email: email,
        verificationCode: otp,
      });

      if (response.status === 200) {
        if (Platform.OS === "android") {
          Alert.alert("Success", "OTP verified successfully");
        } else {
          showMessage({
            message: "Successuly Verified user ",
            description: "Otp Verified successfully",
            type: "success",
            backgroundColor: "green",
            color: "white",
            icon: "success",
          });
        }
        navigation.navigate("LoginScreen", {
          email: email,
          OTP: otp,
        });
      } else {
        if (Platform.OS === "android") {
          Alert.alert("Error", "OTP verified Failed");
        } else {
          showMessage({
            message: "Error Verified Failed ",
            description: "Otp Verified Failed ",
            type: "danger",
            backgroundColor: "red",
            color: "white",
            icon: "danger",
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);

      if (Platform.OS === "android") {
        Alert.alert(
          "Error",
          "An error occurred while verifying OTP. Please try again"
        );
      } else {
        showMessage({
          message: "Error Verified Failed ",
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
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        className="h-[150] w-[220] mt-8 mb-5"
        source={require("../../../assets/images/LoginBackground.png")}
      />

      <Text style={styles.title} className="mr-44">
        Email
      </Text>
      <TextInput
        className="pl-4 w-80 h-11 mb-5  bg-white  rounded-2xl"
        style={styles.Shadow}
        value={email}
        onChangeText={setEmail}
        placeholder="Please enter your email address"
      />
      <Text style={styles.title} className="mr-40">
        Enter OTP
      </Text>
      <OTPTextView
        containerStyle={styles.otpInput}
        handleTextChange={setOtp}
        inputCount={6}
        keyboardType="numeric"
        tintColor="#CB0A31"
        textInputStyle={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
      {/* For SinUp */}
      <View className="flex-row justify-center mt-10">
        <Text className="text-white">Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text className="text-red-500 font-bold ">Sign Up</Text>
          {/* <Text className="text-red-500 font-bold ">{Test}</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2B3384",
  },
  Shadow: {
    borderColor: "black",
    borderWidth: 2,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 2,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
  },
  otpInput: {
    width: "80%",
    height: 60,
    marginBottom: 20,
    marginRight: 30,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#CB0A31",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginVerifyOtp;
