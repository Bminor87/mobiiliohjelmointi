import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ShoppingList from "./tabs/ShoppingList";

import { HistoryProvider } from "./historyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <Stack.Navigator>
        <Stack.Screen name="Ostoslista" component={ShoppingList} />
      </Stack.Navigator>
    </HistoryProvider>
  );
}
