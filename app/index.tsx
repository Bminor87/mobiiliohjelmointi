import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Recipes from "./tabs/Recipes";

import { HistoryProvider } from "./historyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <Stack.Navigator>
        <Stack.Screen name="Recipes" component={Recipes} />
      </Stack.Navigator>
    </HistoryProvider>
  );
}
