import React from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";

export default function LoggedHeader() {
  let navigation = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity
        style={styles.drawer}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Icon name="bars" color={"white"} size={25} />
      </TouchableOpacity>
      <Text style={styles.title}>Pasteblock</Text>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    height: 80,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginStart: "5%",
  },
  drawer: { marginStart: "5%" },
  logo: {
    width: 60,
    height: 60,
    marginStart: "auto",
    marginEnd: "5%",
  },
});
