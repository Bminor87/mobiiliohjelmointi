import React, { useState, useEffect } from "react";

import { View, Text, TextInput, Button, FlatList } from "react-native";

import * as SQLite from 'expo-sqlite';

import styles from "../gui/styles";

type ShoppingItem = {
    id: number;
    name: string;
    amount: number;
    unit: string;
};

const db = SQLite.openDatabaseSync('shoppinglistdb');

const initialize = async () => {
    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS shoppinglist (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                amount REAL NOT NULL,
                unit TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error('Could not open database', error);
    }
};

const ShoppingList = () => {

    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [newItem, setNewItem] = useState<ShoppingItem>({ id: 0, name: '', amount: 1, unit: 'kpl' });

    const saveItem = async () => {
        try {
            await db.runAsync(
                `INSERT INTO shoppinglist (name, amount, unit) VALUES (?, ?, ?)`,
                [newItem.name, newItem.amount, newItem.unit]
            );
    
            fetchItems();
            setNewItem({ id: 0, name: '', amount: 1, unit: 'kpl' });
        } catch (error) {
            console.error("Could not save item", error);
        }
    };
    

    const fetchItems = async () => {
        try {
            const results = await db.getAllAsync<ShoppingItem>(`SELECT * FROM shoppinglist`);
            setItems(results);
        } catch (error) {
            console.error("Could not fetch items", error);
        }
    };

    const removeItem = async (id: number) => {
        try {
            await db.runAsync(`DELETE FROM shoppinglist WHERE id = ?`, [id]);
            fetchItems();
        } catch (error) {
            console.error("Could not remove item", error);
        }
    };
    
    useEffect(() => {
        initialize().then(fetchItems);
    }, []);    

    return (
        <View style={styles.recipeContainer}>
        <TextInput style={styles.input} value={newItem.name} onChangeText={(value) => setNewItem({...newItem, name: value})} placeholder="Tuote" />
        <TextInput style={styles.input} value={newItem.amount.toString()} onChangeText={(value) => setNewItem({...newItem, amount: parseInt(value)})} placeholder="Määrä" keyboardType="numeric" />
        <Button title="Add Item" onPress={saveItem} />
        <FlatList
            data={items}
            renderItem={({ item }) => (
                <View style={styles.shoppingItem}>
                    <Text>{item.name}, {item.amount} {item.unit}</Text>
                     <Text style={styles.simpleButton} onPress={() => removeItem(item.id)}>Ostettu</Text>
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
        </View>
    );
    };

export default ShoppingList;