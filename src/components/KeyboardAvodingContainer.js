import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
const KeyboardAvodingContainer = ({ children, style }) => {
  // since this is container that will be wrapper for th content |
  //content of the screen we want to take in children properties and pass
  //below return button
  return (
    <SafeAreaView style={{}} className="dark:bg-neutral-800">
      <KeyboardAvoidingView
        style={{}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.containContainer, style]}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 0 : 0,
  },
});
export default KeyboardAvodingContainer;
