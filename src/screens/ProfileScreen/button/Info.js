//import liraries
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// create a component
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../../Context/AuthContext";
import { Switch } from "react-native-paper";
import { useColorScheme } from "nativewind";
const Info = () => {
  //for using dark mode we are using native wind colors steams
  const { colorScheme, toggleColorScheme } = useColorScheme(); //we are using tailwind so we need native colors scheme
  console.log(colorScheme);
  const { logout } = useContext(AuthContext);
  const handleReset = async () => {
    await logout();
  };
  const navigation = useNavigation();
  return (
    <View className="p-2 mb-28  dark:bg-neutral-950">
      <View>
        <TouchableOpacity
          className="bg-white dark:bg-neutral-800  mt-2 p-4 rounded-2xl flex-row justify-between "
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
          onPress={() => navigation.navigate("UserDetailsPage")}
        >
          <Text className="ml-20 font-bold text-black dark:text-white ">
            My Details
          </Text>
          <Icon name="pencil" size={24} color="#2B3384" />
        </TouchableOpacity>
      </View>
      {/* Dark Mode */}
      <View>
        <TouchableOpacity
          className="bg-white mt-2 p-4 rounded-2xl flex-row justify-between dark:bg-neutral-800"
          onPress={toggleColorScheme}
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
        >
          <Text className="ml-20 font-bold text-black dark:text-white    ">
            Dark
          </Text>
          <Switch
            value={colorScheme == "dark"}
            onChange={toggleColorScheme}
            color="#2B3384"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className="bg-white mt-2 p-4 rounded-2xl flex-row justify-between dark:bg-neutral-800"
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
          onPress={() => navigation.navigate("PrivacyPolicyPage")}
        >
          <Text className="ml-20 font-bold text-black dark:text-white  ">
            Privacy Policy
          </Text>
          <Icon name="shield-lock" size={24} color="#2B3384" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className="bg-white mt-2 p-4 rounded-2xl flex-row justify-between dark:bg-neutral-800"
          onPress={() => navigation.navigate("SafetyRulesPage")}
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
        >
          <Text className="ml-20 font-bold text-black dark:text-white ">
            Saftey Rule
          </Text>
          <Icon name="book-open-page-variant" size={24} color="#2B3384" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          className="bg-white mt-2 p-4 rounded-2xl flex-row justify-between dark:bg-neutral-800"
          onPress={() => navigation.navigate("HelpPage")}
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
        >
          <Text className="ml-20 font-bold text-black dark:text-white ">
            Get Help
          </Text>
          <Icon name="phone" size={24} color="#2B3384" />
        </TouchableOpacity>
      </View>
      {/* logout */}
      <View>
        <TouchableOpacity
          onPress={handleReset}
          className="bg-white mt-2 p-4 rounded-2xl flex-row justify-between dark:bg-neutral-800"
          // onPress={}
          style={{
            shadowColor: "black",
            shadowRadius: 1,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 1,
          }}
        >
          <Text className="ml-20 font-bold text-red-600 dark:text-red-600 ">
            Log Out
          </Text>
          <Icon name="logout" size={24} color="red" onPress={handleReset} />
          {/* #2B3384 */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

//make this component available to the app
export default Info;
