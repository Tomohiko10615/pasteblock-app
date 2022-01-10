import React, { createRef } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { RegProvider } from "./src/context/RegContext";
import { LoadingProvider } from "./src/context/LoadingContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./src/navigation/NavigationStack";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

const navigationRef = createRef();
const nav = () => navigationRef.current;

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
