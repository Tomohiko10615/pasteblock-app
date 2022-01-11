import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";

export default function Profile(props) {
  const { profileData, blocker, distritos } = props;

  const hostUrl = "https://pasteblock.herokuapp.com/uploads/";

  const imgUrl = hostUrl + blocker.foto;

  useEffect(() => {
    for (let i = 0; i < distritos.length; i++) {
      console.log(distritos[i]);
    }
  }, [blocker]);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={{ uri: imgUrl }} style={styles.image} />
        <Text style={styles.text}>
          {profileData.nombre} {profileData.apellido}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Reputación:</Text>
        <Text style={styles.text}>{blocker.reputacion}</Text>
      </View>
      <Text style={styles.text}>Presentación:</Text>
      <View style={styles.secondaryContainer}>
        <Text style={styles.secondaryText}>{blocker.presentacion}</Text>
      </View>

      <Text style={styles.text}>Distritos:</Text>
      <FlatList
        data={distritos}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "blue",
    margin: 40,
    borderRadius: 30,
    overflow: "hidden",
  },
  container: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  secondaryContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  text: {
    textAlign: "left",
    color: "white",
    marginBottom: 10,
    marginHorizontal: 15,
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
  },
});
