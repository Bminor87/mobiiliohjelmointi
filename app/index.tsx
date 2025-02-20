import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Maps from "./tabs/Maps";

import { HistoryProvider } from "./historyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <Stack.Navigator>
        <Stack.Screen name="Kartat" component={Maps} />
      </Stack.Navigator>
    </HistoryProvider>
  );
}
