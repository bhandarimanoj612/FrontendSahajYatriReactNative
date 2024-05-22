import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

const PrivacyPolicyPage = ({ navigation }) => {
  return (
    <View style={styles.container} className=" bg-[#fff] dark:bg-neutral-900 ">
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          className="text-[#333] dark:text-white "
        >
          <ChevronLeftIcon size={20} strokeWidth={4} color="#333" />
          <Text
            style={styles.backButtonText}
            className="text-[#333] dark:text-white "
          >
            Back
          </Text>
        </TouchableOpacity>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Text style={styles.heading} className="text-[#333] dark:text-white ">
            Privacy Policy
          </Text>
          <View
            style={styles.infoContainer}
            className="bg-[#f5f5f5] text-[#333] dark:text-white  dark:bg-neutral-800"
          >
            <Text
              style={styles.infoText}
              className="text-[#333] dark:text-white "
            >
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your personal information.
            </Text>
            <Text
              style={styles.sectionTitle}
              className="text-[#333] dark:text-white "
            >
              Information We Collect
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              We collect information you provide to us, such as your name, email
              address, and phone number, when you register for an account or use
              our services.
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              We also collect information automatically, such as your device
              information, IP address, and browsing activity, using cookies and
              similar technologies.
            </Text>
            <Text
              style={styles.sectionTitle}
              className="text-[#333] dark:text-white "
            >
              How We Use Your Information
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              We use your information to provide and improve our services,
              communicate with you, personalize your experience, and comply with
              legal obligations.
            </Text>
            <Text
              style={styles.sectionTitle}
              className="text-[#333] dark:text-white "
            >
              Data Security
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              We take appropriate measures to protect your personal information
              from unauthorized access, disclosure, alteration, or destruction.
            </Text>
            <Text
              style={styles.sectionTitle}
              className="text-[#333] dark:text-white "
            >
              Your Rights
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              You have the right to access, correct, or delete your personal
              information. You can also opt-out of certain data processing
              activities.
            </Text>
            <Text
              style={styles.sectionTitle}
              className="text-[#333] dark:text-white "
            >
              Changes to This Policy
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </Text>
            <Text
              style={styles.sectionContent}
              className="text-[#333] dark:text-white "
            >
              Contact Us: If you have any questions about this Privacy Policy,
              please contact us at [email address].
            </Text>
          </View>
        </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default PrivacyPolicyPage;
