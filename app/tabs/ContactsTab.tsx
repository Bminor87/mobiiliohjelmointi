import React, {useState, useEffect} from "react";
import { Text, View, Alert, FlatList, TextInput } from "react-native";
import * as Contacts from 'expo-contacts';

import ContactBox from "../components/ContactBox";

import styles from "../gui/styles";

export default function ContactsTab() {

  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);

  async function loadContacts() {
    const { granted } = await Contacts.requestPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission required");
      return;
    }
    const { data } = await Contacts.getContactsAsync({ sort: "firstName" });
    setContacts(data);
    setFilteredContacts(data);
  }

  const filterContacts = (text: string) => {
    const filteredContacts = contacts.filter(contact => contact.name?.toLowerCase().includes(text.toLowerCase()));
    setFilteredContacts(filteredContacts);
  }

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <View style={styles.appContainer}>
      <Text style={{marginBottom: 10}}>Contacts ({contacts.length})</Text>
      <TextInput style={styles.input} placeholder="Filter contacts" onChangeText={filterContacts} />

      <FlatList data={filteredContacts} keyExtractor={contact => contact.id!} style={{width: "100%"}} renderItem={({ item }) => (
        <ContactBox contact={item} />
      )} />
    </View>
  );
}