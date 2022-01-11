import { View } from "react-native";
import useAuth from "../hooks/useAuth";
import Success from "../components/Success";
import React, { useLayoutEffect } from "react";

export default function LogoutScreen(props) {
  const { logout } = useAuth();
  const { navigation } = props;
  const successMessage = "Ha cerrado sesión con éxito";
  const redirect = "Login";

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
      swipeEnabled: false,
      gestureEnabled: false,
    });
    logout(true);
  }, []);

  return (
    <View>
      <Success
        navigation={navigation}
        successMessage={successMessage}
        redirect={redirect}
      />
    </View>
  );
}
