import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import UploadImage from "../Uploads/UploadImage";
import mime from "mime";
import axios from "axios";
import BlockerProfile from "./BlockerProfile";
import useReg from "../../hooks/useReg";
import Header from "../Header";
import { Camera } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground, Alert } from "react-native";
import { useRef } from "react";

export default function BlockerDataForm(props) {
  const [photoRoot, setPhotoRoot] = useState("");
  const { reg } = useReg();
  const [photo, setPhoto] = useState(true);
  const [distritos, setDistritos] = useState({});
  const [loading, setLoading] = useState(false);
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const cameraRef = useRef(null)


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

  /*useEffect(() => {
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
  }, []);*/

  const __startCamera = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync()
    if (granted) {
      Alert.alert("Haz activado los permisos para usar la cámara")
      setStartCamera(true)
    } else {
      Alert.alert("Debes dar permiso para usar la cámara")
    }
  }

  const CameraPreview = (photo) => {
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

  const handler = (root) => {
    setPhotoRoot(root);
  };

  const __takePicture = async () => {
    let cameraPermission = await Camera.getCameraPermissionsAsync();
    if (cameraPermission.granted) {
      const photo = await cameraRef.current.takePictureAsync();
      setPreviewVisible(true)
      setCapturedImage(photo)
    } else {
      return;
    }


  }

  const formik = useFormik({
    initialValues: {
      foto: "",
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      setLoading(true);
      console.log("afdg");
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
    <View
      style={{
        backgroundColor: "blue",
        height: "100%",
      }}
    >
      <Header />
      <ScrollView
        style={{
          paddingBottom: 15,
        }}
      >
        <Text style={styles.title}>Registro</Text>
        {photo ? (
          <Fragment>
            <UploadImage someHandlerProp={handler} />
            <View style={styles.spinner}>
              {loading && <ActivityIndicator size="large" color="white" />}
            </View>
            <Button
              title="Subir foto"
              onPress={formik.handleSubmit}
              backgroundColor="white"
              textColor="blue"
            />

            {previewVisible && capturedImage ? (
              <CameraPreview photo={capturedImage} />
            ) : (
              <Camera
                style={{ flex: 1 }}
                ref={cameraRef}
              >
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: 'transparent',
                    flexDirection: 'row'
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      flexDirection: 'row',
                      flex: 1,
                      width: '100%',
                      padding: 20,
                      justifyContent: 'space-between'
                    }}
                  >
                    <View
                      style={{
                        alignSelf: 'center',
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      <TouchableOpacity
                        onPress={__takePicture}
                        style={{
                          width: 70,
                          height: 70,
                          bottom: 0,
                          borderRadius: 50,
                          backgroundColor: '#fff'
                        }}
                      />
                    </View>
                  </View>
                </View>
              </Camera>
            )}


            {startCamera ? (<>
              <Camera
                style={{ flex: 1, width: "100%" }}
                ref={cameraRef}
              ></Camera>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <TouchableOpacity
                    onPress={__takePicture}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff'
                    }}
                  />
                </View>
              </View>
            </>) : (<><TouchableOpacity
              onPress={__startCamera}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                height: 40
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                Tomar foto
              </Text>
            </TouchableOpacity></>)}
          </Fragment>
        ) : (
          <BlockerProfile
            blockerId={reg}
            distritos={distritos}
            navigation={props.navigation}
          />
        )}
      </ScrollView>
    </View>
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
