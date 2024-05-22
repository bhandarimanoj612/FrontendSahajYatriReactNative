// MessagePage.js
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL, Chat_Url, IMG_URL } from "../../utils/config";
import { Image } from "expo-image";
import randomImage from "../../../../assets/images/Budget/randomImage";

const MessagePage = ({ route, navigation }) => {
  const { receiverName, profileImage } = route.params;

  const { userName } = useContext(AuthContext);
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(Chat_Url)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => console.log("SignalR Connected"))
        .catch((err) => console.log("SignalR Connection Error: ", err));

      connection.on("ReceivedMessage", (receivedMessage) => {
        console.log("Received message:", receivedMessage);
        fetchMessages(); // Fetch messages again after receiving a new message
      });
    }
  }, [connection]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios
      .get(`${BASE_URL}Message/${userName}/${receiverName}`)
      .then((response) => {
        const { senderRecipientMessages, recipientSenderMessages } =
          response.data;
        const combinedMessages = [
          ...recipientSenderMessages.reverse(), // Reverse recipientSenderMessages array to display old messages at the top
          ...senderRecipientMessages.reverse(), // Reverse senderRecipientMessages array to display old messages at the top
        ];
        setMessages(combinedMessages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => console.log("SignalR Connected"))
        .catch((err) => console.log("SignalR Connection Error: ", err));

      connection.on("ReceivedMessage", (receivedMessage) => {
        console.log("Received message:", receivedMessage);
        fetchMessages(); // Fetch messages again after receiving a new message
      });
    }
  }, [connection]);

  const sendMessage = () => {
    const message = {
      sender: userName,
      recipient: receiverName,
      content: messageContent,
    };

    axios
      .post(`${BASE_URL}Message`, message)
      .then((response) => {
        setMessageContent("");
        fetchMessages(); // Fetch messages again after sending a new message
        connection.send("SendMessage", message.content); // Send the message via SignalR
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const renderMessage = ({ item }) => {
    const [sender, content] = item.split("  -  ");
    const isCurrentUser = sender === userName;
    return (
      <View
        style={[
          styles.messageContainer,
          { alignSelf: isCurrentUser ? "flex-end" : "flex-start" }, // Align messages to the right for sender and to the left for receiver
          { backgroundColor: isCurrentUser ? "#2B3384" : "#e6e6e1" },
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: isCurrentUser ? "#ffffff" : "#000000" },
          ]}
        >
          {content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container} className="dark:bg-neutral-900 bg-light-50">
      <View style={styles.messagesContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          className="bg-gray-200 dark:bg-neutral-700 rounded-2xl"
        >
          <ChevronDoubleLeftIcon size={wp(5)} strokeWidth={4} color="black" />

          <Image
            source={
              profileImage
                ? { uri: `${IMG_URL}${profileImage}` }
                : randomImage()
            }
            style={styles.avatar}
          />
          {receiverName !== userName && ( // Conditionally render the receiver's name only if it's different from the sender's name
            <Text className="text-xl font-bold ml-5">{receiverName}</Text>
          )}

          {receiverName == userName && ( //show me logic
            <Text className="text-xl font-bold ml-5">Me</Text>
          )}
        </TouchableOpacity>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          //inverted // To display the latest message at the bottom
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          className="dark:bg-white"
          placeholder="Type your message..."
          value={messageContent}
          onChangeText={setMessageContent}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        {/* Display profile image */}
        {/* <Image source={{ uri: profileImage }} style={styles.profileImage} /> */}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginTop: 20,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2B3384",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 50,
    marginLeft: 30,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
});

export default MessagePage;
