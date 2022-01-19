import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LoggedHeader from "../components/LoggedHeader";
import { useIsFocused } from "@react-navigation/native";
import Service from "../components/Service";

export default function ServiceScreen() {
  const isFocused = useIsFocused();
  const [serviceData, setServiceData] = useState([]);
  const [inicio, setInicio] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  const [serviceDetails, setServiceDetails] = useState(undefined);
  const [serviceItem, setServiceItem] = useState(undefined);

  const showServiceDetails = (item, state) => {
    setServiceDetails(state);
    setServiceItem(item);
    console.log(item);
  };

  const getServices = async () => {
    try {
      const url =
        "https://pasteblock.herokuapp.com/api/blocker/historial?inicio=" +
        inicio;
      const response = await fetch(url);
      const result = await response.json();
      if (result.length != 0) {
        setServiceData([...serviceData, ...result]);
        setInicio(inicio + 3);
      } else {
        setEndOfData(true);
      }
      setLoaded(true);
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(() => {
    if (isFocused == false) {
      setServiceData([]);
      setInicio(0);
      setLoaded(false);
      setEndOfData(false);
      showServiceDetails(undefined, undefined);
    } else {
      (async () => {
        await getServices();
      })();
    }
  }, [isFocused]);

  useEffect(() => {
    if (serviceData.length != 0) {
      setLoaded(true);
    }
  }, [serviceData]);

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <LoggedHeader />
      <View style={{ flexGrow: 1, justifyContent: "center" }}>
        {loaded ? (
          <Service
            serviceData={serviceData}
            getServices={getServices}
            endOfData={endOfData}
            showServiceDetails={showServiceDetails}
            serviceDetails={serviceDetails}
            serviceItem={serviceItem}
          />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
