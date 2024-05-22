import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import { useEffect } from "react";

const SafetyRulesPage = ({ navigation }) => {
  const [safetyTips, setSafetyTips] = useState([]);

  useEffect(() => {
    fetchSafetyTips();
  }, []);

  const fetchSafetyTips = async () => {
    try {
      const response = await axios.get(`${BASE_URL}SafetyTips`);
      setSafetyTips(response.data);
    } catch (error) {
      console.error("Error fetching safety tips:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.infoText}>
        {item.id} . {item.text}
      </Text>
    </View>
  );
  return (
    <View
      style={styles.container}
      className="bg-[#fff] text-[#333] dark:text-white dark:bg-neutral-800 "
    >
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={20} strokeWidth={4} color="#333" />
          <Text
            style={styles.backButtonText}
            className="text-[#333] dark:text-white"
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading} className="text-[#333] dark:text-white ">
          Safety Tips
        </Text>
        <View
          style={styles.infoContainer}
          className="bg-[#f5f5f5] dark:bg-neutral-800 "
        >
          <FlatList
            data={safetyTips}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
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
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 5,

    fontWeight: "bold",
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SafetyRulesPage;
