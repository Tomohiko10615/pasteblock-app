import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage(props) {
  const { photoUri } = props;
  const [image, setImage] = useState(null);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();


  useEffect(() => {
    (async () => {
      props.someHandlerProp({ image });
    })();
  }, [image]);
  useEffect(() => {
    (async () => {
      if (photoUri) {
        setImage(photoUri);
      }
    })();
  }, []);

  const addImage = async () => {
    console.log(status)
    if (!status.granted) {
      requestPermission();
    }
    if (status.granted) {
      let _image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!_image.cancelled) {
        setImage(_image.uri);
      }
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
      )}

      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <Text style={imageUploaderStyles.text}>
            {image ? "Seleccionar una foto diferente" : "Seleccionar foto desde la galería"}
          </Text>
          <AntDesign name="camera" size={15} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 150,
    width: 150,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 60,
    overflow: "hidden",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "blue",
    marginBottom: 15,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightblue",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "blue",
    fontSize: 12,
    textAlign: "center"
  },
});
