import React, { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import EmptySearch from "../../components/emptySearch";
import { BASE_URL, IMG_URL } from "../utils/config";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";
import { HeartIcon } from "react-native-heroicons/solid";
import axios from "axios";
import { Image } from "expo-image";

const SearchResultScreen = ({ results, setIsSearching }) => {
  const [favoriteItems, setFavoriteItems] = useState([]); // State to hold favorite items
  const navigation = useNavigation();

  const { userInfo } = useContext(AuthContext);
  // Assuming 'results' contains 'hotels', 'travel', and 'vehicles' keys
  const allResults = Object.values(results).flat(); // Combine all arrays into one
  console.log(allResults);
  // Render the empty state component if allResults is empty
  if (allResults.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <TouchableOpacity onPress={() => setIsSearching(false)}>
          <EmptySearch />
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    fetchFavoriteHotels();
  }, []);

  // Function to fetch user's favorite hotels
  const fetchFavoriteHotels = async () => {
    try {
      // Your API call to fetch favorite hotels
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
          `${BASE_URL}Favorite/${encodeURIComponent(
            item.name
          )}/${encodeURIComponent(userInfo.email)}`
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
  return (
    <View className="mb-72">
      <TouchableOpacity
        onPress={() => setIsSearching(false)}
        className="p-2 mr-5 ml-5 rounded-2xl dark:bg-neutral-700 "
        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      >
        <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
      </TouchableOpacity>
      <FlatList
        data={allResults}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.resultItem}
              className="ml-5 mr-5 rounded-2xl dark:bg-neutral-700 "
              onPress={() => {
                navigation.navigate("Bookings", { item });
              }}
            >
              <Image
                source={{
                  uri: `${IMG_URL}${item.image}`,
                }}
                style={styles.image}
              />
              <TouchableOpacity
                className="absolute top-0 p-2 rounded-full"
                onPress={() => toggleFavourite(item)}
              >
                <HeartIcon
                  size={17}
                  color={isInFavorites(item) ? "red" : "white"}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.name} className="dark:text-white">
                  {item.name}
                </Text>
                <Text style={styles.location} className="dark:text-white">
                  {item.location}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => `${item.id}_${typeof item}_${index}`} //for making warnning remove
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
  },
});

export default SearchResultScreen;
