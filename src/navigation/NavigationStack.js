import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BlockerHome from "../screens/BlockerHome";
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen";
import LogoutScreen from "../screens/LogoutScreen";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import useAuth from "../hooks/useAuth";
import useLoading from "../hooks/useLoading";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={BlockerHome} />
      <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
      <Drawer.Screen name="Cerrar sesión" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const ProfileNavigationDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mi perfil" component={ProfileScreen} />
      <Drawer.Screen name="Inicio" component={BlockerHome} />
      <Drawer.Screen name="Cerrar sesión" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

const NavigationTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={NavigationDrawer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileNavigationDrawer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function NavigationStack() {
  const { auth, isLoggingOut } = useAuth();
  const { isLoading } = useLoading();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "white" },
      }}
    >
      {isLoading ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <>
          {auth ? (
            <>
              <Stack.Screen name="Home" component={BlockerHome} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </>
          ) : (
            <>
              {isLoggingOut ? (
                <Stack.Screen name="Logout" component={LogoutScreen} />
              ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                </>
              )}
            </>
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
