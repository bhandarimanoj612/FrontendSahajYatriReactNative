import { StyleSheet, View, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
// Update with the correct path
import { useIsFocused } from "@react-navigation/native"; // Import useIsFocused
import Friends from "./Private Message/Friends";
import LoginModal from "../../components/LoginModal";
import { AuthContext } from "../../Context/AuthContext";

export default function ChatHome({ navigation }) {
  const { userInfo } = useContext(AuthContext); // Access userInfo from AuthContext
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility
  const isFocused = useIsFocused(); // Track screen focus

  useEffect(() => {
    if (isFocused && (!userInfo || !userInfo.email)) {
      setShowLoginModal(true); // Show login modal if user is not logged in or email is empty when the screen is focused
    }
  }, [isFocused, userInfo]);

  return (
    <SafeAreaView className="bg-gray-100 h-full w-full dark:bg-neutral-900">
      {/* Render login modal if showLoginModal is true */}
      {showLoginModal && (
        <LoginModal
          visible={showLoginModal}
          onPressLogin={() => {
            setShowLoginModal(false); // Close login modal
            navigation.navigate("LoginScreen"); // Navigate to login screen
          }}
        />
      )}
      <View className="rounded-2xl ml-5">
        {/* <Text className=" text-xl pl-4 mt-10 text-[#CB0A31]"> Friends</Text> */}
      </View>
      <View className="">
        <Friends />
      </View>
    </SafeAreaView>
  );
}
