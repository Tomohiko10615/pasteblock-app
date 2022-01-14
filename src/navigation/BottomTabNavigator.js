import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import MessageStackNavigator from "./MessageStackNavigator";

import { routes, screens } from "./RouteItems";
import Icon from "react-native-vector-icons/FontAwesome";
import LogoutStackNavigator from "./LogoutStackNavigator";
import LoginStackNavigator from "./LoginStackNavigator";

const Tab = createBottomTabNavigator();

const tabOptions = ({ route }) => {
  const item = routes.find((routeItem) => routeItem.name === route.name); // get the route config object

  if (!item.showInTab) {
    // hide this tab
    return {
      tabBarButton: () => <View style={{ width: 0 }} />,
      headerShown: false,
      tabBarStyle: styles.tabContainer,
      title: item.title,
    };
  }

  return {
    tabBarIcon: ({ focused }) => item.icon(focused),
    tabBarLabel: () => (
      <Text style={styles.tabBarLabel}>{item.title || ""}</Text>
    ),
    headerShown: false,
    tabBarStyle: styles.tabContainer,
    title: item.title,
  };
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name={screens.HomeStack}
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.ProfileStack}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.MessageStack}
        component={MessageStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="inbox" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.LogoutStack}
        component={LogoutStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.LoginStack}
        component={LoginStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: "#292929",
    fontSize: 12,
  },
  tabContainer: {
    height: 60,
  },
});

export default BottomTabNavigator;
