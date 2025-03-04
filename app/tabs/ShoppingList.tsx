import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { app } from "../firebaseConfig";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import styles from "../gui/styles";

type ShoppingItem = {
    id?: string;
    name: string;
    amount: number;
    unit: string;
};

const db = getDatabase(app);

const ShoppingList = () => {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [newItem, setNewItem] = useState<ShoppingItem>({ name: '', amount: 1, unit: 'kpl' });

    const saveItem = async () => {
        if (newItem.name && newItem.amount) {
            const newItemRef = push(ref(db, 'items/'), newItem);
            console.log("Saved item with key:", newItemRef.key);
            setNewItem({ name: '', amount: 1, unit: 'kpl' });
        } else {
            Alert.alert("Virhe", "Tuote ja määrä ovat pakollisia tietoja");
        }
    };

    const removeItem = async (id: string | undefined) => {
        if (!id) return;
        console.log("Trying to remove item wih id:", id);
        remove(ref(db, `items/${id}`));
    };

    useEffect(() => {
        const itemsRef = ref(db, 'items/');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const itemsList: ShoppingItem[] = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].name,
                    amount: data[key].amount,
                    unit: data[key].unit,
                }));
                setItems(itemsList);
            } else {
                setItems([]);
            }
        });
    }, []);

    return (
        <View style={styles.recipeContainer}>
            <TextInput style={styles.input} value={newItem.name} onChangeText={(value) => setNewItem({ ...newItem, name: value })} placeholder="Tuote" />
            <TextInput style={styles.input} value={newItem.amount.toString()} onChangeText={(value) => setNewItem({ ...newItem, amount: parseInt(value) })} placeholder="Määrä" keyboardType="numeric" />
            <Button title="Add Item" onPress={saveItem} />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                    <View style={styles.shoppingItem}>
                        <Text>{item.name}, {item.amount} {item.unit}</Text>
                        <Text style={styles.simpleButton} onPress={() => removeItem(item.id)}>Ostettu</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ShoppingList;
