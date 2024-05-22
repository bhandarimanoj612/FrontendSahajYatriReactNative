import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useStripe } from "@stripe/stripe-react-native";
import { AuthContext } from "../../../Context/AuthContext";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../utils/config";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Image } from "expo-image";

const PaymentScreen = ({ route }) => {
  const { item, checkInDate, checkOutDate, numberOfGuests, price } =
    route.params;

  const { userInfo, userName } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe(); //this is given by stripe

  const onCheckout = async () => {
    try {
      // 1. Create a payment intent
      // Call the API to create a payment intent
      console.log("crated a payment intent  is sucess ");
      const createPaymentIntentResponse = await axios.post(
        `${BASE_URL}StripePayment/intents`,
        {
          amount: Math.floor(calculateTotalPrice() * 100),
        }
      );

      console.log(
        "createPaymentIntentResponse",
        createPaymentIntentResponse.data.clientSecret
      );
      if (createPaymentIntentResponse.error) {
        Alert.alert(
          "Something went wrong creating payment intent:",
          createPaymentIntentResponse.error
        );
        return;
      }
      console.log("initializing the payment  sheet");
      console.log(
        "clientsecret=",
        createPaymentIntentResponse.data.clientSecret
      );
      // 2. Initialize the Payment sheet
      const { error: paymentSheetError } = await initPaymentSheet({
        merchantDisplayName: "sahajYatri",
        paymentIntentClientSecret:
          createPaymentIntentResponse.data.clientSecret,
      });

      if (paymentSheetError) {
        // Alert.alert("Something went wrong", paymentSheetError.message);
        if (Platform.OS === "android") {
          Alert.alert(`Something went wrong ${paymentSheetError.message}`);
        } else {
          showMessage({
            message: "Error initializing the payment sheet",
            description: `Something went wrong ${paymentSheetError.message}`,
            type: "danger",
            backgroundColor: "red",
            color: "white",
            icon: "danger",
          });
        }
        return;
      }
      console.log("present the payement sheet");
      // 3. Present the Payment Sheet from Stripe
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        if (Platform.OS === "android") {
          Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
        } else {
          showMessage({
            message: "Payment failed",
            description: `Error code: ${paymentError.code}`,
            type: "danger",
            backgroundColor: "red",
            color: "white",
            icon: "danger",
          });
        }
        return;
      }

      // 4. If payment ok -> create the order
      onCreateOrder();
    } catch (error) {
      console.error("Error during checkout:", error);
      // Alert.alert(
      //   "Error",
      //   "Failed to complete checkout. Please try again later."
      // );
      if (Platform.OS === "android") {
        Alert.alert(
          "Payment failed ",
          "Faild to complete checkout.please try again  later ."
        );
      } else {
        showMessage({
          message: "Payment failed",
          description: "Failed to complete checkout .plese try again later .",
          type: "danger",
          backgroundColor: "red",
          color: "white",
          icon: "warning",
        });
      }
    }
  };

  const calculateTotalPrice = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay));
    const totalPrice = totalDays * price * numberOfGuests;
    return totalPrice;
  };

  const calculatePricePerDay = () => {
    return price * numberOfGuests;
  };

  //calculate total days
  const calculateTotalDays = () => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay));

    return totalDays;
  };

  const onCreateOrder = async () => {
    setLoading(true);
    // Calculate total days
    const totalDays = calculateTotalDays();
    try {
      // Call the booking API
      const response = await axios.post(`${BASE_URL}${item.category}`, {
        name: item.name,
        userName: userInfo.email,
        startDate: checkInDate,
        endDate: checkOutDate,
        stripePaymentIntentID: "completed",
        totalPrice: calculateTotalPrice(), // Calculate total price
        numberOfGuests: numberOfGuests,
        numberOfDays: totalDays,
        image: item.image,
        pricePerDay: calculatePricePerDay(),
        email: item.email,
      });

      // Handle the booking success
      handleBookingSuccess();
    } catch (error) {
      console.error("Error booking:", error);

      if (Platform.OS === "android") {
        Alert.alert(
          "Error",
          "Failed to complete booking. Please try again later."
        );
      } else {
        showMessage({
          message: "Booking  has been Successful",
          description: "Thank you for your booking",
          type: "danger",
          backgroundColor: "green", // background color
          color: "white", // text color
          icon: "success",
        });
      }

      setLoading(false);
    }
  };

  const handleBookingSuccess = () => {
    // Simulate order creation
    setTimeout(() => {
      if (Platform.OS === "android") {
        Alert.alert("Booking  has been Successful");
      } else {
        showMessage({
          message: "Booking  has been Successful",
          description: "Thank you for your booking",
          type: "success",
          backgroundColor: "green", // background color
          color: "white", // text color
          icon: "success",
        });
      }
      setLoading(false);
      navigation.navigate("BottomTab"); // Navigate back after successful booking
    }, 1000);
  };

  return (
    <View className=" dark:bg-neutral-800 flex-1">
      <StatusBar style={"light"} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="ml-4 rounded-full p-2 mb-4 mr-80 mt-9"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <ChevronLeftIcon size={wp(6)} strokeWidth={4} color="black" />
      </TouchableOpacity>

      <View className=" dark:bg-neutral-800" style={styles.cartItem}>
        <Image
          source={{
            uri: `${IMG_URL}${item.image}`,
          }}
          style={styles.image}
        />
        <View style={styles.itemDetails}>
          <Text className="font-extrabold text-lg  ml-5 text-black dark:text-white mr-5">
            {item.name}
          </Text>
        </View>
      </View>

      <View className=" dark:bg-neutral-800" style={styles.totalsContainer}>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>UserName</Text>
          <Text className="text-sm text-gray-500 mr-4">{userName}</Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>Gmail</Text>
          <Text className="text-sm text-gray-500 mr-4">{userInfo.email}</Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>Price per day</Text>
          <Text className="text-red-400 mr-4">${calculatePricePerDay()}</Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>Number of Guests</Text>
          <Text className="text-sm text-gray-500 mr-4">{numberOfGuests}</Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>Start Date</Text>
          <Text className="text-sm text-gray-500 mr-4">
            {new Date(checkInDate).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>End Date</Text>
          <Text className="text-sm text-gray-500 mr-4">
            {new Date(checkOutDate).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>Number of Days</Text>
          <Text className="text-gray-500 ml-20  mr-4">
            {calculateTotalDays()}
          </Text>
        </View>
        <View style={styles.row} className="mt-5">
          <Text style={styles.text}>Total</Text>
          <Text className="text-red-400 ml-20 mr-4">
            ${calculateTotalPrice()}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onCheckout}
        className="bg-[#2B3384] rounded-full m-2 dark:bg-black mb-28"
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Pay
          {loading && <ActivityIndicator />}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: "black",
  },
  itemPrice: {
    fontSize: 16,
    color: "gray",
  },
  totalsContainer: {
    marginTop: 20,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
    marginTop: 150,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default PaymentScreen;
