import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import randomImage from "../../../assets/images/Budget/randomImage";
import EmptyList from "../../components/emptyList";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../../Context/AuthContext";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import LoginModal from "../../components/LoginModal";
import { Image } from "expo-image";
import VirtualizedScrollView from "../../components/VirtualizedScrollView";
import { showMessage } from "react-native-flash-message";
const CategoryList = () => {
  const { userInfo } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility
  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchTrips();
  }, [isFocused]);

  const fetchTrips = async () => {
    try {
      if (userInfo && userInfo.email) {
        const response = await axios.get(
          `${BASE_URL}BudgetTrip/user/${userInfo.email}`
        );
        setTrips(response.data);
      } else {
        setShowLoginModal(true); // Show login modal if user is not logged in or email is empty
        console.error("User information not available.");
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  // Function to handle login button press
  const handleLoginPress = () => {
    setShowLoginModal(false); // Close the modal
    navigation.navigate("LoginScreen"); // Navigate to the login screen
  };

  const deleteTrip = async (id) => {
    try {
      await axios.delete(`${BASE_URL}BudgetTrip/${id}`);
      setTrips(trips.filter((trip) => trip.id !== id));
      if (Platform.OS === "android") {
        Alert.alert(
          "Successfully",
          "Deleting trip has been successfully deleted"
        );
      } else {
        showMessage({
          message: "Successfully ",
          description: "Deleting trip has been successfully deleted",
          type: "sucess",
          backgroundColor: "green", // background color
          color: "white", // text color
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <View>
      <LoginModal visible={showLoginModal} onPressLogin={handleLoginPress} />
      <View className="pt-4 bg-white dark:bg-neutral-800 mb-60">
        <View className="flex-row justify-between">
          <View className="">
            <Text className="dark:text-white"> Recent Trip:</Text>
          </View>
          <View className="m-3" style={{ paddingRight: 16 }}>
            {userInfo && userInfo.email ? (
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "#2B3384",
                }}
                onPress={() => navigation.navigate("AddTrip")}
              >
                <Text className="text-white p-2"> Add Trip</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "#2B3384",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text className="text-white p-2"> Go to Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {trips.length > 0 ? (
          <VirtualizedScrollView className="h-[450]">
            <FlatList
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={trips}
              renderItem={({ item }) => (
                <Swipeable
                  renderRightActions={() => (
                    <TouchableOpacity
                      onPress={() => deleteTrip(item.id)}
                      style={{
                        backgroundColor: "red",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        height: 160,
                        marginTop: 10,
                        width: 150,
                        borderRadius: 20,
                        borderColor: "black",
                        borderWidth: 1,
                      }}
                    >
                      <Text className="text-white text-xl font-light">
                        Delete
                      </Text>
                    </TouchableOpacity>
                  )}
                >
                  <TouchableOpacity
                    style={styles.Shadow}
                    onPress={() =>
                      navigation.navigate("TripExpenses", {
                        tripId: item.id,
                        city: item.city,
                        destination: item.destination,
                      })
                    }
                    className="mr-3 bg-gray-100 p-2 rounded-2xl mb-8 shadow-sm h-48 dark:bg-neutral-800"
                  >
                    <VirtualizedScrollView>
                      <Image
                        source={randomImage()}
                        className="w-36 h-28 mb-2"
                      />
                      <Text className="text-black font-bold dark:text-white">
                        {item.city}
                      </Text>
                      <Text className="text-black mt-2 dark:text-white">
                        {item.destination}
                      </Text>
                    </VirtualizedScrollView>
                  </TouchableOpacity>
                </Swipeable>
              )}
            />
          </VirtualizedScrollView>
        ) : (
          <EmptyList />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Shadow: {
    borderColor: "#2B3384",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 2,
  },
});

export default CategoryList;
