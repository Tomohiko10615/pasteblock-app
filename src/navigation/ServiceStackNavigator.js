import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ServiceScreen from "../screens/ServiceScreen";

const Stack = createStackNavigator();

const ServiceStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Service" component={ServiceScreen} />
    </Stack.Navigator>
  );
};

export default ServiceStackNavigator;
