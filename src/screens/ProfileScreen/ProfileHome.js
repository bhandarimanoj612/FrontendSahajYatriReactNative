import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import ProfileSign from "./ProfileSign";
import UserProfile from "./UserProfile";
import { AuthContext } from "../../Context/AuthContext";

const ProfileHome = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="dark:bg-neutral-900"
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="dark:bg-neutral-900">
      {userToken !== null ? <UserProfile /> : <ProfileSign />}
    </View>
  );
};

export default ProfileHome;
