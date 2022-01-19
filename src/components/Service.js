import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ServiceDetails from "./ServiceDetails";
import ServiceList from "./ServiceList";

export default function Service(props) {
  const {
    serviceData,
    getServices,
    endOfData,
    showServiceDetails,
    serviceDetails,
    serviceItem,
  } = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.secondaryContainer}>
        <Text style={styles.secondaryText}>
          {serviceDetails ? <>Servicio</> : <>Servicios</>}
        </Text>
      </View>
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
    marginBottom: 15,
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
    marginBottom: 15,
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
});
