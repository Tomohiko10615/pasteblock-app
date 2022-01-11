import { View, Text, StyleSheet } from "react-native";
import Header from "./Header";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function Success(props) {
  const { successMessage, redirect } = props;
  const { logout, isLoggingOut } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>{successMessage}</Text>
      <Button
        onPress={
          isLoggingOut
            ? () => logout(false)
            : () => navigation.navigate(redirect)
        }
        title="Volver al inicio"
        backgroundColor="white"
        textColor="blue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    height: "100%",
  },

  text: {
    textAlign: "center",
    color: "white",
    textAlignVertical: "center",
    height: "50%",
    fontSize: 25,
  },
});
