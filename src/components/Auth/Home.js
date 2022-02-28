import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";
import LoggedHeader from "../LoggedHeader";
import useReg from "../../hooks/useReg";

export default function Home(props) {
  const { nombre, token, JWTtoken } = useAuth();
  const { navigation } = props;
  const { profileEdit } = useReg();

console.log(JWTtoken)



  return (
    <View>
      <LoggedHeader />
      <Text style={styles.title}>Hola {nombre}</Text>
      <View style={styles.menu}>
        <Button
          backgroundColor="blue"
          textColor="white"
          title="Solicitudes"
          onPress={() => {
            navigation.navigate("MessageStack");
          }}
        />
        <Button
          backgroundColor="blue"
          textColor="white"
          title="Servicios"
          onPress={() => {
            navigation.navigate("ServiceStack");
          }}
        />
      </View>
      <Button
        backgroundColor="blue"
        textColor="white"
        title="Mi perfil"
        onPress={() => {
          profileEdit(false);
          navigation.navigate("ProfileStack");
        }}
      />
      <Button
        backgroundColor="blue"
        textColor="white"
        title="Editar perfil"
        onPress={() => {
          profileEdit(true);
          navigation.navigate("ProfileStack");
        }}
      />
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
