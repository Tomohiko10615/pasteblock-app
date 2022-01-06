import React, {Fragment, useState, useEffect} from 'react'
import { StyleSheet, TextInput, View, Text } from "react-native";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import Checkbox from 'expo-checkbox';

export default function BlockerProfile(props) {
    const { blockerId } = props;
    const [isServ1, setServ1] = useState(false);
    const [isServ2, setServ2] = useState(false);
    const [isServ3, setServ3] = useState(false);
    const [isServ4, setServ4] = useState(false);

const [servicios, setServicios] = useState([isServ1, isServ2, isServ3, isServ4]);
var blockerServicios = [];

useEffect(() => {
    (async () => {
        
        setServicios([isServ1, isServ2, isServ3, isServ4]);

    })();
  }, [isServ1, isServ2, isServ3, isServ4]);

    const formik = useFormik({
        initialValues: {
          presentacion: "",
          servicios: {},
        },
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
    
        onSubmit: async () => {
          try {




for (let i = 0; i < servicios.length; i++) {
    if (servicios[i]) {
      blockerServicios.push({"id": i + 1})
    }

    
    }
    console.log(blockerServicios)
    const blocker = {"id": blockerId, "servicios": blockerServicios, "presentacion": formik.values.presentacion};
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
            console.log(result);
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
      <View style={styles.container}><View style={styles.container}><Text style={styles.label}>Albañilería</Text><Checkbox style={styles.checkbox} value={isServ1} onValueChange={setServ1}/>
      </View>
      
    <View style={styles.container}>
    <Text style={styles.label}>Pintura</Text><Checkbox style={styles.checkbox} value={isServ2} onValueChange={setServ2}/></View>
    </View>
    <View style={styles.container}><View style={styles.container}><Text style={styles.label}>Electricidad</Text><Checkbox style={styles.checkbox} value={isServ3} onValueChange={setServ3}/>
    </View>
    <View style={styles.container}><Text style={styles.label}>Gasfitería</Text><Checkbox style={styles.checkbox} value={isServ4} onValueChange={setServ4}/>
    </View></View>
    
      <Button
        title="Completar perfil"
        onPress={formik.handleSubmit}
        backgroundColor="white"
        textColor="blue"
      />
      {formik.errors.presentacion ? (
        <Text style={styles.error}>{formik.errors.presentacion}</Text>
      ) : (
        <Fragment></Fragment>
      )}
      
        </Fragment>
    )
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
      textAlignVertical: 'top',
    },
    container: {
        flexDirection: "row",
        alignContent: "space-between",
        alignSelf: "center",
        marginBottom: 5,
        marginRight: 5,
      },
    checkbox: {
        marginBottom: 15,
        backgroundColor: "white",
        alignSelf: "center",
        color: "black",
      },
      label: {
        marginBottom: 15,
        alignSelf: "center",
        color: "white",
        marginRight: 5,
      },

    error: {
      textAlign: "center",
      marginTop: 10,
      color: "#f00",
    },
  });
  