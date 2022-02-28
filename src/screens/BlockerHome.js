import React, { useEffect } from "react";
import { View } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import Home from "../components/Auth/Home";
import useAuth from "../hooks/useAuth";

export default function BlockerHome(props) {
  const { navigation } = props;
  return (
    <View>
      <Home navigation={navigation} />
    </View>
  );
}
