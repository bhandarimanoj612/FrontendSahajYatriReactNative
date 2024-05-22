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
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { AuthContext } from "../../../Context/AuthContext";
import { Image } from "expo-image";
const PopularScreen = () => {
  const [favoriteItems, setFavoriteItems] = useState([]); // State to hold favorite items
  const [popularHotels, setPopularHotels] = useState([]);
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchPopularHotels();
      fetchFavoriteHotels();
    }
  }, [isFocused]);

  // Function to fetch popular hotels
  const fetchPopularHotels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}Search/popular`);
      setPopularHotels(response.data);
    } catch (error) {
      console.error("Error fetching popular hotels: ", error);
    }
  };

  // Function to fetch user's favorite hotels
  const fetchFavoriteHotels = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}Favorite/user/${encodeURIComponent(userInfo.email)}`
      );
      setFavoriteItems(response.data);
    } catch (error) {
      console.error("Error fetching favorite hotels: ", error);
    }
  };

  // Function to check if an item is in favorite list
  const isInFavorites = (item) => {
    return favoriteItems.some((favorite) => favorite.name === item.name);
  };

  // Function to toggle favorite status
  const toggleFavourite = async (item) => {
    try {
      const isFavorite = isInFavorites(item);
      if (isFavorite) {
        // Remove from favorites
        await axios.delete(
          `${BASE_URL}Favorite/${encodeURIComponent(item.name)}/${encodeURIComponent(
            userInfo.email
          )}`
        );
      } else {
        // Add to favorites
        await axios.post(`${BASE_URL}Favorite`, {
          ...item,
          email: userInfo.email,
        });
      }
      fetchFavoriteHotels(); // Refetch favorite items after toggling
    } catch (error) {
      console.error("Error toggling favorite: ", error);
    }
  };

  // Assuming 'results' contains 'hotels', 'travel', and 'vehicles' keys
  const allResults = Object.values(popularHotels).flat(); // Combine all arrays into one
  console.log(allResults);

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
          onPress={() => navigation.navigate("BottomTab")}
          className="p-2 rounded-full  mr-4  "
        >
          <Text className="dark:text-white">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Favorite")}
          className="p-2 rounded-full  mr-6 "
        >
          <Text className="dark:text-white">Favorite</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.container} className=" bg-[#fff] dark:bg-neutral-900">
        <FlatList
          data={allResults || []} // Ensure popularHotels is not undefined
          keyExtractor={(item, index) => `${item.id}_${typeof item}_${index}`} //for making warnning remove
          renderItem={({ item }) => {
            const isFavourite = isInFavorites(item);
            return (
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
                  <TouchableOpacity
                    className="absolute top-0 left-1 p-3 rounded-full"
                    onPress={() => toggleFavourite(item)}
                  >
                    <HeartIcon
                      size={wp(5)}
                      color={isFavourite ? "red" : "white"}
                    />
                  </TouchableOpacity>
                  <View style={styles.hotelDetails}>
                    <Text style={styles.hotelName} className="dark:text-white">
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

export default PopularScreen;
