import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { BASE_URL, IMG_URL } from "../../utils/config";
import { Rating } from "react-native-ratings";
import { useColorScheme } from "nativewind";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import EmptyComment from "../../../components/emptyComment";

const Comments = ({ route, navigation }) => {
  const [comments, setComments] = useState([]);
  const { item } = route.params;
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}Review/CommentsByHotel/${item.name}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image
        source={{
          uri: `${IMG_URL}${item.userProfile}`,
        }}
        style={styles.userImage}
      />
      <View style={styles.commentContent}>
        <View style={styles.userInfo}>
          <Text className="font-bold  dark:text-white " style={styles.userName}>
            {item.userName}
          </Text>
          <Rating
            startingValue={item.rating}
            readonly={true}
            imageSize={wp(5)}
            tintColor={colorScheme === "dark" ? "#262626" : undefined}
          />
        </View>
        <Text className="font-light dark:text-white" style={styles.commentText}>
          {item.comment}
        </Text>
        <Text className="dark:text-white" style={styles.commentDate}>
          {formatDate(item.ratingDate)}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="font-bold bg-white dark:bg-neutral-800 h-full">
      <StatusBar style={"light"} />
      <SafeAreaView
        className={"flex-row justify-between items-center w-full absolute "}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-4 dark:bg-black"
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
        >
          <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="black" />
        </TouchableOpacity>
      </SafeAreaView>
      <Text className=" mt-14  ml-20 text-md font-bold  dark:text-white">
        Comments for- {item.name}
      </Text>
      <View className="mt-5">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          ListEmptyComponent={<EmptyComment />} //this will be used when there is no data
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  userImage: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    marginRight: 15,
  },
  commentContent: {
    flexDirection: "column",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    marginRight: 10,
  },
  commentText: {
    fontSize: 13,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 10,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default Comments;
