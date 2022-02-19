import React, { Fragment, useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";

import useReg from "../../hooks/useReg";
import Checkbox from "expo-checkbox";
import DropDownPicker from "react-native-dropdown-picker";

export default function BlockerProfile(props) {
  const { blockerId, navigation, distritos } = props;

  const { signUp } = useReg();

  const [loading, setLoading] = useState(false);

  const [isServ1, setServ1] = useState(false);
  const [isServ2, setServ2] = useState(false);
  const [isServ3, setServ3] = useState(false);
  const [isServ4, setServ4] = useState(false);

  const [servicios, setServicios] = useState([
    isServ1,
    isServ2,
    isServ3,
    isServ4,
  ]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  const distritosList = []

  useEffect(() => {
    for (const [key, value] of Object.entries(distritos)) {
        distritosList.push({
            label: value.nombre, value: value.id
        })
    }
    setItems(distritosList);

}, [distritos]);

  /*const initialCheckedDistritos = [];
  for (let item of distritos) {
    item.checked = false;
    initialCheckedDistritos.push(item.checked);
  }

  const [checkedDistritos, setCheckedDistritos] = useState(
    initialCheckedDistritos
  );*/

  //var tempCheckedDistritos = checkedDistritos;

  var blockerServicios = [];
  //var blockerDistritos = [];

  useEffect(() => {
    (async () => {
      setServicios([isServ1, isServ2, isServ3, isServ4]);
    })();
  }, [isServ1, isServ2, isServ3, isServ4]);

  //useEffect(() => {}, [checkedDistritos]);


  /*const getDistritos = (distritos) => {
    let content = [];
    for (let item of distritos) {
      content.push(
        <View style={styles.distritos} key={item.id + item.nombre}>
          <Text style={styles.distrito} key={item.nombre}>
            {item.nombre}
          </Text>
          <Checkbox
            style={styles.distritoCheckbox}
            value={checkedDistritos[item.id - 1]}
            onValueChange={() => {
              checkedDistritos[item.id - 1] = !checkedDistritos[item.id - 1];
              setCheckedDistritos(checkedDistritos);
              rerender(!render);
              console.log(distritos);
            }}
            key={item.id}
          />
        </View>
      );
    }
    return content;
  };*/

  const formik = useFormik({
    initialValues: {
      presentacion: "",
      servicios: {},
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      setLoading(true);
      try {
        for (let i = 0; i < servicios.length; i++) {
          if (servicios[i]) {
            blockerServicios.push({ id: i + 1 });
          }
        }

        const blockerDistritos = [];

        console.log(value)
        for (let i = 0; i < value.length; i++) {
          blockerDistritos.push({id: value[i], nombre: distritos[value[i] - 1].nombre});
        }
        console.log(blockerDistritos)

        const blocker = {
          id: blockerId,
          servicios: blockerServicios,
          presentacion: formik.values.presentacion,
          distritos: blockerDistritos,
        };
        const response = await fetch(
          "https://pasteblock.herokuapp.com/api/blocker/form",
          {
            method: "POST",
            body: JSON.stringify(blocker),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setLoading(false);
        if (result) {
          signUp(undefined);
          navigation.navigate("Success", {
            successMessage: "Se ha registrado con éxito",
            redirect: "Login",
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
      presentacion: Yup.string().required("Ingrese su presentación"),
      servicios: Yup.object()
        .test(
          "oneOfRequired",
          "Debes seleccionar al menos un servicio",
          function () {
            return isServ1 || isServ2 || isServ3 || isServ4;
          }
        )
        .test(
          "forbiddenAll",
          "No puedes seleccionar todos los servicios",
          function () {
            return !(isServ1 && isServ2 && isServ3 && isServ4);
          }
        ),
    };
  }
  return (
    <Fragment>
      <TextInput
        placeholder="Presentacion"
        style={styles.input}
        value={formik.values.presentacion}
        multiline
        numberOfLines={5}
        onChangeText={(text) => formik.setFieldValue("presentacion", text)}
      />
      <Text style={styles.title}>Servicios</Text>
      <View style={styles.serviciosContainer}>
        <View style={styles.container}>
          <View style={styles.elementContainer}>
            <Text style={styles.label}>Albañilería</Text>
            <Checkbox
              style={styles.checkbox}
              value={isServ1}
              onValueChange={setServ1}
            />
          </View>

          <View style={styles.elementContainer}>
            <Text style={styles.label}>Pintura</Text>
            <Checkbox
              style={styles.checkbox}
              value={isServ2}
              onValueChange={setServ2}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.elementContainer}>
            <Text style={styles.label}>Electricidad</Text>
            <Checkbox
              style={styles.checkbox}
              value={isServ3}
              onValueChange={setServ3}
            />
          </View>
          <View style={styles.elementContainer}>
            <Text style={styles.label}>Gasfitería</Text>
            <Checkbox
              style={styles.checkbox}
              value={isServ4}
              onValueChange={setServ4}
            />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Distritos</Text>
      <DropDownPicker
      multiple={true}
      min={1}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      listMode="SCROLLVIEW"
      style={styles.drop}
      placeholder="Selecciona un distrito"
      searchable={true}
      language="ES"
      mode="BADGE"
      maxHeight={400}
      closeOnBackPressed={true}
      bottomOffset={100}
      itemSeparator={true}
    />


      {/*<View style={styles.distritosMainContainer}>
        {getDistritos(distritos)}
  </View>*/}
      {formik.errors.presentacion ? (
        <Text style={styles.error}>{formik.errors.presentacion}</Text>
      ) : (
        <Fragment></Fragment>
      )}
      {formik.errors.servicios ? (
        <Text style={styles.error}>{formik.errors.servicios}</Text>
      ) : (
        <Fragment></Fragment>
      )}
      <View style={styles.spinner}>
        {loading && <ActivityIndicator size="large" color="white" />}
      </View>
      <Button
        title="Completar perfil"
        onPress={formik.handleSubmit}
        backgroundColor="white"
        textColor="blue"
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
    color: "white",
  },
  input: {
    height: 200,
    marginBottom: 20,
    borderWidth: 1,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    color: "black",
    textAlignVertical: "top",
  },
  drop: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
    width: "80%",
    alignSelf: "center",
    color: "black",
    textAlignVertical: "center",
  },
  serviciosContainer: {
    width: "80%",
    alignSelf: "center",
    flex: 1,
  },
  container: {
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 5,
    width: "80%",
    alignSelf: "center",
  },
  elementContainer: {
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 25,
    width: "40%",
    flex: 1,
  },
  checkbox: {
    marginBottom: 15,
    backgroundColor: "white",
    color: "black",
    alignSelf: "flex-end",
  },
  label: {
    marginBottom: 15,
    color: "white",
    marginRight: 5,
    alignSelf: "flex-start",
    width: "80%",
    flex: 1,
  },

  distritosMainContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "center",
    marginBottom: 15,
  },

  distritos: {
    width: "45%",
    alignSelf: "center",
    flexDirection: "row",
    marginRight: 5,
    marginBottom: 10,
    alignItems: "center",
  },

  distrito: {
    color: "white",
    fontSize: 12,
    width: "80%",
  },
  distritoCheckbox: {
    alignSelf: "flex-end",
    backgroundColor: "white",
  },

  error: {
    textAlign: "center",
    marginBottom: 15,
    color: "#f00",
  },
  spinner: {
    marginBottom: 15,
  },
});
