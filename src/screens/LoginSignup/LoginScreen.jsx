import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../Context/AuthContext";
import { Image } from "expo-image";
import { showMessage, hideMessage } from "react-native-flash-message";

const iconSize = Platform.OS === "android" ? 43 : 35; //for password eye size for differenct screen
const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    navigation.push("LoginVerifyOtp");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await login(userName, password);
      // navigation.goBack();
      console.log(userName, password);
      navigation.navigate("BottomTab");
      if (Platform.OS === "android") {
        console.log("welcome to android ");
      } else {
        showMessage({
          message: "Sucess ",
          description: `Welcome to Sahaj Yatri`,
          type: "sucess",
          backgroundColor: "green",
          color: "white",
          icon: "sucess",
        });
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again later."; // Default error message
      if (error.response && error.response.status === 400) {
        errorMessage = "Invalid userName or password. Please try again."; // Custom error message for 400 status
      }
      // Alert.alert("Login Failed", errorMessage);
      if (Platform.OS === "android") {
        Alert.alert("Login Failed ", `${errorMessage}`);
      } else {
        showMessage({
          message: "Invalid Username or Password",
          description: `Login Failed.${errorMessage}`,
          type: "info",
          backgroundColor: "red",
          color: "white",
          icon: "danger",
        });
      }
    } finally {
      setIsLoading(false);
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
      {/* Input and Title */}

      <View className="h-full w-full flex justify-around pt-40 pb-10">
        {/* Title */}

        <View className="form  p-10 space-y-2">
          <Text className="text-white font-light text-xl">UserName</Text>

          <TextInput
            className="p-4 bg-white  rounded-2xl"
            style={style.Shadow}
            value={userName}
            onChangeText={(text) => setuserName(text)}
            placeholder="UserName "
          />

          <Text className="text-white font-light text-xl">Password</Text>
          <View>
            <TextInput
              className="p-4 bg-white  rounded-2xl"
              style={style.Shadow}
              // Set secureTextEntry prop to hide
              //password when showPassword is false
              secureTextEntry={!showPassword}
              placeholder="Enter Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            {password !== "" && (
              <MaterialCommunityIcons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={iconSize}
                color="black"
                onPress={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: 20,
                  marginTop: 7,
                }}
              />
            )}
          </View>
          {/* forget button */}

          <TouchableOpacity
            className="flex items-end mb-5 mr-5"
            onPress={() => navigation.navigate("ForgetPassword")}
          >
            <Text className="text-white font-light">Forget Password</Text>
          </TouchableOpacity>

          {/* sign in button */}

          <TouchableOpacity
            style={style.Shadow2}
            className="py-4 m-4 rounded-xl bg-[#CB0A31]"
            onPress={handleSignIn}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-bold text-center">Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-white text-center "> Or</Text>

        {/* <View className="flex flex-row  justify-center items-center">
          <TouchableOpacity className="p-5">
            <Image source={require("../../../assets/images/google.png")} />
          </TouchableOpacity>

          <TouchableOpacity className="p-5">
            <Image source={require("../../../assets/images/facebook.png")} />
          </TouchableOpacity>
        </View> */}
        {/* For SinUp */}
        <View className="flex-row justify-center">
          <Text className="text-white">Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text className="text-red-500 font-bold ">Sign Up</Text>
            {/* <Text className="text-red-500 font-bold ">{Test}</Text> */}
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
};

const style = StyleSheet.create({
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
  icon: {
    position: "absolute",
    right: 60,
    top: 188,
    fontSize: 30,
  },
});
export default LoginScreen;
