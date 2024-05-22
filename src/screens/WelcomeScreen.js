import React from "react";
import { View, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 flex justify-end">
      {/* background images */}
      <Image
        source={require("../../assets/images/welcome.png")}
        className="h-full w-full absolute"
      />

      {/* content and gradient   */}
      <View className="p-5 pb-10 space-y-8">
        <View className="space-y-3 mb-5">
          <Text
            className="text-white font-bold text-5xl"
            style={{ fontSize: wp(10) }}
          >
            Traveling is easy!
          </Text>
          <Text
            className="text-neutral-200 font-medium"
            style={{ fontSize: wp(4) }}
          >
            Experience the world's best adventure around the world
          </Text>
          {/* let's go buttom to naviagate to ho */}
          <View className="m-3"></View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
