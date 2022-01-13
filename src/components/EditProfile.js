import React, { useEffect, useCallback, useState } from "react";
import { LogBox } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";

import Checkbox from "expo-checkbox";

import Button from "./Button";

import useReg from "../hooks/useReg";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import UploadImage from "./Uploads/UploadImage";

export default function EditProfile(props) {
  const { profileData, blocker, distritos, servicios } = props;

  const { profileEdit } = useReg();

  const navigation = useNavigation();

  const route = useRoute();

  const hostUrl = "https://pasteblock.herokuapp.com/uploads/";

  const imgUrl = hostUrl + blocker.foto;

  const [photoRoot, setPhotoRoot] = useState("");

  const [listaDistritos, setListaDistritos] = useState("");

  useEffect(() => {
    console.log(distritos);
  }, [blocker]);

  const [isServ1, setServ1] = useState(false);
  const [isServ2, setServ2] = useState(false);
  const [isServ3, setServ3] = useState(false);
  const [isServ4, setServ4] = useState(false);

  useEffect(() => {
    (async () => {
      for (let i = 0; i < servicios.length; i++) {
        switch (servicios[i]) {
          case "Albañilería":
            setServ1(true);
            break;
          case "Pintura":
            setServ2(true);
            break;
          case "Electricidad":
            setServ3(true);
            break;
          case "Gasfitería":
            setServ4(true);
            break;
          default:
            break;
        }
      }
    })();
  }, [servicios]);

  const [newServicios, setNewServicios] = useState([
    isServ1,
    isServ2,
    isServ3,
    isServ4,
  ]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        profileEdit(false);
      };
      return () => unsubscribe();
    }, [navigation])
  );

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  useEffect(() => {
    (async () => {
      setNewServicios([isServ1, isServ2, isServ3, isServ4]);
    })();
  }, [isServ1, isServ2, isServ3, isServ4]);

  const handler = (root) => {
    setPhotoRoot(root);
  };

  async function getDistritos() {
    try {
      const url = "https://pasteblock.herokuapp.com/api/distritos/";
      const response = await fetch(url);
      setListaDistritos(await response.json());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async () => {
      await getDistritos();
    })();
  }, []);

  const initialCheckedDistritos = [];

  const [checkedDistritos, setCheckedDistritos] = useState(
    initialCheckedDistritos
  );

  useEffect(() => {
    for (let item of listaDistritos) {
      if (distritos.includes(item.nombre)) {
        initialCheckedDistritos.push(true);
      } else {
        initialCheckedDistritos.push(false);
      }
    }
    setCheckedDistritos(initialCheckedDistritos);
  }, [listaDistritos]);

  var blockerServicios = [];
  var blockerDistritos = [];

  const getListaDistritos = (listaDistritos) => {
    let content = [];
    for (let item of listaDistritos) {
      content.push(
        <View style={styles.distritosRow} key={item.id + item.nombre}>
          <Text style={styles.distritoText} key={item.nombre}>
            {item.nombre}
          </Text>
          <Checkbox
            style={styles.distritoCheckbox}
            value={checkedDistritos[item.id - 1]}
            onValueChange={() => {
              checkedDistritos[item.id - 1] = !checkedDistritos[item.id - 1];
              setCheckedDistritos(checkedDistritos);
              rerender(!render);
              console.log(listaDistritos);
            }}
            key={item.id}
          />
        </View>
      );
    }
    return content;
  };

  const [render, rerender] = useState(false);

  const formik = useFormik({
    initialValues: {
      presentacion: blocker.presentacion,
      celular: profileData.celular,
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
    <>
      <View style={styles.photoContainer}>
        <UploadImage someHandlerProp={handler} photoUri={imgUrl} />
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Presentación:</Text>
        <TextInput
          placeholder="Presentacion"
          style={styles.input}
          value={formik.values.presentacion}
          multiline
          numberOfLines={5}
          onChangeText={(text) => formik.setFieldValue("presentacion", text)}
        />

        <Text style={styles.text}>Servicios:</Text>
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

        <Text style={styles.text}>Distritos:</Text>
        <View style={styles.distritosMainContainer}>
          {getListaDistritos(listaDistritos)}
        </View>
        <Text style={styles.text}>Celular:</Text>
        <TextInput
          style={styles.phoneInput}
          value={formik.values.celular}
          onChangeText={(text) => formik.setFieldValue("celular", text)}
          keyboardType="numeric"
        />

        <Button
          title="Actualizar perfil"
          onPress={formik.handleSubmit}
          backgroundColor="white"
          textColor="blue"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "blue",
    width: "80%",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 40,
    alignSelf: "center",
    paddingVertical: 10,
  },
  container: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  secondaryContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  photoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 15,
  },
  photoText: {
    color: "blue",
  },
  itemContainer: {
    width: "50%",
  },
  flatListItem: {
    color: "blue",
    fontSize: 11,
    marginHorizontal: 15,
    marginVertical: 2,
  },
  text: {
    textAlign: "left",
    color: "white",
    marginBottom: 10,
    marginHorizontal: 15,
    fontSize: 15,
  },
  secondaryText: {
    textAlign: "left",
    color: "blue",
    marginVertical: 15,
    marginHorizontal: 15,
    height: 80,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
    overflow: "hidden",
    margin: 15,
    borderColor: "blue",
    borderWidth: 2,
  },
  input: {
    height: 200,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    color: "blue",
    textAlignVertical: "top",
  },
  phoneInput: {
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    color: "blue",
    paddingHorizontal: 10,
  },

  serviciosContainer: {
    width: "90%",
    alignSelf: "center",
    alignContent: "center",
    flex: 1,
  },
  elementContainer: {
    flexDirection: "row",
    marginBottom: 5,
    marginHorizontal: 10,
    width: "45%",
    flex: 1,
  },

  checkbox: {
    backgroundColor: "white",
    color: "black",
    alignSelf: "flex-end",
  },
  label: {
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

  distritosRow: {
    width: "45%",
    alignSelf: "center",
    flexDirection: "row",
    marginRight: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  distritoText: {
    color: "white",
    fontSize: 12,
    width: "80%",
  },
  distritoCheckbox: {
    alignSelf: "flex-end",
    backgroundColor: "white",
  },
});
