import React, { createRef, useEffect, useState, useRef } from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { RegProvider } from "./src/context/RegContext";
import { LoadingProvider } from "./src/context/LoadingContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import useAuth from "./src/hooks/useAuth";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useNavigation } from "@react-navigation/native";

const prefix = Linking.makeUrl("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Drawer: {
        screens: {
          HomeTab: {
            screens: {
              MessageStack: { screens: { Message: "message" } },
              ServiceStack: { screens: { Service: "service" } },
            },
          },
        },
      },
    },
  },
};

const navigationRef = createRef();
const nav = () => navigationRef.current;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/*export const getToken = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert(
      "Por favor permite las notificaciones para recibir las comunicaciones en tiempo real"
    );
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data.toString();
};*/

export default function App() {
  const [notification, setNotification] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const { login } = useAuth();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const navigation = useNavigation();

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.title &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      if (
        lastNotificationResponse.notification.request.content.title ==
        "Nueva solicitud"
      ) {
        console.log("flag");
        //Linking.openURL(Linking.makeUrl("message"));
      }
    }
  }, [lastNotificationResponse]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavigationContainer linking={linking} ref={navigationRef}>
        <AuthProvider expoPushToken={expoPushToken}>
          <RegProvider>
            <LoadingProvider>
              <DrawerNavigator name="Drawer" nav={nav} />
            </LoadingProvider>
          </RegProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token.toString();
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
