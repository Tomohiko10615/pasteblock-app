import React, { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
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
  const [servicios, setServicios] = useState([]);

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
      let serviciosArray = [];
      for (let i = 0; i < blocker.distritos.length; i++) {
        distritosArray.push(blocker.distritos[i].nombre);
      }
      for (let i = 0; i < blocker.servicios.length; i++) {
        serviciosArray.push(blocker.servicios[i].tipoServicio);
      }
      setDistritos(distritosArray);
      setServicios(serviciosArray);
    }
  }, [blocker]);

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <LoggedHeader />
      <ScrollView>
        {profileData && blocker && distritos && servicios ? (
          <Profile
            profileData={profileData}
            blocker={blocker}
            distritos={distritos}
            servicios={servicios}
          />
        ) : (
          <Text>Cargando...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
});
