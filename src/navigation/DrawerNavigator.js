import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeStackNavigator from "./HomeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginStackNavigator from "./LoginStackNavigator";
import LogoutStackNavigator from "./LogoutStackNavigator";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import LogoutScreen from "../screens/LogoutScreen";
import SuccessScreen from "../screens/SuccessScreen";

import useAuth from "../hooks/useAuth";
import { routes, screens } from "./RouteItems";

import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerItem } from "@react-navigation/drawer";

import { Text, StyleSheet, View } from "react-native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const currentRouteName = props.nav()?.getCurrentRoute().name; // get focused route name
  return (
    <DrawerContentScrollView {...props}>
      {routes
        .filter((route) => route.showInDrawer)
        .map((route) => {
          const focusedRouteItem = routes.find(
            (r) => r.name === currentRouteName
          ); // get route item config object
          const focused = focusedRouteItem
            ? route.name === focusedRouteItem?.focusedRoute
            : route.name === screens.HomeStack;
          return (
            <DrawerItem
              key={route.name}
              label={() => (
                <Text
                /*style={
                    focused ? styles.drawerLabelFocused : styles.drawerLabel
                  }*/
                >
                  {route.title}
                </Text>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              /*style={[
                styles.drawerItem,
                focused ? styles.drawerItemFocused : null,
              ]}*/
            />
          );
        })}
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({ nav }) => {
  const { auth, isLoggingOut } = useAuth();
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#551E18",
          height: 50,
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.headerLeft}
          >
            <Icon name="bars" size={20} color="#fff" />
          </TouchableOpacity>
        ),
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />}
    >
      {auth ? (
        <>
          <Drawer.Screen
            name={screens.HomeTab}
            component={BottomTabNavigator}
          />
        </>
      ) : (
        <>
          {isLoggingOut ? (
            <>
              <Drawer.Screen
                name={screens.Logout}
                component={LogoutStackNavigator}
              />
            </>
          ) : (
            <>
              <Drawer.Screen
                name={screens.LoginStack}
                component={LoginStackNavigator}
                options={{ swipeEnabled: false }}
              />
              <Drawer.Screen
                name="Signup"
                component={SignupScreen}
                options={{ swipeEnabled: false }}
              />
              <Drawer.Screen
                name="Success"
                component={SuccessScreen}
                options={{ swipeEnabled: false }}
              />
            </>
          )}
        </>
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
