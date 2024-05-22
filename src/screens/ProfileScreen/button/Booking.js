import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../utils/config";
import EmptyList from "../../../components/emptyList";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import { Image } from "expo-image";
import EmptyBooking from "../../../components/emptyBooking";

// create a component
const Booking = () => {
  const { userInfo, userName } = useContext(AuthContext);
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}Booking/user/${userInfo.email}`
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  // Assuming 'results' contains 'hotels', 'travel', and 'vehicles' keys
  const allResults = Object.values(bookings).flat(); // Combine all arrays into one
  console.log(allResults);
  return (
    <View className="bg-white   dark:bg-neutral-950 " style={{ height: 430 }}>
      <FlatList
        data={allResults}
        horizontal
        ListEmptyComponent={<EmptyBooking />}
        keyExtractor={(item, index) => `${item.id}_${typeof item}_${index}`} //for making warnning remove
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          // const isFavouri
          // te = favouriteIndexes.includes(index);
          return (
            <View className="p-3 rounded-2xl mt-6 m-2 mb-24 dark:bg-neutral-900">
              {console.log(index)}
              <TouchableOpacity
                styles={styles.Shadow}
                style={{ height: wp(50), width: wp(40) }}
                className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
                onPress={() => {
                  navigation.navigate("BookingDetails", { item });
                }}
              >
                <Image
                  //   styles={styles.Shadow}

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
                    height: hp(20),
                    borderBottomLeftRadius: 19,
                    borderBottomRightRadius: 19,
                  }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute bottom-0"
                />
                {/* <TouchableOpacity
                  className="absolute top-0 right-1 p-3 rounded-full"
                  onPress={() => toggleFavourite(index)}
                >
                  <HeartIcon
                    size={wp(5)}
                    color={isFavourite ? "red" : "white"}
                  />
                </TouchableOpacity> */}
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
                  {item.totalPrice}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Booking;
