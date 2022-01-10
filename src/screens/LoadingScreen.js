import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View>
      <Text style={styles.title}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    color: "blue",
    justifyContent: "center",
  },
});
