import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";

const LoginModal = ({ visible, onPressLogin }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.79)",
        }}
      >
        <View
          style={{
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
            width: "80%", // Adjust the width of the modal
          }}
          className="bg-white dark:bg-neutral-700"
        >
          <Image
            source={require("./../../assets/images/Budget/2.jpeg")} // Add the path to your image
            style={{ width: 100, height: 100, marginBottom: 20 }}
            resizeMode="contain"
          />
          <Text
            style={{ fontSize: 18, marginBottom: 20 }}
            className="text-red-500 font-semibold"
          >
            Please login to continue.
          </Text>
          <TouchableOpacity
            onPress={onPressLogin}
            style={{
              backgroundColor: "#2B3384",
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: "red",
            }}
            className="font-semibold bg"
          >
            <Text style={{ fontSize: 20 }} className="text-white">
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginModal;
