import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  TextInput, // Import TextInput component
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { Image } from "react-native";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const LoginVerifyOtp = ({ navigation }) => {
  const [email, setEmail] = useState(""); // State for storing email
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Auth/verify-otp`, {
        email: email, // Use entered email
        otp: otp,
      });

      if (response.data.message === "OTP verified successfully") {
        navigation.navigate(response.data.redirectTo, {
          email: email, // Pass email to the next screen
          OTP: otp,
        });
      } else {
        Alert.alert("OTP Verification Failed", "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert(
        "OTP Verification Failed",
        "An error occurred while verifying OTP."
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        className="h-[150] w-[220] mt-32 mb-11"
        source={require("../../../assets/images/LoginBackground.png")}
      />
      <Text style={styles.title}>Enter Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        placeholderTextColor="#fff"
      />
      <Text style={styles.title}>Enter OTP</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2B3384",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "#fff",
  },
  input: {
    width: "80%",
    height: 40,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#fff",
  },
  otpInput: {
    width: "80%",
    height: 60,
    marginBottom: 20,
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
