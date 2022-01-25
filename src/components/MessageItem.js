import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";

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

  let buttonLayout = {};

  switch (item.estadoConfirmacionBlocker) {
    case true:
      buttonLayout.title = "Cotizado";
      buttonLayout.onPress = () => {};
      buttonLayout.backgroundColor = "grey";
      break;
    case false:
      buttonLayout.title = "Descartado";
      buttonLayout.onPress = () => {};
      buttonLayout.backgroundColor = "grey";
      break;
    default:
      buttonLayout.title = "Verificar condiciones";
      buttonLayout.onPress = () => showMessageCondition(item);
      buttonLayout.backgroundColor = "green";
      break;
  }

  let status = "";
  let backgroundColor = "";

  switch (item.estadoConfirmacionCliente) {
    case true:
      status = "Confirmado";
      backgroundColor = "green";
      break;
    case false:
      status = "Rechazado";
      backgroundColor = "red";
      break;
    default:
      switch (item.estadoConfirmacionBlocker) {
        case true:
          status = "En espera";
          backgroundColor = "orange";
          break;
        case false:
          status = "Finalizado";
          backgroundColor = "grey";
          break;
        default:
          status = "Nuevo";
          backgroundColor = "#FC4C02";
          break;
      }
      break;
  }

  return (
    <View style={styles.messageContainer}>
      <View style={styles.rowContainer}>
        <Image style={styles.servImage} source={source} />
        <View style={styles.messageDataContainer}>
          <View
            style={{
              ...styles.secondaryContainer,
              ...{ backgroundColor: backgroundColor },
            }}
          >
            <Text style={styles.secondaryText}>{status}</Text>
          </View>

          <Text style={styles.messageDataText}>
            <Icon name="user" color="white" />
            {"   "} {item.cliente}
          </Text>

          <Text style={styles.messageDataText}>
            <Icon name="map-marker" color="white" />
            {"   "} {item.distrito}
          </Text>
          <Text style={styles.messageDataText}>
            <Icon name="phone" color="white" />
            {"   "} {item.celularCliente}
          </Text>
        </View>
      </View>
      <Button
        title={buttonLayout.title}
        onPress={buttonLayout.onPress}
        backgroundColor={buttonLayout.backgroundColor}
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
    marginVertical: 15,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  messageDataContainer: {
    alignItems: "flex-start",
  },
  messageDataText: {
    color: "white",
    marginBottom: 10,
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
  secondaryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: "center",
  },
  secondaryText: {
    textAlign: "center",
    color: "white",
    marginVertical: 5,
    fontSize: 16,
    marginHorizontal: 5,
    width: 120,
  },
});
