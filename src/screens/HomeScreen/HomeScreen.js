import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TravelPlaces from "./TravelPlaces";
import Hotel from "./Hotel";
import Vehicle from "./Vehicle";
import OfferScreen from "./OfferScreen";
import SearchComponent from "../../components/SearchComponent";
import SearchResultScreen from "./SearchResultScreen";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AllScreen from "./Popular/AllScreen";
import VirtualizedScrollView from "../../components/VirtualizedScrollView";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // const [viewMode, setViewMode] = React.useState("All");
  const [activeAll, setActive] = useState("All");
  // const sortData = ["All", "Popular", "Recommended"];
  const sortData = ["All", "Popular", "Favourite"];

  const handleSortPress = (sort) => {
    setActive(sort);

    if (sort === "Popular") {
      navigation.navigate("PopularScreen");
      // } else if (sort === "Recommended") {
    } else if (sort === "Favourite") {
      navigation.navigate("Favorite");
    }
  };
  // Run this effect when the screen is focused
  useFocusEffect(
    useCallback(() => {
      // Set the default sort when the screen is focused
      setActive("All");
    }, [])
  );

  return (
    // for avoding virtual listed should i used custome virtualized scroll componentes
    <VirtualizedScrollView className="dark:bg-neutral-950">
      <SearchComponent
        setIsSearching={setIsSearching}
        onSearch={setSearchResults}
      />
      {isSearching ? (
        <SearchResultScreen
          results={searchResults}
          setIsSearching={setIsSearching}
        />
      ) : (
        <View showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* Content of your home screen when not searching */}
          <View>
            <OfferScreen />
            {/* All Screen */}
            <View
              style={styles.Shadow}
              className="m-5 shadow-black shadow-lg flex-row bg-red justify-around items-center mx-4 p-2 rou
              nded-2xl bg-white dark:bg-neutral-800" //bg-[#EAE7E7]"
            >
              {sortData.map((sort, index) => {
                /* checking condition to check weather the active toggle is good or not  */
                let isActive = sort == activeAll;
                let activeButton = isActive
                  ? "bg-white shadowd dark:bg-neutral-700"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleSortPress(sort)}
                    key={index}
                    className={`p-2 flex rounded-full  font-thin  px-4 ${activeButton}   `}
                    style={{
                      paddingLeft: wp(2),
                      fontSize: wp(6),
                      borderColor: "white",
                      shadowColor: "grey",
                      shadowRadius: 1,
                      borderRadius: 2,
                      shadowOpacity: 1,
                      overflow: "visible",
                      shadowOffset: { width: 1, height: 1 },
                    }}
                  >
                    <Text
                      className={`dark:text-white font-light ${isActive ? "text-red-600" : ""} `}
                      style={{
                        fontSize: wp(4),
                      }}
                    >
                      {sort}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text
              className="text-black font-extralight rounded-2xl m-6 dark:text-white"
              style={{
                paddingLeft: wp(2),
                fontSize: wp(4),
                borderColor: "white",
                borderWidth: 1,
                shadowColor: "grey",
                shadowRadius: 1,
                borderRadius: 12,
                shadowOpacity: 1,
                overflow: "visible",
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              Travel Destination
            </Text>
            <TravelPlaces />
            {/* hotel */}
            <Text
              className="text-black font-extralight rounded-2xl m-6 dark:text-white"
              style={{
                paddingLeft: wp(2),
                fontSize: wp(4),
                borderColor: "white",
                borderWidth: 1,
                shadowColor: "grey",
                shadowRadius: 1,
                borderRadius: 12,
                shadowOpacity: 1,
                overflow: "visible",
                shadowOffset: { width: 1, height: 1 },
              }}
            >
              Hotels
            </Text>
            <Hotel />

            <View>
              <Text
                className="text-black font-extralight rounded-2xl m-6 dark:text-white"
                style={{
                  paddingLeft: wp(2),
                  fontSize: wp(4),
                  borderColor: "white",
                  borderWidth: 1,
                  shadowColor: "grey",
                  shadowRadius: 1,
                  borderRadius: 12,
                  shadowOpacity: 1,
                  overflow: "visible",
                  shadowOffset: { width: 1, height: 1 },
                }}
              >
                Vehicle
              </Text>
              <Vehicle />
            </View>
            <AllScreen />
          </View>
        </View>
      )}
    </VirtualizedScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    paddingLeft: wp(4),
    fontWeight: "bold",
    fontSize: wp(6),
  },
  Shadow: {
    borderColor: "#D8D5D5",
    borderWidth: 1,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
    overflow: "visible",
    shadowOffset: { width: 1, height: 2 },
  },
});

export default HomeScreen;
