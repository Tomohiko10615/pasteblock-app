import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ServiceDetails from "./ServiceDetails";
import ServiceList from "./ServiceList";
import Checkbox from "expo-checkbox";

export default function Service(props) {
  const {
    serviceData,
    getServices,
    endOfData,
    showServiceDetails,
    serviceDetails,
    serviceItem,
    setFinalizado,
    finalizado,
  } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <Text style={styles.secondaryText}>
          {serviceDetails ? <>Servicio</> : <>Servicios</>}
        </Text>
      </View>
      {!serviceDetails && (
        <View style={styles.checkboxContainer}>
          <Text style={{ color: "blue" }}>Ver finalizados</Text>
          <Checkbox
            style={styles.checkbox}
            value={finalizado}
            onValueChange={() => {
              setFinalizado(!finalizado);
            }}
            key={0}
          />
        </View>
      )}
      {serviceDetails ? (
        <ServiceDetails
          serviceItem={serviceItem}
          serviceDetails={serviceDetails}
        />
      ) : (
        <ServiceList
          services={serviceData}
          getServices={getServices}
          endOfData={endOfData}
          showServiceDetails={showServiceDetails}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "flex-start",
    flex: 1,
  },
  secondaryContainer: {
    backgroundColor: "blue",
    borderRadius: 30,
    marginVertical: 30,
    width: "60%",
    alignSelf: "center",
    paddingVertical: 15 / 2,
  },
  secondaryText: {
    textAlign: "center",
    color: "white",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  messageContainer: {
    backgroundColor: "blue",
    borderRadius: 30,

    marginVertical: 30,
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  messageDataText: {
    color: "white",
    marginBottom: 5,
  },
  rowContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  servImage: {
    width: 60,
    height: 60,
    alignSelf: "flex-start",
    margin: 15,
    backgroundColor: "white",
    borderRadius: 30,
  },
  button: {
    textAlign: "center",
    paddingHorizontal: 12,
  },

  checkbox: {
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: 5,
  },
  checkboxContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
});
