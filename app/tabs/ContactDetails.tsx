import React from "react";
import { Text, View, Alert, Button } from "react-native";
import {RouteProp, useRoute} from "@react-navigation/native";
import { Contact } from 'expo-contacts';
import * as SMS from 'expo-sms';

import styles from "../gui/styles";

type RootStackParamList = {
    ContactDetails: { contact: Contact };
};

type ContactDetailsProps = RouteProp<RootStackParamList, "ContactDetails">;

export default function ContactDetails() {
    const route = useRoute<ContactDetailsProps>();
    const contact = route.params.contact;

    const sendSMS = async (number: string) => {
        const isSMSAvailable = await SMS.isAvailableAsync();
        if (!isSMSAvailable) {
            Alert.alert("SMS not available");
            return
        }

        if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) {
            Alert.alert("No phone number");
            return;
        }
        await SMS.sendSMSAsync(number, "Hello " + contact.name);
    }

    return (
        <View style={styles.appContainer}>
            <Text style={styles.contactTitle}>first Name: {contact.firstName}</Text>
            <Text style={styles.contactTitle}>last Name: {contact.lastName}</Text>
            <View style={styles.contactDetails}>
                <Text>Emails:</Text>
                {contact.emails?.map(email => <Text key={email.id}>✉️ {email.email}</Text>)}
            </View>
            <View style={styles.contactDetails}>
                <Text>Phone numbers:</Text>
                {contact.phoneNumbers?.map(phone => (
                    <View style={styles.contact} key={phone.id}>
                        <Text key={phone.id}>📞 {phone.number}</Text>
                        <Button title="Send SMS" onPress={() => {sendSMS(phone.number!)}} />
                    </View>
                ))}
            </View>
        </View>
    )

}