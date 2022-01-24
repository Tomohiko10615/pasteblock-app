import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { getStars } from "../utils/Stars";

export default function ServiceItem(props) {
  const { item, showServiceDetails } = props;
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
            <Icon name="user" color="white" />
            {"   "} {item.cliente}
          </Text>

          <Text style={styles.messageDataText}>
            <Icon name="map-marker" color="white" />
            {"   "} {item.distrito}
          </Text>

          <Text style={styles.messageDataText}>
            <Icon name="dollar" color="white" />
            {"   "} S/.{item.costoFinal}
          </Text>
          <View style={styles.starsContainer}>
            <Icon name="comment-o" color="white" />
            <Text>{"   "}</Text>
            {getStars(item.calificacionBlocker)}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {!item.culminacionBlocker ? (
          <>
            <Button
              title="Culminar trabajo"
              onPress={() => {
                showServiceDetails(item, "culminar");
              }}
              backgroundColor="white"
              textColor="blue"
              style={{ ...styles.button, width: 120 }}
            />
            <Button
              title="Reportar"
              onPress={() => {
                showServiceDetails(item, "reportar");
              }}
              backgroundColor="red"
              textColor="white"
              style={styles.button}
            />
          </>
        ) : (
          <>
            <Button
              title="Ver comentarios"
              onPress={() => {
                showServiceDetails(item, "ver");
              }}
              backgroundColor="white"
              textColor="blue"
              style={styles.button}
            />
            {!item.haFinalizado && (
              <Button
                title="Modificar calificaciones"
                onPress={() => {
                  showServiceDetails(item, "editar");
                }}
                backgroundColor="white"
                textColor="blue"
                style={styles.button}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: "blue",
    borderRadius: 30,
    marginVertical: 30,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
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
  starsContainer: {
    flexDirection: "row",
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
  buttonContainer: {
    marginTop: 15,
  },
  secondaryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: "center",
    width: "100%",
  },
  secondaryText: {
    textAlign: "center",
    color: "white",
    marginVertical: 5,
    fontSize: 16,
    marginHorizontal: 5,
  },
});
