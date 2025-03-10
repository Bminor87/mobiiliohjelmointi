import React from "react";
import { Text, View, Alert, Button } from "react-native";
import { Contact } from 'expo-contacts';
import * as SMS from 'expo-sms';

import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

import styles from "../gui/styles";

export default function ContactBox({ contact }: { contact: Contact }) {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <View style={styles.contact}>
            <Text style={styles.contactTitle}>{contact.name}</Text>
            <Button title="Show contact" onPress={() => navigation.navigate("ContactDetails", {contact})} />
        </View>
    );
}