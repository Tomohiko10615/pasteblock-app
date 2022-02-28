import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ServiceItem from "./ServiceItem";

export default function ServiceList(props) {
  const { services, getServices, endOfData, showServiceDetails } = props;

  const loadMore = () => {
    getServices();
  };

  return (
    <FlatList
      data={services}
      showsVerticalScrollIndicator={false}
      keyExtractor={(service) => String(service.id)}
      renderItem={({ item }) => (
        <ServiceItem showServiceDetails={showServiceDetails} item={item} />
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
          {endOfData && services.length != 0 && (
            <View style={styles.loadingContainer}>
              <Text style={styles.text}>No existen más servicios</Text>
            </View>
          )}

          {endOfData && services.length == 0 && (
            <View style={styles.loadingContainer}>
              <Text style={styles.text}>No tienes ningún servicio</Text>
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
