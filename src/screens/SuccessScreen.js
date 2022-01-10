import React from "react";
import { View } from "react-native";
import useReg from "../hooks/useReg";
import useAuth from "../hooks/useAuth";
import Success from "../components/Success";

export default function SuccessScreen(props) {
  const { reg } = useReg();
  const { auth } = useAuth();
  const { navigation } = props;
  const { successMessage } = props.route.params;
  return (
    <View>
      <Success navigation={navigation} successMessage={successMessage} />
    </View>
  );
}
