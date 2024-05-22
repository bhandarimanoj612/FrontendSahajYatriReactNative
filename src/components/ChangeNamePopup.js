import React, { useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../screens/utils/config";
import { AuthContext } from "../Context/AuthContext";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { showMessage } from "react-native-flash-message";

const ChangeNamePopup = ({ visible, onClose, currentUsername }) => {
  const { userName, setUserName } = useContext(AuthContext);
  const [newName, setNewName] = useState("");
  const navigation = useNavigation(); // Get navigation object

  const handleSubmit = async () => {
    if (!newName.trim()) {
      Alert.alert("Error", "Please enter a new username");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}Auth/change-username`, {
        currentUsername: currentUsername,
        newUsername: newName,
      });
      console.log("Server response:", response.data);

      navigation.navigate("LoginScreen"); // Navigate to login screen after username change

      onClose();

      if (Platform.OS === "android") {
        Alert.alert(`Something went wrong ${response.data}`);
      } else {
        showMessage({
          message: "Successfully changed username",
          description: `Login with new username to continue ${response.data}`,
          type: "sucess",
          backgroundColor: "green",
          color: "white",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error:", error.response.data);

      onClose();
      if (Platform.OS === "android") {
        Alert.alert(`Something went wrong ${response.data}`);
      } else {
        showMessage({
          message: "Error",
          description: `something went wrong ${response.data}`,
          type: "danger",
          backgroundColor: "red",
          color: "red",
          icon: "danger",
        });
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Change Name</Text>
          <View style={styles.currentUsernameContainer}>
            <Text style={styles.currentUsernameText}>
              Current Username: {currentUsername}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter new name"
            onChangeText={(text) => {
              setNewName(text);
            }}
          />
          <View style={styles.buttonsContainer}>
            <Button title="Cancel" onPress={onClose} color="#CB0A31" />
            <Button title="Save" onPress={handleSubmit} color="#2B3384" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333", // Dark gray
  },
  currentUsernameContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  currentUsernameText: {
    color: "#333", // Dark gray
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ChangeNamePopup;
