import React, {useState} from "react";
import Calculator from "./tabs/Calculator"
import History from "./tabs/History"

import {
    Pressable,
    View
} from "react-native";
import styles from "./gui/styles";

export default function App() {

    const [message, setMessage]: [any, any] = useState(0);
    const [history, setHistory]: [string[], any] = useState([]);

    return (
        <View style={styles.appContainer}>
            <View style={styles.buttonContainer}>
                <Pressable>Open Calculator</Pressable>
                <Calculator history={history} setHistory={setHistory} />
                <History history={history} />
            </View>

        </View>
    );
}
