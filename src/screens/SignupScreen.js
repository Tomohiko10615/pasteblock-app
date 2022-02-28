import React from "react";
import { View } from "react-native";
import SignupForm from "../components/Signup/SignupForm";
import useReg from "../hooks/useReg";
import useAuth from "../hooks/useAuth";
import BlockerDataForm from "../components/Signup/BlockerDataForm";

export default function BlockerHome(props) {
  const { reg } = useReg();
  const { auth } = useAuth();
  const { navigation } = props;
  return (
    <View>
      {reg ? (
        <BlockerDataForm navigation={navigation} />
      ) : (
        <SignupForm navigation={navigation} />
      )}
    </View>
  );
}
