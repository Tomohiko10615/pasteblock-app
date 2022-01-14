import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Inbox(props) {
  const { messageData, setMessageData } = props;
  const [offset, setOffset] = useState(0);

  async function getMoreMessages(offset) {
    try {
      const url =
        "https://pasteblock.herokuapp.com/api/blocker/inbox?inicio=" + offset;
      const response = await fetch(url);
      setMessageData(messageData.concat(await response.json()));
    } catch (e) {
      console.log(e);
    }
  }

  const getListaMensajes = (messageData) => {
    let content = [];

    let source = "";

    console.log(offset);

    for (let item of messageData) {
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

      content.push(
        <View style={styles.messageContainer} key={"cn" + item.id}>
          <View style={styles.rowContainer}>
            <Image style={styles.servImage} source={source} />
            <View style={styles.messageDataContainer}>
              <Text style={styles.messageDataText} key={item.id}>
                Solicitante: {item.cliente}
              </Text>
              <Text style={styles.messageDataText} key={"d" + item.id}>
                Distrito: {item.distrito}
              </Text>
              <Text style={styles.messageDataText} key={"s" + item.id}>
                Servicio: {item.servicio}
              </Text>
            </View>
          </View>
          <Button
            title="Verificar condiciones"
            onPress={() => {}}
            backgroundColor="green"
            textColor="white"
            style={styles.button}
          />
        </View>
      );
    }
    return content;
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <Text style={styles.secondaryText}>Solicitudes</Text>
      </View>
      <View>{getListaMensajes(messageData)}</View>
      <Button
        title="Ver más mensajes"
        onPress={() => {
          setOffset(offset + 3);
          getMoreMessages(offset);
        }}
        backgroundColor="blue"
        textColor="white"
        style={styles.button}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "flex-start",
    flex: 1,
  },
  secondaryContainer: {
    backgroundColor: "blue",
    borderRadius: 30,
    marginBottom: 15,
    marginVertical: 30,
    width: "60%",
    alignSelf: "center",
    paddingVertical: 15 / 2,
  },
  secondaryText: {
    textAlign: "center",
    color: "white",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
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
