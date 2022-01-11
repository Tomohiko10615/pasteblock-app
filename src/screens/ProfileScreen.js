import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, Image } from "react-native";
import LoggedHeader from "../components/LoggedHeader";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";
import Profile from "../components/Profile";

export default function ProfileScreen() {
  const { userData } = useAuth();
  const { loading } = useLoading();
  const [profileData, setProfileData] = useState({});
  const photoUrl = "";

  const [blocker, setBlocker] = useState(undefined);
  const [distritos, setDistritos] = useState([]);

  async function getUserData() {
    try {
      const url = "https://pasteblock.herokuapp.com/api/usuario/" + userData;
      const response = await fetch(url);
      setProfileData(await response.json());
    } catch (e) {
      console.log(e);
    }
  }

  useLayoutEffect(() => {
    (async () => {
      await getUserData();
    })();
  }, []);

  useEffect(() => {
    setBlocker(profileData.blocker);
  }, [profileData]);

  useEffect(() => {
    if (blocker != undefined) {
      let distritosArray = [];
      for (let i = 0; i < blocker.distritos.length; i++) {
        distritosArray.push(blocker.distritos[i].nombre);
      }
      setDistritos(distritosArray);
    }
  }, [blocker]);

  return (
    <View>
      <LoggedHeader />
      {profileData && blocker && distritos ? (
        <Profile
          profileData={profileData}
          blocker={blocker}
          distritos={distritos}
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
}
