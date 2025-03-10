import React from "react";

import Ionicons from '@expo/vector-icons/Ionicons';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ContactsTab from "./tabs/ContactsTab";
import ContactDetails from "./tabs/ContactDetails";
import TextToSpeech from "./tabs/TextToSpeech";

import { Contact } from 'expo-contacts';

type RootStackParamList = {
  Yhteystiedot: undefined;
  ContactDetails: { contact: Contact };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function ContactsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Yhteystiedot" component={ContactsTab} options={{headerShown: false}} />
      <Stack.Screen 
        name="ContactDetails" 
        component={ContactDetails} 
        options={({ route }) => ({ title: route.params.contact.name })}
      />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <Tab.Navigator
    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { 
            let iconName: 'people-outline' | 'mic-outline' | 'home';

            if (route.name === 'Yhteystiedot') {
              iconName = 'people-outline';
            } else if (route.name === 'Pronounce') {
              iconName = 'mic-outline';
            } else {
              iconName = 'home';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Yhteystiedot" component={ContactsStack} />
        <Tab.Screen name="Pronounce" component={TextToSpeech} />
      </Tab.Navigator>
  );
}
