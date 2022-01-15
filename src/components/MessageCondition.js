import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function MessageCondition(props) {
  const { messageItem } = props;
  let source = "";
  switch (messageItem.servicio) {
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

  const formik = useFormik({
    initialValues: {
      mensajeBlocker: messageItem.mensajeBlocker,
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      try {
        for (let i = 0; i < 4; i++) {
          if (newServicios[i]) {
            blockerServicios.push({ id: i + 1 });
          }
        }
        console.log(distritos);
        for (let i = 0; i < listaDistritos.length; i++) {
          if (checkedDistritos[i]) {
            blockerDistritos.push(listaDistritos[i]);
          }
        }
        console.log(blockerDistritos);

        const newBlocker = {
          id: blocker.id,
          servicios: blockerServicios,
          presentacion: formik.values.presentacion,
          distritos: blockerDistritos,
          usuario: { celular: formik.values.celular },
        };
        const response = await fetch(
          "https://pasteblock.herokuapp.com/api/blocker/form",
          {
            method: "POST",
            body: JSON.stringify(newBlocker),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result) {
          navigation.navigate("Success", {
            successMessage: "Su perfil se ha actualizado con éxito",
            redirect: "Home",
          });
        }
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  function validationSchema() {
    return {};
  }

  return (
    <ScrollView>
      <View style={styles.messageConditionContainer}>
        <View style={styles.rowContainer}>
          <Image style={styles.servImage} source={source} />
          <View>
            <Text style={styles.messageDataText}>
              Solicitante: {messageItem.cliente}
            </Text>
            <Text style={styles.messageDataText}>
              Distrito: {messageItem.distrito}
            </Text>
            <Text style={styles.messageDataText}>
              Teléfono: {messageItem.celularCliente}
            </Text>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.messageDataText}>Detalles:</Text>
        </View>
        <View style={styles.secondaryContainer}>
          <Text style={styles.secondaryText}>{messageItem.mensajeCliente}</Text>
        </View>
        <Text style={styles.messageDataText}>Respuesta:</Text>
        <TextInput
          placeholder="Escribe una respuesta."
          style={styles.multilineInput}
          value={formik.values.mensajeBlocker}
          multiline
          numberOfLines={5}
          onChangeText={(text) => formik.setFieldValue("mensajeBlocker", text)}
        />
        <View style={styles.rowContainer}>
          <Text style={styles.messageDataText}>Tiempo estimado:</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={formik.values.tiempoEstimado}
            onChangeText={(text) =>
              formik.setFieldValue("tiempoEstimado", text)
            }
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.messageDataText}>Costo:</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={formik.values.costo}
            onChangeText={(text) => formik.setFieldValue("costo", text)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  messageConditionContainer: {
    backgroundColor: "blue",
    borderRadius: 30,
    marginVertical: 15,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  messageDataText: {
    color: "white",
    marginBottom: 5,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 15,
    marginHorizontal: 15,
    height: 80,
  },
  secondaryText: {
    textAlign: "left",
    color: "blue",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  servImage: {
    width: 60,
    height: 60,
    alignSelf: "flex-start",
    margin: 15,
    backgroundColor: "white",
    borderRadius: 30,
  },
  multilineInput: {
    height: 80,
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    color: "blue",
    textAlignVertical: "top",
  },
  input: {
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    width: "40%",
    alignSelf: "center",
    color: "black",
    alignSelf: "flex-end",
  },
});
