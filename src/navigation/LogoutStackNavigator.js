import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoutScreen from "../screens/LogoutScreen";

const Stack = createStackNavigator();

const Home = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home screen!</Text>
  </View>
);

const LogoutStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export default LogoutStackNavigator;
