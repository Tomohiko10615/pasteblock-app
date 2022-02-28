import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import BlockerHome from "../screens/BlockerHome";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={BlockerHome} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
