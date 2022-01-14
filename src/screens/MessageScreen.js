import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import LoggedHeader from "../components/LoggedHeader";
import Inbox from "../components/Inbox";
import useAuth from "../hooks/useAuth";
import useReg from "../hooks/useReg";
import {
  useFocusEffect,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";

export default function MessageScreen() {
  const [messageData, setMessageData] = useState(undefined);
  const isFocused = useIsFocused();

  async function getMessages() {
    try {
      const url = "https://pasteblock.herokuapp.com/api/blocker/inbox";
      const response = await fetch(url);
      setMessageData(await response.json());
    } catch (e) {
      console.log(e);
    }
  }

  useLayoutEffect(() => {
    if (isFocused == false) {
      setMessageData(undefined);
    } else {
      (async () => {
        await getMessages();
      })();
    }
  }, [isFocused]);

  /*useEffect(() => {
    console.log(messageData);
  }, [messageData]);*/

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <LoggedHeader />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {messageData ? (
          <Inbox messageData={messageData} setMessageData={setMessageData} />
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </ScrollView>
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
