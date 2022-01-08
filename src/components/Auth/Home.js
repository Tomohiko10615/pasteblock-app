import React, { useState, useEffect, useLayoutEffect, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";
import LoggedHeader from "../LoggedHeader";

export default function Home(props) {
  const { nombre } = useAuth();
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: true,
      swipeEnabled: true,
      tabBarVisible: true,
    });
  }, []);

  return (
    <View>
      <LoggedHeader />
      <Text style={styles.title}>Hola {nombre}</Text>
      <View style={styles.menu}>
        <Button backgroundColor="blue" textColor="white" title="Solicitudes" />
        <Button backgroundColor="blue" textColor="white" title="Servicios" />
      </View>
      <Button backgroundColor="blue" textColor="white" title="Mi perfil" />
      <Button backgroundColor="blue" textColor="white" title="Editar perfil" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 40,
    color: "blue",
  },
  menu: {
    justifyContent: "center",
  },
});
