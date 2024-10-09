import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Routes } from "./Routes";
import { AuthScreen } from "../screens/AuthStackGroup/Auth/AuthScreen";

export const AuthStackGroup = () => {
  const user = false;
  const Stack = createNativeStackNavigator();

  if (user) {
    return null;
  }

  return (
    <Stack.Group>
      <Stack.Screen
        name={Routes.AUTH}
        component={AuthScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Group>
  );
};
