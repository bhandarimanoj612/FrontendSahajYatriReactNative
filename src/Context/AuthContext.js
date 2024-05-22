import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../screens/utils/config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null); // Added userImage state

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userInfoData = await AsyncStorage.getItem("userInfo");
        const userTokenData = await AsyncStorage.getItem("userToken");
        const userNameData = await AsyncStorage.getItem("userName");
        const userImageData = await AsyncStorage.getItem("userImageFilePath"); // Fetch user image

        if (userInfoData && userTokenData) {
          setUserInfo(JSON.parse(userInfoData));
          setUserToken(userTokenData);
          setUserName(userNameData);
          setUserImage(userImageData); // Set user image state
        }
      } catch (e) {
        console.error("Error retrieving authentication data: ", e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const login = async (userName, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}Auth/LoginCustomer`, {
        userName,
        password,
      });
      const userData = response.data;
      setUserName(userName);
      setUserInfo(userData);
      setUserToken(userData.token);
      await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
      await AsyncStorage.setItem("userToken", userData.token);
      await AsyncStorage.setItem("userName", userName);
    } catch (error) {
      // Alert.alert("Login Failed", error.response.data);
      if (Platform.OS === "android") {
        Alert.alert("Login Failed", `${error.response.data}`);
      } else {
        showMessage({
          message: "Login Failed",
          description: `${error.response.data}`,
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

  const logout = async () => {
    setIsLoading(true);
    try {
      setUserToken(null);
      setUserInfo(null);
      setUserName(null);
      setUserImage(null); // Set user image state to null
      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userImageFilePath");
    } catch (error) {
      console.error("Logout failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
        userInfo,
        userName,
        userImage, // Pass userImage state to context value
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
