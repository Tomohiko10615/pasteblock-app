import React, { useState, useEffect, useLayoutEffect } from "react";
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
import { getStars } from "../utils/Stars";

export default function ServiceDetails(props) {
  const { serviceItem, serviceDetails } = props;
  const [posting, setPosting] = useState(false);
  const [estadoBlocker, setEstadoBlocker] = useState();
  const [actualizar, setActualizar] = useState();
  const [confirmarCancelacion, setConfirmarCancelacion] = useState();

  const [state, setState] = useState({ selectedOption: "Ninguna" });
  const [stars, setStars] = useState(0);

  const [showForm, setShowForm] = useState(false);

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
    case "reportar":
      infoText =
        "Antes de proceder, por favor comunícate con el usuario para resolver cualquier desacuerdo. Si aún deseas proceder, especifica los motivos del problema.";
      successMessage = "Calificación enviada con éxito";
      break;
    case "ver":
      infoText = "";
      break;
    case "editar":
      infoText = "";
      successMessage = "Calificación enviada con éxito";

      break;
    default:
      break;
  }

  useLayoutEffect(() => {
    setActualizar(false);
    if (serviceDetails == "culminar") {
      setEstadoBlocker(true);
    } else if (serviceDetails == "reportar") {
      setEstadoBlocker(false);
    } else if (serviceDetails == "editar") {
      setEstadoBlocker(serviceItem.culminacionBlocker);
      setSelectedStars(serviceItem.calificacionCliente);
      setActualizar(true);
      if (options.includes(serviceItem.observacionesBlocker)) {
        setSelectedOption(serviceItem.observacionesBlocker);
      } else if (serviceItem.observacionesBlocker == "") {
        setSelectedOption("Ninguna");
      } else {
        setSelectedOption("Otros");
      }
    }

    if (serviceDetails != "ver") {
      setShowForm(true);
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
    initialValues: {
      comentarioBlocker: serviceItem.comentarioBlocker,
      observacionesBlocker: serviceItem.observacionesBlocker,
    },
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
        console.log(actualizar);
        const url =
          "https://pasteblock.herokuapp.com/api/contrato?" +
          "estadoBlocker=" +
          estadoBlocker +
          "&actualizar=" +
          actualizar;

        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(contratoActualizado),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response;
        setPosting(false);
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

  return (
    <ScrollView>
      <View style={styles.messageConditionContainer}>
        {infoText != "" && <Text style={styles.infoText}>{infoText}</Text>}
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
        {serviceDetails == "ver" && (
          <>
            <View style={styles.container}>
              <Text style={styles.messageDataText}>
                Calificación de parte del cliente:
              </Text>
              <View style={styles.rowContainer}>
                {getStars(serviceItem.calificacionBlocker)}
              </View>
            </View>
            <Text style={styles.messageDataText}>
              Comentarios de parte del cliente:
            </Text>
            <View style={styles.secondaryContainer}>
              <Text style={styles.secondaryText}>
                {serviceItem.comentarioCliente}
              </Text>
            </View>

            <View style={styles.container}>
              <Text style={styles.messageDataText}>
                Calificación otorgada al cliente:
              </Text>
              <View style={styles.rowContainer}>
                {getStars(serviceItem.calificacionCliente)}
              </View>
            </View>
            <Text style={styles.messageDataText}>
              Comentarios para el cliente:
            </Text>
            <View style={styles.secondaryContainer}>
              <Text style={styles.secondaryText}>
                {serviceItem.comentarioBlocker}
              </Text>
            </View>
          </>
        )}
        {showForm && (
          <>
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
            <Text style={styles.messageDataText}>
              Deja tu calificación <Icon name="star" color="white" />
            </Text>
            <View style={styles.segmentedControls}>
              <SegmentedControls
                options={numberStars}
                onSelection={setSelectedStars.bind(this)}
                selectedOption={stars.selectedStars}
                stars={true}
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
              <Text style={styles.error}>
                {formik.errors.calificacionCliente}
              </Text>
            ) : (
              <></>
            )}
            {formik.errors.comentarioBlocker ? (
              <Text style={styles.error}>
                {formik.errors.comentarioBlocker}
              </Text>
            ) : (
              <></>
            )}
            <View>
              {posting && <ActivityIndicator size="large" color="white" />}
            </View>
            <Button
              title="Enviar"
              onPress={() => {
                formik.handleSubmit();
              }}
              backgroundColor="white"
              textColor="blue"
              style={styles.button}
            />
          </>
        )}
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
    paddingVertical: 10,
  },
  infoText: {
    color: "white",
    textAlignVertical: "center",
    marginVertical: 5,
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
    alignSelf: "center",
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
    margin: 5,
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
