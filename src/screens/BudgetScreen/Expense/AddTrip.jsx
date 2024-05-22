//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import { Image } from "expo-image";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { AuthContext } from "../../../Context/AuthContext";
import KeyboardAvodingContainer from "../../../components/KeyboardAvodingContainer";
// create a component
import { showMessage, hideMessage } from "react-native-flash-message";

const AddTrip = () => {
  const { userInfo } = useContext(AuthContext);
  const navigation = useNavigation();
  const [place, setPlace] = useState("");
  const [city, setCity] = useState("");

  const handleAddTrip = async () => {
    try {
      const response = await axios.post(`${BASE_URL}BudgetTrip`, {
        destination: place,
        city,
        userName: userInfo.email, //passing username from the application inside of it
      });
      if (Platform.OS === "android") {
        Alert.alert("Sucess", "Successfully added Trip");
      } else {
        showMessage({
          message: "Success ",
          description: "An trip has already been added",
          type: "success",
          backgroundColor: "green",
          color: "white",
          icon: "success",
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  return (
    // <KeyboardAvodingContainer className="mt-10 dark:bg-neutral-800">
    <KeyboardAvodingContainer className=" dark:bg-neutral-800">
      <View>
        <Image
          source={require("../../../../assets/images/Budget/6.png")}
          style={{ width: wp(100), height: hp(40) }}
        />
        <SafeAreaView
          className={"flex-row justify-between items-center w-full absolute"}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-4"
            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
          </TouchableOpacity>
        </SafeAreaView>

        <View
          style={{
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            // borderColor: "#6E6C6C",
            // borderWidth: 1,
            overflow: "visible",
            shadowColor: "black",
            shadowRadius: 1,
            shadowOpacity: 1,
          }}
          className="px-5  justify-between bg-white pt-8 -mt-20 pb-10  dark:bg-neutral-800"
        >
          <Text className="mt-5 font-medium ml-5 text-2xl dark:text-white">
            {" "}
            Which Destination are you going ?
          </Text>
          <TextInput
            style={style.Shadow}
            placeholderTextColor={"#89858E"}
            placeholder="Rara Lake"
            value={place}
            onChangeText={(value) => setPlace(value)}
            className="p-4 bg-gray-300  rounded-2xl m-5"
          />
          <Text className="mt-5 font-medium ml-4 text-2xl dark:text-white ">
            {" "}
            Where City are you going ?
          </Text>
          <TextInput
            style={style.Shadow}
            value={city}
            onChangeText={(value) => setCity(value)}
            className="p-4 bg-gray-300  rounded-2xl m-5"
            placeholder="Pokhara"
            placeholderTextColor={"#89858E"}
          />
          <TouchableOpacity
            style={{
              height: wp(15),
              width: wp(50),
            }}
            onPress={() => {
              {
                handleAddTrip();
              }
            }}
            className="bg-[#2B3384] dark:bg-neutral-950 mb-9 mx-auto flex justify-center items-center rounded-full mt-20 "
          >
            <Text
              className="text-white font-bold"
              style={{ fontSize: wp(5.5) }}
            >
              Add Trip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvodingContainer>
  );
};

// define your styles
const style = StyleSheet.create({
  // for adding inner shadow in text field
  Shadow: {
    borderColor: "#6E6C6C",
    borderWidth: 1,
    overflow: "visible",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});
//make this component available to the app
export default AddTrip;
