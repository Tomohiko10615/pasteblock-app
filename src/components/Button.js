import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const { onPress, title, backgroundColor, textColor } = props;

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: { backgroundColor }.backgroundColor },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: { textColor }.textColor }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: "5%",
    borderRadius: 20,
    elevation: 3,
    width: "60%",
    alignSelf: "center",
    marginBottom: 15,
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    textAlign: "center",
  },
});
