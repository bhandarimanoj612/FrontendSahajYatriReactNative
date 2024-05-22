import AppNavigation from "./src/navigation/AppNavigation";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useState } from "react";
import { UserLocationContext } from "./src/Context/UserLocationContext";
import { AuthProvider } from "./src/Context/AuthContext";
import "react-native-url-polyfill/auto";
import registerNNPushToken from "native-notify";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";
LogBox.ignoreAllLogs();
export default function App() {
  registerNNPushToken(20076, "AuOjF70XkEQgKvmMdGTrAt");

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <AuthProvider>
        <StripeProvider publishableKey="pk_test_51OxTFa1bF7cmrKQ8J8woJL2eOtCuyzpVdQbry7QEbrNyIsLQGxz8uDzuGGyDzjuJnvAzinCZDJhFiXBwfppyv5Sb00J7uWDpaO">
          <FlashMessage position="top" />
          <AppNavigation />
        </StripeProvider>
      </AuthProvider>
    </UserLocationContext.Provider>
  );
}
