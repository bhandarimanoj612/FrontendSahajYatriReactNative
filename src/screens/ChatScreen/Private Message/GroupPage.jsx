import React, { useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { ChevronDoubleLeftIcon } from "react-native-heroicons/outline";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Chat_Url } from "../../utils/config";

const GroupPage = ({ navigation }) => {
  const [connection, setConnection] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${Chat_Url}`)
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
        setReceivedMessages((prevMessages) => [
          ...prevMessages,
          receivedMessage,
        ]);
      });
    }
  }, [connection]);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await connection.send("SendMessage", message);
        setMessage("");
      } catch (err) {
        console.log("Error sending message: ", err);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      className="dark:bg-neutral-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        className="bg-gray-200 rounded-2xl  dark:bg-neutral-700  mt-5 p-3"
      >
        <ChevronDoubleLeftIcon size={wp(5)} strokeWidth={4} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {receivedMessages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.messageText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          className="dark:bg-white"
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type a message..."
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  backButton: {
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
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#e6e6e6",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
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
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
});

export default GroupPage;
