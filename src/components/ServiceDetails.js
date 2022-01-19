import React, { useState, useEffect } from "react";
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
import { RadioButtons, SegmentedControls } from "react-native-radio-buttons";
import Button from "./Button";

export default function ServiceDetails(props) {
  const { serviceItem, serviceDetails } = props;
  const [posting, setPosting] = useState(false);
  const [estadoBlocker, setEstadoBlocker] = useState();
  const [actualizar, setActualizar] = useState();
  const [confirmarCancelacion, setConfirmarCancelacion] = useState();

  const [state, setState] = useState({ selectedOption: "Ninguna" });
  const [stars, setStars] = useState(0);

  const navigation = useNavigation();

  let source = "";
  switch (serviceItem.servicio) {
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

  let infoText = "";
  let successMessage = "";
  switch (serviceDetails) {
    case "culminar":
      infoText =
        "¡Haz dado por finalizado tus labores. Por favor deja una calificación al usuario!";
      successMessage = "Calificación enviada con éxito";
      break;
    case "cancelar":
      infoText =
        "Antes de proceder, por favor comunícate con el usuario para resolver cualquier desacuerdo. Si aún deseas proceder, especifica los motivos del problema.";
      break;
    case "ver":
      infoText = "";
      break;
    case "editar":
      infoText = "";
      break;
    default:
      break;
  }

  useEffect(() => {
    if (serviceDetails == "culminar") {
      setEstadoBlocker(true);
    }
  }, []);

  const options = [
    "No pagó lo acordado",
    "Canceló el trabajo",
    "Otros",
    "Ninguna",
  ];

  const numberStars = [1, 2, 3, 4, 5];

  function setSelectedOption(selectedOption) {
    setState({
      selectedOption,
    });
  }

  function setSelectedStars(selectedStars) {
    setStars({
      selectedStars,
    });
  }

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      let observacionesBlocker = state.selectedOption;
      if (state.selectedOption == "Otros") {
        observacionesBlocker = formik.values.observacionesBlocker;
      }

      setPosting(true);
      try {
        const contratoActualizado = {
          id: serviceItem.id,
          calificacionCliente: stars.selectedStars,
          comentarioBlocker: formik.values.comentarioBlocker,
          observacionesBlocker: observacionesBlocker,
        };

        console.log(JSON.stringify(contratoActualizado));

        const url =
          "https://pasteblock.herokuapp.com/api/contrato?" +
          "estadoBlocker=" +
          estadoBlocker;

        console.log(url);

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(contratoActualizado),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response;
        setPosting(false);
        console.log(result);
        if (result) {
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
    return {
      calificacionCliente: Yup.object().test(
        "rateRequired",
        "Debes calificar al usuario",
        function () {
          return stars.selectedStars > 0;
        }
      ),
      comentarioBlocker: Yup.string().required("Ingrese un comentario"),
    };
  }

  /*<Text style={styles.messageDataText}>Detalles:</Text>
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
        />*/
  return (
    <ScrollView>
      <View style={styles.messageConditionContainer}>
        <Text style={styles.infoText}>{infoText}</Text>
        <View style={styles.rowContainer}>
          <Image style={styles.servImage} source={source} />
          <View>
            <Text style={styles.messageDataText}>
              <Icon name="user" color="white" />
              {"   "} {serviceItem.cliente}
            </Text>
            <Text style={styles.messageDataText}>
              <Icon name="map-marker" color="white" />
              {"   "} {serviceItem.distrito}
            </Text>
          </View>
        </View>
        <Text style={styles.messageDataText}>Observaciones:</Text>
        <View style={styles.segmentedControls}>
          <SegmentedControls
            options={options}
            onSelection={setSelectedOption.bind(this)}
            selectedOption={state.selectedOption}
            optionStyle={{
              fontSize: 11,
              textAlign: "center",
            }}
            optionContainerStyle={{ justifyContent: "center" }}
          />
        </View>
        {state.selectedOption == "Otros" && (
          <TextInput
            placeholder="Escribe tus observaciones."
            style={styles.multilineInput}
            value={formik.values.observacionesBlocker}
            multiline
            numberOfLines={5}
            onChangeText={(text) =>
              formik.setFieldValue("observacionesBlocker", text)
            }
          />
        )}
        <Text style={styles.messageDataText}>Deja tu calificación:</Text>
        <View style={styles.segmentedControls}>
          <SegmentedControls
            options={numberStars}
            onSelection={setSelectedStars.bind(this)}
            selectedOption={stars.selectedStars}
          />
        </View>

        <Text style={styles.messageDataText}>Comentarios:</Text>
        <TextInput
          placeholder="Escribe tus comentarios."
          style={styles.multilineInput}
          value={formik.values.comentarioBlocker}
          multiline
          numberOfLines={5}
          onChangeText={(text) =>
            formik.setFieldValue("comentarioBlocker", text)
          }
        />
        {formik.errors.calificacionCliente ? (
          <Text style={styles.error}>{formik.errors.calificacionCliente}</Text>
        ) : (
          <></>
        )}
        {formik.errors.comentarioBlocker ? (
          <Text style={styles.error}>{formik.errors.comentarioBlocker}</Text>
        ) : (
          <></>
        )}
        <Button
          title="Enviar"
          onPress={() => {
            formik.handleSubmit();
          }}
          backgroundColor="white"
          textColor="blue"
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
  infoText: {
    color: "white",
    textAlignVertical: "center",
    marginVertical: 5,
    marginTop: 10,
    marginHorizontal: 15,
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
  segmentedControls: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
});
