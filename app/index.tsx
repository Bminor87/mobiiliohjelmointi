import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Calculator from "./tabs/Calculator";
import History from "./tabs/History";

import { HistoryProvider } from "./historyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </HistoryProvider>
  );
}
