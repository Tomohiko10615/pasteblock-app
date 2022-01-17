import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LoggedHeader from "../components/LoggedHeader";
import Inbox from "../components/Inbox";
import { useIsFocused } from "@react-navigation/native";

export default function ServiceScreen() {
  const isFocused = useIsFocused();
  const [serviceData, setServiceData] = useState([]);
  const [inicio, setInicio] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [endOfData, setEndOfData] = useState(false);

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
          <Inbox
            messageData={messageData}
            getMessages={getMessages}
            endOfData={endOfData}
            showMessageCondition={showMessageCondition}
            messageCondition={messageCondition}
            messageItem={messageItem}
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
