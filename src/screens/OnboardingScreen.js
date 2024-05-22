import { View, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import WelcomeScreen from "./WelcomeScreen.js";
import { TouchableOpacity } from "react-native";
import { getItem, setItem } from "./utils/asyncStorage.js";
import ProfileSign from "./ProfileScreen/ProfileSign.js";

const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    // Check if the onboarding has been completed previously
    const checkOnboardingStatus = async () => {
      const onboarded = await getItem("onboarded");
      if (onboarded === "1") {
        // If onboarding has been completed, navigate to the main screen
        navigation.navigate("BottomTab");
      }
    };
    checkOnboardingStatus();
  }, []);

  const handleDone = () => {
    // Set the flag to indicate that onboarding has been completed
    setItem("onboarded", "1");
    // Navigate to the main screen
    navigation.navigate("BottomTab");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity {...props}>
        <Text className="m-5 text-white font-bold ">Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Onboarding
        containerStyles={{ paddingHorizontal: 15 }}
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: "#2B3384",
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{ width: 100, height: 280 }}
                  source={require("../../assets/animations/travel2.json")}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: "Welcome to SahajYatri",
            subtitle: "Let's make travel fun",
          },
          {
            backgroundColor: "#2B3384",
            image: (
              <View style={{ width: 390, height: 800 }}>
                <WelcomeScreen />
              </View>
            ),
            title: "",
            subtitle: "",
          },
          {
            backgroundColor: "#2B3384",
            image: (
              <View style={{ width: 390, height: 650 }}>
                <ProfileSign />
              </View>
            ),
            title: "",
            subtitle: "",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 410,
    height: 350,
  },
});

export default OnboardingScreen;
