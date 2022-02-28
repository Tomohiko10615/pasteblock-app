import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessageScreen from "../screens/MessageScreen";

const Stack = createStackNavigator();

const MessageStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export default MessageStackNavigator;
