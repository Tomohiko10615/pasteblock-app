import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import useReg from "../../hooks/useReg";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import Header from "../Header";

export default function SignupForm() {
  const { signUp } = useReg();
  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
    (async () => {
      let token = await getToken();
      formik.setFieldValue("tokenDispositivo", token);
      console.log(formik.values.tokenDispositivo);
    })();
  }, []);*/

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      setLoading(true);
      delete formik.values["passwordConfirmation"];

      const newUser = formik.values;
      console.log(JSON.stringify(newUser));
      const newBlocker = { usuario: newUser };
      console.log(JSON.stringify(newBlocker));
      try {
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
        setLoading(false);
        console.log(result);
        if (result.id != null) {
          signUp(result.id);
          return result;
        }
      } catch (error) {
        throw error;
      }
    },
  });
  return (
    <View style={{ backgroundColor: "blue", height: "100%" }}>
      <Header />
      <ScrollView>
        <KeyboardAvoidingView >
          <Text style={styles.title}>Registro</Text>
          <TextInput
            placeholder="Nombre"
            style={styles.input}
            value={formik.values.nombre}
            onChangeText={(text) => formik.setFieldValue("nombre", text)}
          />
          {formik.errors.nombre && (
            <Text style={styles.error}>{formik.errors.nombre}</Text>
          )}
          <TextInput
            placeholder="Apellidos"
            style={styles.input}
            value={formik.values.apellido}
            onChangeText={(text) => formik.setFieldValue("apellido", text)}
          />
          {formik.errors.apellido && (
            <Text style={styles.error}>{formik.errors.apellido}</Text>
          )}
          <TextInput
            placeholder="Email"
            style={styles.input}
            autoCapitalize="none"
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue("email", text)}
          />
          {formik.errors.email && (
            <Text style={styles.error}>{formik.errors.email}</Text>
          )}
          <TextInput
            placeholder="Celular"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="numeric"
            value={formik.values.celular}
            onChangeText={(text) => formik.setFieldValue("celular", text)}
          />
          {formik.errors.celular && (
            <Text style={styles.error}>{formik.errors.celular}</Text>
          )}
          <TextInput
            placeholder="Documento de Identidad"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="numeric"
            value={formik.values.documentoIdentidad}
            onChangeText={(text) => formik.setFieldValue("documentoIdentidad", text)}
          />
          {formik.errors.documentoIdentidad && (
            <Text style={styles.error}>{formik.errors.documentoIdentidad}</Text>
          )}
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            value={formik.values.password}
            onChangeText={(text) => formik.setFieldValue("password", text)}
          />
          {formik.errors.password && (
            <Text style={styles.error}>{formik.errors.password}</Text>
          )}
          <TextInput
            placeholder="Confirmar contraseña"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            value={formik.values.passwordConfirmation}
            onChangeText={(text) =>
              formik.setFieldValue("passwordConfirmation", text)
            }
          />
          {formik.errors.passwordConfirmation && (
            <Text style={styles.error}>
              {formik.errors.passwordConfirmation}
            </Text>
          )}
        </KeyboardAvoidingView>
        <View style={styles.spinner}>
          {loading && <ActivityIndicator size="large" color="white" />}
        </View>
        <Button
          title="Registrarse"
          onPress={formik.handleSubmit}
          backgroundColor="white"
          textColor="blue"
        />

      </ScrollView>
    </View >
  );
}

function validationSchema() {
  return {
    nombre: Yup.string().required("Ingrese su nombre"),
    apellido: Yup.string().required("Ingrese sus apellidos"),
    email: Yup.string()
      .email("El email no es válido")
      .required("Ingrese un email"),
    celular: Yup.string()
      .required("Ingrese un número móvil")
      .min(9, "Ingrese un número móvil válido")
      .max(9, "Ingrese un número móvil válido"),
    documentoIdentidad: Yup.string()
      .required("Ingrese su número de documento de identidad")
      .min(8, "Ingrese un documento de identidad válido")
      .max(8, "Ingrese un documento de identidad válido"),
    password: Yup.string()
      .required("Ingrese una contraseña")
      .min(
        8,
        "La contraseña es muy corta, debe tener 8 caracteres como mínimo"
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Las contraseñas deben coincidir"
    ),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 15,
    color: "white",
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    color: "black",
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  error: {
    textAlign: "center",
    marginBottom: 10,
    color: "#f00",
  },
  spinner: {
    marginBottom: 15,
  },
});
