import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Header from "../Header";
import Button from "../Button";
import { Link } from "@react-navigation/native";

import { Keyboard } from 'react-native'


export default function LoginForm() {
  const [error, setError] = useState("");
  const { token, login } = useAuth();
  const [logging, setLogging] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {

      setLogging(true);
      setError("");

      try {
        const response = await fetch(
          "https://pasteblock.herokuapp.com/api/login",
          {
            method: "POST",
            body: JSON.stringify(formik.values),
          }
        );
        const result = await response.json();
        //const token = await getToken();
        setLogging(false);

        if (result.success) {
          login(result.success, result.email, result.nombre, result.context);

          if (token != result.token) {
            const url = "https://pasteblock.herokuapp.com/api/token";
            const usuario = { tokenDispositivo: token };
            console.log(url);
            try {
              const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const resultToken = await response.json();
              return resultToken;
            } catch (error) {
              throw error;
            }
          }
        } else {
          setError("Email o contraseña incorrectos");
        }

        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <View style={{ backgroundColor: "blue", height: "100%" }}>
      <Header />
      <Text style={styles.title}>Blockers</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />

      <Button
        title="Iniciar sesión"
        onPress={() => { Keyboard.dismiss(); formik.handleSubmit() }}
        backgroundColor="white"
        textColor="blue"
      />

      {logging && <View style={styles.spinner} pointerEvents={'none'}>
        <ActivityIndicator size="large" color="blue" /></View>}


      <Text style={styles.error}>{formik.errors.email}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
      <Text style={styles.text}>
        ¿No tienes cuenta?{" "}
        <Link style={styles.link} to="/signup">
          Regístrate aquí
        </Link>
      </Text>
    </View>
  );
}

function validationSchema() {
  return {
    email: Yup.string()
      .email("El email no es válido")
      .required("Ingrese un email"),
    password: Yup.string()
      .required("Ingrese una contraseña")
      .min(
        8,
        "La contraseña es muy corta, debe tener 8 caracteres como mínimo"
      ),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    color: "white",
  },
  input: {
    height: 40,
    marginBottom: 25,
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
  link: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  spinner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: "100%",
    width: "100%",
    zIndex: 3,
    elevation: 3
  },
  error: {
    textAlign: "center",
    marginTop: 20,
    color: "#f00",
  },
});
