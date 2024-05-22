//import liraries
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-10";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { BASE_URL, IMG_URL } from "../../../utils/config";
import { Image } from "expo-image";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { Rating } from "react-native-ratings";
import { TextInput } from "react-native-paper";
import { useColorScheme } from "nativewind";
import { showMessage } from "react-native-flash-message";
// create a component
const BookingDetails = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const { userInfo, userName } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null); // State to hold user image path for user profile
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [existingReview, setExistingReview] = useState(null);
  const isFocused = useIsFocused(); //this is used for making the item auto refresh
  // State variable to track whether the text input is focused
  const [textInputFocused, setTextInputFocused] = useState(false);
  const { colorScheme } = useColorScheme();

  console.log("hotelemail", userName);
  console.log("hotelemail", item.email);
  console.log("HotelName ", item.name);
  console.log("HotelName ", item.category);
  console.log("Image", userImage);
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

    const fetchExistingReview = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}Review/CommentsByHotel/${item.name}`
        );
        const userReview = response.data.find(
          (review) => review.userName === userName
        );
        setExistingReview(userReview);
        if (userReview) {
          setComment(userReview.comment);
          setRating(userReview.rating);
        }
      } catch (error) {
        console.error("Error fetching existing review:", error);
      }
    };

    if (isFocused) {
      fetchUserImage();
      fetchExistingReview();
    }
  }, [isFocused]);

  const submitReview = async () => {
    try {
      const response = await axios.post(`${BASE_URL}Review`, {
        userName: userName,
        rating: rating,
        comment: comment,
        category: item.category,
        userProfile: userImage,
        name: item.name,
        hotelEmail: item.email,
      });
      console.log("Review submitted successfully:", response.data);

      if (Platform.OS === "android") {
        Alert.alert("Review Submitted", "Thank you for your review!");
      } else {
        showMessage({
          message: "Review Submitted",
          description: "Thank you for your review!",
          type: "sucess",
          backgroundColor: "green", // background color
          color: "white", // text color
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error submitting review:", error);

      if (Platform.OS === "android") {
        Alert.alert("Error", "Failed to submit your review. Please try again.");
      } else {
        showMessage({
          message: "Error",
          description: "Failed to submit your review. Please try again.",
          type: "danger",
          backgroundColor: "red", // background color
          color: "white", // text color
          icon: "danger",
        });
      }
    }
  };
  // console.log("Review submitted successfully", existingReview.id);

  const updateReview = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}Review/${existingReview.id}`,

        {
          id: `${existingReview.id}`,
          userName: userName,
          rating: rating,
          comment: comment,
          category: item.category,
          userProfile: userImage,
          name: item.name,
          hotelEmail: item.email,
        }
      );
      console.log("Review updated successfully:", response.data);

      if (Platform.OS === "android") {
        Alert.alert(
          "Review Updated",
          "Your review has been updated successfully!"
        );
      } else {
        showMessage({
          message: "Review Updated",
          description: "Review Updated Successfully",
          type: "sucess",
          backgroundColor: "green", // background color
          color: "white", // text color
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error updating review:", error);
      Alert.alert("Error", "Failed to update your review. Please try again.");
    }
  };

  const deleteReview = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}Review/${existingReview.id}`
      );
      console.log("Review deleted successfully:", response.data);

      if (Platform.OS === "android") {
        Alert.alert(
          "Review Deleted",
          "Your review has been deleted successfully!"
        );
      } else {
        showMessage({
          message: "Review Deleted ",
          description: "Review Deleted Successfully",
          type: "sucess",
          backgroundColor: "green", // background color
          color: "white", // text color
          icon: "success",
        });
      }
      setExistingReview(null);
    } catch (error) {
      console.error("Error deleting review:", error);
      if (Platform.OS === "android") {
        Alert.alert("Error", "Failed to delete your review. Please try again.");
      } else {
        showMessage({
          message: "Error ",
          description: " deleting review:",
          type: "danger",
          backgroundColor: "red", // background color
          color: "white", // text color
          icon: "danger",
        });
      }
    }
  };

  // Function to handle canceling the review
  const cancelReview = () => {
    // Reset the comment and rating state variables
    setComment("");
    setRating(0);

    // Show an alert to confirm cancellation

    if (Platform.OS === "android") {
      Alert.alert(
        "Cancel Review",
        "Are you sure you want to cancel the review?"
      );
    } else {
      showMessage({
        message: "Cancel Review",
        description: " Are you sure you want to cancel the review?",
        type: "danger",
        backgroundColor: "red", // background color
        color: "white", // text color
        icon: "danger",
      });
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
      <View className="bg-black flex-1 dark:bg-neutral-900 ">
        {/* image of the places  */}
        <Image
          source={{
            uri: `${IMG_URL}${item.image}`,
          }}
          style={{ width: wp(100), height: hp(55) }}
        />
        <StatusBar style={"light"} />
        {/* back button */}
        <SafeAreaView
          className={
            "flex-row justify-between items-center w-full absolute " + topMargin
          }
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-4"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
        {/* title & descritpion & booking button */}
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14 dark:bg-neutral-800"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="space-y-5"
          >
            <View className="flex-row justify-between items-start ">
              <Text
                style={{ fontSize: wp(7) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                {item.name}
              </Text>
              {/* text */}
              <View>
                <Text
                  style={{ fontSize: wp(5), color: "green" }}
                  className="font-semibold dark:text-white"
                >
                  {item?.status}
                </Text>
              </View>
            </View>
            {/* long description */}
            {/* showing review */}
            <View>
              {/* Display existing review and provide option to update */}
              {existingReview && (
                <View style={{ padding: 20 }}>
                  <View className="flex-row dark:text-white">
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                        marginRight: 10,
                      }}
                      className="dark:text-white"
                    >
                      Your Review
                    </Text>
                    <Rating
                      startingValue={existingReview.rating}
                      onFinishRating={setRating}
                      imageSize={22}
                      tintColor={colorScheme === "dark" ? "#262626" : undefined}
                    />
                  </View>
                  <TextInput
                    onFocus={() => setTextInputFocused(true)} // Set textInputFocused to true when text input is focused
                    onBlur={() => setTextInputFocused(false)} // Set textInputFocused to false when text input loses focus
                    placeholder="Enter your comment"
                    value={comment}
                    onChangeText={setComment}
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 10,
                    }}
                    multiline
                    numberOfLines={4}
                  />
                  <TouchableOpacity
                    onPress={updateReview}
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    className="bg-blue-900"
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Update Review
                    </Text>
                  </TouchableOpacity>

                  {/* Show "Cancel Review" option only when the text input is focused */}
                  {textInputFocused && (
                    <TouchableOpacity
                      onPress={cancelReview}
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Cancel Review
                      </Text>
                    </TouchableOpacity>
                  )}
                  {existingReview.comment && (
                    <TouchableOpacity
                      onPress={deleteReview}
                      className="bg-red-600"
                      style={{
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Delete Review
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {/* Add comment form if the user hasn't reviewed the hotel */}
              {!existingReview && (
                <View style={{ padding: 20 }}>
                  <View className="flex-row">
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                        marginRight: 10,
                      }}
                      className="dark:text-white"
                    >
                      Add Review
                    </Text>
                    <Rating
                      startingValue={rating}
                      onFinishRating={setRating}
                      imageSize={22}
                    />
                  </View>
                  <TextInput
                    onFocus={() => setTextInputFocused(true)} // Set textInputFocused to true when text input is focused
                    onBlur={() => setTextInputFocused(false)} // Set textInputFocused to false when text input loses focus
                    placeholder="Enter your comment"
                    value={comment}
                    onChangeText={setComment}
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 10,
                    }}
                    multiline
                    numberOfLines={4}
                  />
                  <TouchableOpacity
                    onPress={submitReview}
                    style={{
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    className="bg-blue-900"
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Submit Review
                    </Text>
                  </TouchableOpacity>
                  {/* Show "Cancel Review" option only when the text input is focused */}
                  {textInputFocused && (
                    <TouchableOpacity
                      onPress={cancelReview}
                      style={{
                        backgroundColor: "red",
                        padding: 10,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Cancel Review
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
            <Text
              style={{ fontSize: wp(3.9) }}
              className="text-green-700 tracking-wide  font-bold mb-2 dark:text-white"
            >
              Sucess
            </Text>
            {/* Start */}
            <View className="flex-row ">
              <Text
                Text
                style={{ fontSize: wp(4) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                Start Date
              </Text>
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white"
              >
                {item?.startDate}
              </Text>
            </View>
            <View className="flex-row ">
              <Text
                Text
                style={{ fontSize: wp(4) }}
                className="font-extrabold flex-1 text-black dark:text-white"
              >
                End Date
              </Text>
              <Text
                style={{ fontSize: wp(3.9) }}
                className="text-black tracking-wide mb-2 dark:text-white "
              >
                {item?.endDate}
              </Text>
            </View>

            {/* Rating */}
            <View className="flex-row">
              <Text
                Text
                style={{ fontSize: wp(5) }}
                className="font-semibold flex-1 text-black dark:text-white"
              >
                Guess
              </Text>
              {/* using rating  from the back */}

              <Text
                style={{ fontSize: wp(5) }}
                className="text-black tracking-wide mb-2 dark:text-white"
              >
                {item?.numberOfGuests}
              </Text>
            </View>

            {/* add comment        */}
            {/* Comment Section */}
            <ScrollView style={{ marginTop: 20 }}>
              <View className="flex-row justify-between">
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                  className="dark:text-white"
                >
                  Email
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    marginBottom: 10,
                  }}
                  className="font-light dark:text-white "
                >
                  {item.userName}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  className="dark:text-white"
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  PricePerNight
                </Text>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "red",
                  }}
                >
                  {item.pricePerDay}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  className="dark:text-white"
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Number of Days
                </Text>
                <Text
                  className="dark:text-white"
                  style={{
                    fontSize: wp(4),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {item.numberOfDays}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                  className="dark:text-white"
                >
                  Total Price
                </Text>
                <Text
                  style={{
                    color: "red",
                    fontSize: wp(5),
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {item.totalPrice}
                </Text>
              </View>
            </ScrollView>
            <View className="mb-11 p-4 ">
              <Text className="font-medium text-blue-900 text-center">
                Thank You For Choosing {item.hotelName}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

//

//make this component available to the app
export default BookingDetails;
