import { View } from "react-native";
import useReg from "../hooks/useReg";
import useAuth from "../hooks/useAuth";
import Success from "../components/Success";
import React, { useLayoutEffect } from "react";

export default function LogoutScreen(props) {
  const { logout } = useAuth();
  const { navigation } = props;
  const successMessage = "Ha cerrado sesión con éxito";

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      swipeEnabled: false,
      gestureEnabled: false,
    });
    const stackNavigator = navigation.dangerouslyGetParent();
    console.log(stackNavigator.dangerouslyGetParent());
    if (stackNavigator) {
      stackNavigator.setOptions({
        tabBarVisible: false,
        swipeEnabled: false,
        gestureEnabled: false,
      });
    }
    logout();
  }, [navigation]);

  return (
    <View>
      <Success navigation={navigation} successMessage={successMessage} />
    </View>
  );
}
