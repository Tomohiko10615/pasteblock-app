import React, { createRef, useEffect } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { RegProvider } from "./src/context/RegContext";
import { LoadingProvider } from "./src/context/LoadingContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./src/navigation/NavigationStack";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const navigationRef = createRef();
const nav = () => navigationRef.current;

export const getToken = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert(
      "Por favor permite las notificaciones para recibir las comunicaciones de los usuarios en tiempo real"
    );
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log(token.data.toString());
  return token.data.toString();
};

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer ref={navigationRef}>
        <AuthProvider>
          <RegProvider>
            <LoadingProvider>
              <DrawerNavigator nav={nav} />
            </LoadingProvider>
          </RegProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
