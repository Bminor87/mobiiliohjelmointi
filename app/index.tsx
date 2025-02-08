import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Converter from "./tabs/Converter";

import { HistoryProvider } from "./historyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <Stack.Navigator>
        <Stack.Screen name="Euromuuntaja" component={Converter} />
      </Stack.Navigator>
    </HistoryProvider>
  );
}
