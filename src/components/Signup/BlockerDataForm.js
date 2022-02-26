import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import UploadImage from "../Uploads/UploadImage";
import mime from "mime";
import BlockerProfile from "./BlockerProfile";
import useReg from "../../hooks/useReg";
import Header from "../Header";
import { Camera } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground, Alert, PermissionsAndroid } from "react-native";
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BlockerDataForm(props) {
  const [photoRoot, setPhotoRoot] = useState("");
  const { reg } = useReg();
  const [photo, setPhoto] = useState(true);
  const [distritos, setDistritos] = useState({});
  const [loading, setLoading] = useState(false);
  //const [startCamera, setStartCamera] = useState(false)
  //const [previewVisible, setPreviewVisible] = useState(false)
  //const [capturedImage, setCapturedImage] = useState(null)
  //const cameraRef = useRef(null)
  //const [isCameraReady, setIsCameraReady] = useState(false);
  //const [ratio, setRatio] = useState(null)

  async function getDistritos() {
    try {
      const url = "https://pasteblock.herokuapp.com/api/distritos/";
      const response = await fetch(url);
      setDistritos(await response.json());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async () => {
      await getDistritos();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let cameraPermission = await Camera.getCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        let cameraPermission = await Camera.requestCameraPermissionsAsync();
        if (!cameraPermission.granted) {
          alert("Debes dar permiso para usar la cámara")
        } else {
          alert("Haz activado los permisos para usar la cámara")
        }
      }
    })();
  }, []);

  /*const __startCamera = async () => {
    /*try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permiso para el uso de la cámara",
          message:
            "El aplicativo SoyBlocker requiere " +
            "acceso a la cámara.",
          buttonNeutral: "Pregúntame luego",
          buttonNegative: "Cancelar",
          buttonPositive: "Permitir"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setStartCamera(true)
      } else {
        Alert.alert("Debes dar permiso para usar la cámara")
      }
    } catch (err) {
      console.warn(err);
    }

    setRatio(await cameraRef.current.getSupportedRatiosAsync())
    console.log(ratio)

    let cameraPermission = await Camera.getCameraPermissionsAsync();
    console.log(cameraPermission)
    if (!cameraPermission.granted) {

      const { status } = await Camera.requestCameraPermissionsAsync()
      //const { status } = await Permissions.askAsync(Permissions.CAMERA);
      console.log(cameraPermission)

      if (status === 'granted') {
        setStartCamera(true)

      } else {
        Alert.alert("Debes dar permiso para usar la cámara")
      }
    } else {
      setStartCamera(true)
    }


  }*/

  /*const CameraPreview = (photo) => {
    console.log('sdsfds', photo)
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1
          }}
        />
      </View>
    )
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };*/

  const handler = (root) => {
    setPhotoRoot(root);
  };

  /*const __takePicture = async () => {
    let cameraPermission = await Camera.getCameraPermissionsAsync();
    console.log(isCameraReady)
    if (cameraPermission.granted && isCameraReady) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };

      try {
        if (cameraRef) {
          console.log("sgdfgaaaajjj")
          const photo = await cameraRef.current.takePictureAsync(options);
          console.log("sgdfgaaaajjj")
          setPreviewVisible(true)
          setCapturedImage(photo)
          setPhotoRoot(photo.uri);
          console.log(photo.uri)
        }

      } catch (err) {
        console.log(err)
      }

    } else {
      return;
    }
  }*/

  const formik = useFormik({
    initialValues: {
      foto: "",
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      setLoading(true);
      console.log(photoRoot);
      let formData = new FormData();

      formData.append("file", {
        uri:
          Platform.OS === "android"
            ? photoRoot.image
            : photoRoot.image.replace("file://", ""),
        name: photoRoot.image.split("/").pop(),
        type: mime.getType(photoRoot.image),
      });
      console.log(formData);
      const url = "https://pasteblock.herokuapp.com/api/blocker/form/" + reg;

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });

        //const response = await axios.post(url, formData);
        const result = await response.json();
        setLoading(false);
        console.log(result);
        if (result) {
          setPhoto(false);
          console.log(photo);
        }
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: "blue",
        height: "100%",

      }}
    >
      <Header />
      <ScrollView
        style={{
          paddingBottom: 15,
          flex: 1
        }}
      >
        <Text style={styles.title}>Registro</Text>
        {photo ? (<Fragment>
          <UploadImage someHandlerProp={handler} />
          <View style={styles.spinner}>
            {loading && <ActivityIndicator size="large" color="white" />}
          </View>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 50
            }}
          >
            <Button
              title="Enviar foto"
              onPress={formik.handleSubmit}
              backgroundColor="white"
              textColor="blue"
            />
          </View>
        </Fragment>) : (
          <BlockerProfile
            blockerId={reg}
            distritos={distritos}
            navigation={props.navigation}
          />)
        }
      </ScrollView>
    </SafeAreaView >
  );
}


function validationSchema() {
  return {};
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
    marginBottom: 15,
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
    marginTop: 10,
    color: "#f00",
  },
  spinner: {
    marginBottom: 15,
  },
});
