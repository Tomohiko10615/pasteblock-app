import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export const screens = {
  HomeTab: "HomeTab",
  HomeStack: "HomeStack",
  Home: "Home",
  LogoutStack: "LogoutStack",
  Logout: "Logout",
  ProfileStack: "ProfileStack",
  Profile: "Profile",
};

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: "Home",
    showInTab: false,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="home" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: "Home",
    showInTab: true,
    showInDrawer: true,
    icon: (focused) => (
      <Icon name="home" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },
  {
    name: screens.Home,
    focusedRoute: screens.Home,
    title: "Home",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="home" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },

  {
    name: screens.LogoutStack,
    focusedRoute: screens.LogoutStack,
    title: "Cerrar sesión",
    showInTab: false,
    showInDrawer: true,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },

  {
    name: screens.Logout,
    focusedRoute: screens.Logout,
    title: "Cerrar sesión",
    showInTab: false,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },
  {
    name: screens.ProfileStack,
    focusedRoute: screens.ProfileStack,
    title: "Mi perfil",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },

  {
    name: screens.Profile,
    focusedRoute: screens.ProfileStack,
    title: "Mi perfil",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },
];
