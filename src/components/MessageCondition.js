import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Icon from "react-native-vector-icons/FontAwesome";

import Button from "./Button";

export default function MessageCondition(props) {
  const { messageItem } = props;
  const [accepted, setAccepted] = useState(undefined);
  const [posting, setPosting] = useState(false);
  const navigation = useNavigation();
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
      id: messageItem.id,
      mensajeBlocker: "",
      estadoConfirmacionBlocker: accepted,
      tiempoEstimado: "",
      costo: "",
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      setPosting(true);
      try {
        const newMensaje = {
          id: messageItem.id,
          mensajeBlocker: formik.values.mensajeBlocker,
          mensajeCliente: messageItem.mensajeCliente,
          estadoConfirmacionBlocker: accepted,
          tiempoEstimado: formik.values.tiempoEstimado,
          costo: formik.values.costo,
        };
        const response = await fetch(
          "https://pasteblock.herokuapp.com/api/enviar",
          {
            method: "POST",
            body: JSON.stringify(newMensaje),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setPosting(false);
        if (result) {
          let successMessage = "";
          if (accepted) {
            successMessage =
              "Haz cotizado el trabajo, te notificaremos cuando el usuario confirme. Hasta que eso suceda no tienes ningún compromiso.";
          } else {
            successMessage = "Haz rechazado el trabajo.";
          }
          navigation.navigate("Success", {
            successMessage: successMessage,
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
    if (accepted) {
      return {
        tiempoEstimado: Yup.number()
          .integer("Ingrese un valor entero de días")
          .required("Ingrese el tiempo estimado")
          .min(1, "Ingrese un valor entre 1 a 5 días")
          .max(5, "Ingrese un valor entre 1 a 5 días"),
        costo: Yup.number().required("Ingrese el costo estimado"),
      };
    } else {
      return {};
    }
  }

  return (
    <ScrollView>
      <View style={styles.messageConditionContainer}>
        <View style={styles.rowContainer}>
          <Image style={styles.servImage} source={source} />
          <View>
            <Text style={styles.messageDataText}>
              <Icon name="user" color="white" />
              {"   "} {messageItem.cliente}
            </Text>

            <Text style={styles.messageDataText}>
              <Icon name="map-marker" color="white" />
              {"   "} {messageItem.distrito}
            </Text>
            <Text style={styles.messageDataText}>
              <Icon name="phone" color="white" />
              {"   "} {messageItem.celularCliente}
            </Text>
          </View>
        </View>
        <Text style={styles.messageDataText}>Detalles:</Text>
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
        <View style={styles.inputRowContainer}>
          <Text style={styles.inputDataText}>Tiempo estimado:</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={formik.values.tiempoEstimado}
            onChangeText={(text) =>
              formik.setFieldValue("tiempoEstimado", text)
            }
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRowContainer}>
          <Text style={styles.inputDataText}>Costo estimado:</Text>
          <TextInput
            placeholder=""
            style={styles.input}
            value={formik.values.costo}
            onChangeText={(text) => formik.setFieldValue("costo", text)}
            keyboardType="numeric"
          />
        </View>
        {formik.errors.tiempoEstimado ? (
          <Text style={styles.error}>{formik.errors.tiempoEstimado}</Text>
        ) : (
          <></>
        )}
        {formik.errors.costo ? (
          <Text style={styles.error}>{formik.errors.costo}</Text>
        ) : (
          <></>
        )}
        <View>
          {posting && <ActivityIndicator size="large" color="white" />}
        </View>
        <Button
          title="Cotizar"
          onPress={() => {
            setAccepted(true);
            formik.handleSubmit();
          }}
          backgroundColor="green"
          textColor="white"
          style={styles.button}
        />
        <Button
          title="Rechazar"
          onPress={() => {
            setAccepted(false);
            formik.handleSubmit();
          }}
          backgroundColor="red"
          textColor="white"
          style={styles.button}
        />
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
    textAlignVertical: "center",
    marginVertical: 5,
    marginHorizontal: 15,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  inputRowContainer: {
    flexDirection: "row",
    marginBottom: 15,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  inputDataText: {
    color: "white",
    marginBottom: 5,
    textAlignVertical: "center",
    width: "50%",
  },
  secondaryContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 10,
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
    height: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
    width: "50%",
  },
  button: {
    textAlign: "center",
    paddingHorizontal: 12,
  },
  error: {
    textAlign: "center",
    marginBottom: 10,
    color: "#f00",
  },
});
