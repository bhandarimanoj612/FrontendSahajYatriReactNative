//import liraries
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Booking from "./button/Booking";
import Trip from "./button/Trip";
import Info from "./button/Info";
import { AuthContext } from "../../Context/AuthContext";
var { width, height } = Dimensions.get("window");
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { BASE_URL, IMG_URL } from "../utils/config";
import axios from "axios";
import { Image } from "expo-image";
// create a component
const UserProfile = () => {
  const [viewMode, setViewMode] = React.useState("info");
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const { userInfo, userName } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null); // State to hold user image path for user profile
  const isFocused = useIsFocused(); //this is used for making the item auto refresh

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}ProfileImg/get/${userInfo.email}`
        );
        if (response.status === 200) {
          setUserImage(response.data.imageUrl);
        } else {
          console.error("Failed to fetch user image:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    if (isFocused) fetchUserImage();
  }, [isFocused]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    navigation.navigate("Favorite");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="  dark:bg-neutral-950 "
      contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}
    >
      <StatusBar style="light" />
      <View className="w-full dark:bg-neutral-950  flex-row  justify-between items-center mt-10">
        <View></View>
        <TouchableOpacity onPress={toggleFavorite} className="p-2 mr-4">
          <Icon name={"heart"} size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Person Details  */}
      <View>
        <View
          className="flex-row justify-center "
          style={{
            shadowColor: "black",
            shadowRadius: 3,
            shadowOffset: { width: 4, height: 7 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-44 w-44 ">
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetailsPage")}
            >
              <Image
                source={
                  userImage
                    ? { uri: `${IMG_URL}${userImage}` }
                    : require("../../../assets/images/welcome.png")
                }
                style={{ height: height * 0.21, width: width * 0.5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View></View>
        <View
          className="mt-10 bg-white rounded-full items-center dark:bg-neutral-950  ml-14 mr-14"
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 1,
          }}
        >
          <Text className="text-center text-xl  dark:text-white  font-light">
            {userName} {/* Manoj Bhandari */}
          </Text>
        </View>

        <View className="p-4">
          <View className="flex-row justify-between">
            {/* bookings */}
            <TouchableOpacity
              style={{
                backgroundColor: viewMode == "booking" ? "#CE2828" : "#2B3384",
              }}
              className="p-3 rounded-2xl"
              onPress={() => setViewMode("booking")}
            >
              <Text className="text-white p-2 font-bold ">Bookings</Text>
            </TouchableOpacity>

            {/* trips */}

            <TouchableOpacity
              onPress={() => setViewMode("trip")}
              style={{
                backgroundColor: viewMode == "trip" ? "#CE2828" : "#2B3384",
              }}
              className=" p-3 rounded-2xl  "
            >
              <Text className="text-white pr-4 pl-4 mt-2 font-bold">Trips</Text>
            </TouchableOpacity>

            {/* info */}

            <TouchableOpacity
              style={{
                backgroundColor: viewMode == "info" ? "#CE2828" : "#2B3384",
              }}
              onPress={() => setViewMode("info")}
              className=" p-3 rounded-2xl "
            >
              <Text className="text-white pr-4 pl-4 mt-2 font-bold">Info</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className=" dark:bg-neutral-950">
          {viewMode == "booking" && (
            <View className="dark:bg-neutral-950">{<Booking />}</View>
          )}
          {viewMode == "trip" && (
            <View className="dark:bg-neutral-950">{<Trip />}</View>
          )}
          {viewMode == "info" && (
            <View className="dark:bg-neutral-950">{<Info />}</View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default UserProfile;
