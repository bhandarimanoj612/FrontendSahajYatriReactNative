import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../utils/config";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { AuthContext } from "../../../Context/AuthContext";
import { Swipeable } from "react-native-gesture-handler";
import { Image } from "expo-image";
const Favourite = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [popularHotels, setPopularHotels] = useState([]);

  useEffect(() => {
    fetchPopularHotels();
  }, []);

  const fetchPopularHotels = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}Favorite/user/${userInfo.email}`
      );
      setPopularHotels(response.data);
    } catch (error) {
      console.error("Error fetching popular hotels: ", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`${BASE_URL}Favorite/${id}`);
      setPopularHotels(popularHotels.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error("Error deleting favorite: ", error);
    }
  };

  // Assuming 'results' contains 'hotels', 'travel', and 'vehicles' keys
  const allResults = Object.values(popularHotels).flat(); // Combine all arrays into one

  return (
    <View className="dark:bg-neutral-900">
      <StatusBar style={"black"} />
      <SafeAreaView
        style={styles.Shadow}
        className={
          "bg-white dark:bg-neutral-800 flex-row justify-between items-center w-full mt-10 absolute rounded-2xl  "
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" bg-white p-2 rounded-full ml-3 dark:bg-neutral-500 "
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("RecommendScreen")}
          className="p-2 rounded-full  mr-4  "
        >
          <Text className="dark:text-white">RecommendScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PopularScreen")}
          className="p-2 rounded-full  mr-6 "
        >
          <Text className="dark:text-white">PopularScreen</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.container} className=" bg-[#fff] dark:bg-neutral-900">
        <FlatList
          data={allResults}
          keyExtractor={(item, index) => `${item.id}_${typeof item}_${index}`} //for making warnning remove
          renderItem={({ item }) => {
            return (
              <Swipeable
                renderRightActions={() => (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteFavorite(item.id)}
                  >
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                )}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Bookings", { item })}
                >
                  <View
                    style={styles.hotelContainer}
                    className="dark:bg-neutral-800"
                  >
                    <Image
                      source={{
                        uri: `${IMG_URL}${item.image}`,
                      }}
                      style={styles.hotelImage}
                    />

                    <View style={styles.hotelDetails}>
                      <Text
                        style={styles.hotelName}
                        className="dark:text-white"
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={styles.hotelDescription}
                        className="color-[#555] dark:text-white  "
                      >
                        {item.shortDescription}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Shadow: {
    borderColor: "white",
    borderWidth: 2,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
    overflow: "visible",
    shadowOffset: { width: 3, height: 2 },
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  container: {
    marginTop: 110,
  },
  hotelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  hotelImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  hotelDetails: {
    flex: 1,
  },
  hotelName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  hotelDescription: {
    fontSize: 14,
  },
});

export default Favourite;
