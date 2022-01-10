import React, { useEffect } from "react";
import { View, Text } from "react-native";
import LoginForm from "../components/Auth/LoginForm";

export default function LoginScreen(props) {
  const { navigation } = props;

  return (
    <View>
      <LoginForm navigation={navigation} />
    </View>
  );
}
