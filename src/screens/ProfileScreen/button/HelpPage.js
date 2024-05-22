import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const HelpPage = ({ navigation }) => {
  // Function to call emergency phone number
  const callEmergencyNumber = () => {
    Linking.openURL("tel:+9819093071");
  };

  return (
    <View style={styles.container} className=" dark:bg-neutral-900">
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon
            size={20}
            strokeWidth={4}
            color="grey"
            className=" dark:text-white"
          />
          <Text className="text-black font-bold dark:text-white">Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading} className="dark:text-white">
          Need Help?
        </Text>

        <TouchableOpacity onPress={callEmergencyNumber} style={styles.button}>
          <Icon name="phone" size={24} color="white" />
          <Text style={styles.buttonText}>Call Emergency: 9819093071</Text>
        </TouchableOpacity>
        <View
          style={styles.infoContainer}
          className="bg-[#f9f9f9] dark:bg-neutral-800"
        >
          <Text style={styles.infoText} className=" dark:text-white">
            If you need assistance or have any questions, feel free to call our
            emergency number above.
          </Text>
          <Text style={styles.infoText} className=" dark:text-white">
            Please note that our policies ensure your safety and security. We do
            not tolerate scams or fraudulent activities. If you encounter any
            suspicious behavior or believe you have been scammed, please contact
            us immediately.
          </Text>
          <Text style={styles.infoText} className=" dark:text-white">
            Our team is dedicated to providing support and resolving any issues
            you may encounter while using our services.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#CB0A31",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "black",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    marginBottom: 20,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowRadius: 1,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HelpPage;
