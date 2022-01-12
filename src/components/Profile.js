import React, { useEffect } from "react";
import { LogBox } from "react-native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";

export default function Profile(props) {
  const { profileData, blocker, distritos, servicios } = props;

  const hostUrl = "https://pasteblock.herokuapp.com/uploads/";

  const imgUrl = hostUrl + blocker.foto;

  const getStars = (stars) => {
    let content = [];
    let currentStars = stars;
    for (let i = 0; i < 5; i++) {
      if (currentStars >= 0.75) {
        content.push(
          <Image
            style={styles.star}
            source={require("../../assets/star.png")}
          />
        );
      } else if (currentStars < 0.75 && currentStars >= 0.25) {
        content.push(
          <Image
            style={styles.star}
            source={require("../../assets/half-star.png")}
          />
        );
      } else {
        content.push(
          <Image
            style={styles.star}
            source={require("../../assets/no-star.png")}
          />
        );
      }
      currentStars--;
    }
    return content;
  };

  useEffect(() => {
    console.log(servicios);
  }, [blocker]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Image source={{ uri: imgUrl }} style={styles.image} />
        <Text style={styles.text}>
          {profileData.nombre} {profileData.apellido}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Reputación:</Text>
        <View style={styles.container}>{getStars(blocker.reputacion)}</View>
        <Text style={styles.text}>{blocker.reputacion}</Text>
      </View>
      <Text style={styles.text}>Presentación:</Text>
      <View style={styles.secondaryContainer}>
        <Text style={styles.secondaryText}>{blocker.presentacion}</Text>
      </View>

      <Text style={styles.text}>Distritos:</Text>
      <FlatList
        nestedScrollEnabled={true}
        data={distritos}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(distrito) => String(distrito)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.flatListItem}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
      <Text style={styles.text}>Servicios:</Text>
      <FlatList
        nestedScrollEnabled={true}
        data={servicios}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(servicio) => String(servicio)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.flatListItem}>{item}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "blue",
    margin: 40,
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 40,
  },
  container: {
    alignSelf: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15 / 2,
  },
  secondaryContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  flatListContainer: {
    backgroundColor: "white",
    borderRadius: 30,
    marginBottom: 15,
    marginHorizontal: 15,
    flex: 1,
    paddingVertical: 15,
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
  star: {
    width: 30,
    height: 30,
  },
});
