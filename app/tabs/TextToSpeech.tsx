import React, {useState} from "react";
import { Text, View, Button, TextInput, Pressable } from "react-native";

import * as Speech from 'expo-speech';
import styles from "../gui/styles";

export default function TextToSpeech() {

    const [text, setText] = useState("");
    const [language, setLanguage] = useState("en");

    const speak = () => {
        Speech.speak(text, {language});
    }

    return (
        <View style={styles.languageApp}>
            <Text>How to Pronounce...</Text>
            <TextInput style={styles.input} placeholder="Type something here" value={text} onChangeText={(value) => {setText(value)}} />
            <Button title="Press to learn the pronounciation" onPress={speak} />
            <Text>Choose Language</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={language === "en" ? styles.activeButton : styles.inactiveButton} onPress={() => setLanguage("en")}><Text>English</Text></Pressable>
                <Pressable style={language === "fi" ? styles.activeButton : styles.inactiveButton} onPress={() => setLanguage("fi")}><Text>Suomi</Text></Pressable>
                <Pressable style={language === "sv" ? styles.activeButton : styles.inactiveButton} onPress={() => setLanguage("sv")}><Text>Svenska</Text></Pressable>
            </View>
        </View>
    );

}