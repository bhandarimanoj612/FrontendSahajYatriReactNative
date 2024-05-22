import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { BASE_URL, IMG_URL } from "../../utils/config";
import randomImage from "../../../../assets/images/Budget/randomImage";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch all usernames when component mounts
    axios
      .get(`${BASE_URL}Message/userprofiles`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        console.error("Error fetching friends:", error);
      });
  }, []);

  const handleStartChat = (recipient) => {
    const { userName, profileImg } = recipient;
    navigation.navigate("MessagePage", {
      receiverName: userName,
      profileImage: profileImg,
    });
  };

  return (
    <SafeAreaView className="dark:bg-neutral-900 " style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Friends</Text>
      <View className="h-[544]">
        <FlatList
          data={friends}
          keyExtractor={(item) => item.userName} // Use a unique identifier for each item
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleStartChat(item)}
              style={styles.friendContainer}
            >
              <View style={styles.avatarContainer}>
                {/* <Image
                  source={randomImage()} // Use the randomImage function to get a random image
                  style={styles.avatar}
                /> */}
                {console.log(item)}

                <Image
                  source={
                    item.profileImg
                      ? { uri: `${IMG_URL}${item.profileImg}` }
                      : randomImage()
                  }
                  style={styles.avatar}
                />

                <View style={styles.statusIndicator} />
              </View>
              <Text className=" dark:text-white font-bold ">
                {item.userName}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* Add your global chat button */}

      <TouchableOpacity
        style={styles.globalChatButton}
        onPress={() => navigation.navigate("GroupPage")}
      >
        <Text style={styles.globalChatButtonText}>Global Chat</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2B3384",
  },
  friendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    marginBottom: 30,
    marginRight: 20,
    borderRadius: 6,
    backgroundColor: "#4CAF50", // Online status indicator color
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  friendName: {
    fontSize: 18,
    color: "#000000",
  },
  globalChatButton: {
    backgroundColor: "#2B3384",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    position: "relative",
  },
  globalChatButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Friends;
