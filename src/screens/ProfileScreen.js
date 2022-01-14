import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LoggedHeader from "../components/LoggedHeader";
import useAuth from "../hooks/useAuth";
import useReg from "../hooks/useReg";
import useLoading from "../hooks/useLoading";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

export default function ProfileScreen() {
  const { userData } = useAuth();
  const [profileData, setProfileData] = useState({});
  const { edit, profileEdit } = useReg();

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

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused == false) {
      setProfileData(undefined);
    } else {
      (async () => {
        await getUserData();
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    if (profileData != undefined) {
      setBlocker(profileData.blocker);
    }
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
      {profileData && blocker && distritos && servicios ? (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          {edit ? (
            <EditProfile
              profileData={profileData}
              blocker={blocker}
              distritos={distritos}
              servicios={servicios}
            />
          ) : (
            <Profile
              profileData={profileData}
              blocker={blocker}
              distritos={distritos}
              servicios={servicios}
            />
          )}
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
