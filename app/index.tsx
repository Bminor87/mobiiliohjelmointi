import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Restaurants from "./tabs/Restaurants";

import { HistoryProvider } from "./historyContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <Stack.Navigator>
        <Stack.Screen name="Ravintolat" component={Restaurants} />
      </Stack.Navigator>
    </HistoryProvider>
  );
}
