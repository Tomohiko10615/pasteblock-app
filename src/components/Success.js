import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./Header";
import Button from "./Button";

export default function Success(props) {
  const { navigation, successMessage } = props;
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>{successMessage}</Text>
      <Button
        onPress={() => navigation.navigate("Inicio")}
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
