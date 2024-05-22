import { StyleSheet, Text, Image, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../utils/config";
import { HeartIcon } from "react-native-heroicons/solid";
import { AuthContext } from "../../Context/AuthContext";

const styles = StyleSheet.create({
  Shadow: {
    borderColor: "#D8D5D5",
    borderWidth: 3,
    overflow: "visible",
    shadowColor: "#6E6C6C",
    shadowRadius: 9,
    shadowOpacity: 1,
  },
});

export default function TravelPlaces() {
  const [hotels, setHotels] = useState([]);
  const [favoriteIndexes, setFavoriteIndexes] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}TravelList`);
        const hotelData = response.data.result;
        setHotels(hotelData);

        // Fetch user's favorite hotels separately
        const favoritesResponse = await axios.get(
          `${BASE_URL}Favorite/user/${encodeURIComponent(userInfo.email)}`
        );
        const userFavorites = favoritesResponse.data;

        // Update favoriteIndexes based on user's favorite hotels
        const updatedIndexes = hotelData
          .map((hotel, idx) =>
            userFavorites.some((favorite) => favorite.name === hotel.name)
              ? idx
              : -1
          )
          .filter((idx) => idx !== -1);
        setFavoriteIndexes(updatedIndexes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isFocused) fetchHotels();
  }, [isFocused]);

  const toggleFavorite = async (index, item) => {
    try {
      const isFavorite = favoriteIndexes.includes(index);

      if (isFavorite) {
        // If the item is already a favorite, remove it
        await axios.delete(
          `${BASE_URL}Favorite/${encodeURIComponent(
            item.name
          )}/${encodeURIComponent(userInfo.email)}`
        );
        console.log(item.name, "delete success", userInfo.email);
      } else {
        // If the item is not a favorite, add it
        await axios.post(`${BASE_URL}Favorite`, {
          name: item.name,
          shortDescription: item.shortDescription,
          longDescription: item.longDescription,
          price: item.price,
          rating: item.rating,
          review: item.review,
          email: userInfo.email,
          phoneNumber: item.phoneNumber,
          image: item.image,
          location: item.location,
          category: item.category,
        });
        console.log(item.name, "added to favorites", userInfo.email);
      }

      // Fetch the updated favorites list after toggling
      const response = await axios.get(
        `${BASE_URL}Favorite/user/${encodeURIComponent(userInfo.email)}`
      );
      const updatedFavorites = response.data;

      // Update favoriteIndexes based on the updated favorites list
      const updatedIndexes = hotels
        .map((hotel, idx) =>
          updatedFavorites.some((favorite) => favorite.name === hotel.name)
            ? idx
            : -1
        )
        .filter((idx) => idx !== -1);
      setFavoriteIndexes(updatedIndexes);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Handle error (e.g., show error message)
    }
  };

  const navigateToBookings = (item) => {
    navigation.navigate("Bookings", { item });
  };

  const renderHotelItem = ({ item, index }) => {
    const isFavorite = favoriteIndexes.includes(index);
    return (
      <View>
        <View className="p-3">
          <TouchableOpacity
            styles={styles.Shadow}
            style={{ height: wp(50), width: wp(45) }}
            className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
            onPress={() => navigateToBookings(item)}
          >
            <Image
              source={{
                uri: `${IMG_URL}${item.image}`,
              }}
              className="absolute "
              style={{
                height: wp(50),
                width: wp(40),
                borderRadius: wp(5),
              }}
            />
            {/* For making color look visible */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={{
                width: wp(40),
                height: hp(22),
                borderBottomLeftRadius: 19,
                borderBottomRightRadius: 19,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
            <TouchableOpacity
              className="absolute top-0 left-1 p-3 rounded-full"
              onPress={() => toggleFavorite(index, item)}
            >
              <HeartIcon size={wp(5)} color={isFavorite ? "red" : "white"} />
            </TouchableOpacity>
            <Text
              style={{ fontSize: wp(4) }}
              className="text-white font-extrabold "
            >
              {item.name}
            </Text>
            <Text
              style={{ fontSize: wp(3) }}
              className="text-white font-light "
            >
              {item.shortDescription}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={hotels}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderHotelItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
