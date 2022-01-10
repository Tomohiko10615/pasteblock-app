import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import LoggedHeader from "../components/LoggedHeader";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

export default function ProfileScreen() {
  const { userData } = useAuth();
  const { loading } = useLoading();
  const [profileData, setProfileData] = useState({});
  useLayoutEffect(() => {
    console.log("s");
    setProfileData(getUserData());
  }, []);

  async function getUserData() {
    try {
      const url = "https://pasteblock.herokuapp.com/api/usuario/" + userData;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <LoggedHeader />
      <Text>Hola {profileData.nombre}</Text>
    </View>
  );
}
