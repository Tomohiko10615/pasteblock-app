import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";

export default function MessageItem(props) {
  const { item, showMessageCondition } = props;
  let source = "";
  switch (item.servicio) {
    case "Albañilería":
      source = require("../../assets/serv1.png");
      break;
    case "Pintura":
      source = require("../../assets/serv2.png");
      break;
    case "Electricidad":
      source = require("../../assets/serv3.png");
      break;
    case "Gasfitería":
      source = require("../../assets/serv4.png");
      break;
    default:
      break;
  }

  return (
    <View style={styles.messageContainer}>
      <View style={styles.rowContainer}>
        <Image style={styles.servImage} source={source} />
        <View style={styles.messageDataContainer}>
          <Text style={styles.messageDataText}>
            Solicitante: {item.cliente}
          </Text>
          <Text style={styles.messageDataText}>Distrito: {item.distrito}</Text>
          <Text style={styles.messageDataText}>Servicio: {item.servicio}</Text>
        </View>
      </View>
      <Button
        title="Verificar condiciones"
        onPress={() => showMessageCondition(item)}
        backgroundColor="green"
        textColor="white"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "blue",
    borderRadius: 30,
    marginBottom: 15,
    marginVertical: 30,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  messageDataText: {
    color: "white",
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  servImage: {
    width: 60,
    height: 60,
    alignSelf: "flex-start",
    margin: 15,
    backgroundColor: "white",
    borderRadius: 30,
  },
  button: {
    textAlign: "center",
    paddingHorizontal: 12,
  },
});
