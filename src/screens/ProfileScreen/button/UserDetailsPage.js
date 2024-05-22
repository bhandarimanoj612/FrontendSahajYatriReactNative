import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import ChangeNamePopup from "../../../components/ChangeNamePopup";
import { BASE_URL, IMG_URL } from "../../utils/config";
import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import { showMessage, hideMessage } from "react-native-flash-message";
const UserDetailsPage = ({ navigation }) => {
  const [imageFromBackend, setImageFromBackend] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [isChangeNameModalVisible, setIsChangeNameModalVisible] =
    useState(false);

  const isFocused = useIsFocused();
  const { userName, setUserName } = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) fetchImageFromBackend();
  }, [isFocused]);

  const fetchImageFromBackend = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}ProfileImg/get/${userInfo.email}`
      );

      if (response.status === 200) {
        setImageFromBackend(response.data.imageUrl);
      } else {
        console.error("Failed to fetch image from backend:", response.status);
      }
    } catch (error) {
      console.error("Error fetching image from backend:", error);
    }
  };

  const updateUserDetails = async () => {
    try {
      // Upload the image if one is selected
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post(
          `${BASE_URL}ProfileImg/upload/${userInfo.email}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Image uploaded successfully:", response.data.imageUrl);

          setImageFromBackend(response.data.imageUrl); // Update the imageFromBackend state with the new image URL
        } else {
          console.error("Image upload failed:", response.status);
        }
      }

      // Optionally, you can make another request to update other user details

      console.log("User details updated successfully!");
      if (Platform.OS === "android") {
        Alert.alert("Sucess", "User details updated successfully!");
      } else {
        showMessage({
          message: "Sucess",
          description: "User details updated successfully!",
          type: "Success",
          backgroundColor: "green",
          color: "white",
          icon: "Success",
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Camera permission is required to take a photo.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // Allow user to choose between camera and gallery
      // By setting the base64 property to true, you can also receive the image as a base64-encoded string.
    });

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        type: "image/jpeg", // Replace with the actual image type
        name: "profile-image.jpg", // Replace with the actual image name
      });
    }
  };

  const deletePickedImage = () => {
    setImage(null);
  };
  const deleteImage = async () => {
    try {
      // Send a DELETE request to the backend to soft-delete the image
      const response = await axios.delete(
        `${BASE_URL}ProfileImg/soft-delete/${userInfo.email}`
      );

      if (response.status === 200) {
        console.log("Profile image soft-deleted successfully");
        setImageFromBackend(null); // Clear the imageFromBackend state
        if (Platform.OS === "android") {
          Alert.alert("Sucess", "User Profile Deleted successfully!");
        } else {
          showMessage({
            message: "Sucess",
            description: "User Profile Deleted successfully!",
            type: "Success",
            backgroundColor: "green",
            color: "white",
            icon: "Success",
          });
        }
      } else {
        console.error("Failed to soft-delete profile image:", response.status);
      }
    } catch (error) {
      console.error("Error soft-deleting profile image:", error);
    }
  };
  const handleNameChange = () => {
    setIsChangeNameModalVisible(true);
  };

  const handleSaveName = (newName) => {
    setUserName(newName); // Update username state
    setIsChangeNameModalVisible(false); // Close the ChangeNamePopup
  };

  return (
    <View style={styles.container} className="bg-[#fff] dark:bg-neutral-900">
      <SafeAreaView>
        <TouchableOpacity
          className="text-[#333] dark:text-white"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon
            size={20}
            strokeWidth={4}
            color="#333"
            className="text-[#333] dark:text-white"
          />
          <Text
            style={styles.backButtonText}
            className="text-[#333] dark:text-neutral-300"
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading} className="text-[#333] dark:text-white">
          User Details
        </Text>
        <View
          style={styles.infoContainer}
          className="bg-[#f5f5f5] dark:bg-neutral-900"
        >
          <View style={styles.field}>
            <Text style={styles.label} className="text-[#333] dark:text-white">
              Name
            </Text>
            <TouchableOpacity onPress={handleNameChange}>
              <View className="bg-neutral-300 p-1 rounded-md">
                <Text className="text-black">{userName}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.field}>
            <Text style={styles.label} className="text-[#333] dark:text-white">
              Email
            </Text>
            <TextInput
              className="text-[#333] p-1 bg-neutral-300"
              style={[styles.input]}
              value={userInfo.email}
              editable={false}
            />
          </View>
          <View>
            <View className="flex-row justify-between">
              <View>
                <Text className="text-[#333] dark:text-white">
                  Pick an image
                </Text>
              </View>
              <View className="flex-row ml-11">
                <TouchableOpacity onPress={pickImage}>
                  <Icon name="file-image-plus-outline" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            {imageFromBackend && (
              <View>
                <Image
                  source={{ uri: `${IMG_URL}${imageFromBackend}` }}
                  style={{ width: 200, height: 200 }}
                  className="rounded-full"
                />
                <TouchableOpacity
                  onPress={deleteImage}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>Delete Image</Text>
                </TouchableOpacity>
              </View>
            )}
            {image && (
              <View>
                <Image
                  source={{ uri: image.uri }}
                  style={{ width: 100, height: 100 }}
                  className="rounded-full ml-10 mt-2"
                />
                <TouchableOpacity
                  onPress={deletePickedImage}
                  className="rounded-full  mt-2 bg-red-500 p-2 items-center"
                >
                  <Text style={styles.deleteButtonText}>Delete Image</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={updateUserDetails} style={styles.button}>
            <Icon name="content-save" size={24} color="white" />
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <ChangeNamePopup
        visible={isChangeNameModalVisible}
        onClose={() => setIsChangeNameModalVisible(false)}
        currentUsername={userName}
        onSave={handleSaveName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 20,
    marginRight: 60,
    alignItems: "center",
  },
  backButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    paddingRight: 70,
    paddingLeft: 70,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 3,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#CB0A31",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserDetailsPage;
