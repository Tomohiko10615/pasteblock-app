import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MessageItem from "./MessageItem";

export default function MessageList(props) {
  const { messages, getMessages, endOfData, showMessageCondition } = props;

  const loadMore = () => {
    getMessages();
  };

  return (
    <FlatList
      data={messages}
      showsVerticalScrollIndicator={false}
      keyExtractor={(message) => String(message.id)}
      renderItem={({ item }) => (
        <MessageItem showMessageCondition={showMessageCondition} item={item} />
      )}
      contentContainerStyle={styles.flatListContentContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        <>
          {!endOfData && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          )}
          {endOfData && messages.length != 0 && (
            <View style={styles.loadingContainer}>
              <Text style={styles.text}>No existen más mensajes</Text>
            </View>
          )}

          {endOfData && messages.length == 0 && (
            <View style={styles.loadingContainer}>
              <Text style={styles.text}>No tienes ningún mensaje</Text>
            </View>
          )}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {},
  loadingContainer: {
    justifyContent: "center",
    marginBottom: 15,
  },
  text: {
    color: "blue",
    textAlign: "center",
  },
});
