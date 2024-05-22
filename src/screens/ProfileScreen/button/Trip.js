import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import randomImage from "../../../../assets/images/Budget/randomImage";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../../Context/AuthContext";
import EmptyList from "../../../components/emptyList";
import { Image } from "expo-image";
// create a component
const Trip = () => {
  const { userInfo } = useContext(AuthContext);
  const [tripData, setTripData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) fetchTripData();
  }, [isFocused]);

  const fetchTripData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}BudgetTrip/user/${userInfo.email}`
      );
      setTripData(response.data);
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  return (
    <View className=" dark:bg-neutral-950  " style={{ height: 430 }}>
      <FlatList
        data={tripData}
        horizontal
        ListEmptyComponent={<EmptyList />} //this will be used when there is no data
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <View className="p-3  rounded-2xl m-2  dark:bg-neutral-900 ">
              {console.log(index)}
              <View
                styles={styles.Shadow}
                style={{ height: wp(50), width: wp(40) }}
                className="flex justify-end relative p-4 py-6 space-y-2 mb-5 dark:bg-neutral-900 "
                onPress={() => {}}
              >
                <Image
                  //   styles={styles.Shadow}
                  source={randomImage()}
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

                <Text
                  style={{ fontSize: wp(4) }}
                  className="text-white font-extrabold "
                >
                  {item.city}
                </Text>
                <Text
                  style={{ fontSize: wp(3) }}
                  className="text-white font-light "
                >
                  {item.destination}
                </Text>
              </View>
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
export default Trip;
