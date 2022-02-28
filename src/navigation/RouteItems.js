import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export const screens = {
  HomeTab: "HomeTab",
  HomeStack: "HomeStack",
  Home: "Home",
  LogoutStack: "LogoutStack",
  Logout: "Logout",
  LoginStack: "LoginStack",
  Login: "Login",
  ProfileStack: "ProfileStack",
  Profile: "Profile",
  MessageStack: "MessageStack",
  Message: "Message",
  ServiceStack: "ServiceStack",
  Service: "Service",
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
    name: screens.LoginStack,
    focusedRoute: screens.LoginStack,
    title: "Iniciar sesión",
    showInTab: false,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },

  {
    name: screens.Login,
    focusedRoute: screens.Login,
    title: "Iniciar sesión",
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
  {
    name: screens.MessageStack,
    focusedRoute: screens.MessageStack,
    title: "Notificaciones",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="bell" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },

  {
    name: screens.Message,
    focusedRoute: screens.Message,
    title: "Notificaciones",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="bell" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },
  {
    name: screens.ServiceStack,
    focusedRoute: screens.ServiceStack,
    title: "Servicios",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },

  {
    name: screens.Service,
    focusedRoute: screens.Service,
    title: "Servicios",
    showInTab: true,
    showInDrawer: false,
    icon: (focused) => (
      <Icon name="user" size={30} color={focused ? "#551E18" : "#000"} />
    ),
  },
];
