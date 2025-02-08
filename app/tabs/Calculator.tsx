import React, { useRef, useState, useContext } from "react";

import { HistoryContext } from "../historyContext";

import { TextInput, Text, TouchableOpacity, View } from "react-native";
import styles from "../gui/styles";

export default function Calculator({ navigation }: { navigation: any }) {
  const { addToHistory }: any = useContext(HistoryContext);

  const [input1, setInput1]: [string, any] = useState("");
  const [input2, setInput2]: [string, any] = useState("");
  const result = useRef(0);
  const [message, setMessage]: [any, any] = useState(0);

  const operation = (operation: "+" | "-") => {
    result.current =
      operation === "+"
        ? parseInt(input1) + parseInt(input2)
        : parseInt(input1) - parseInt(input2);

    if (isNaN(result.current)) {
      setMessage("Käytä vain numeroita!");
      return;
    }

    const newMessage = `${input1} ${operation} ${input2} = ${result.current}`;

    setMessage(newMessage);
    addToHistory(newMessage);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.stepContainer}>
        <Text>{message}</Text>
      </View>
      <View style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInput1}
          value={input1.toString()}
          keyboardType="numeric"
          placeholder="Syötä numero"
        />
        <TextInput
          style={styles.input}
          onChangeText={setInput2}
          value={input2.toString()}
          keyboardType="numeric"
          placeholder="Syötä toinen numero"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => operation("+")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.customButton}
          onPress={() => operation("-")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.buttonText}>Näytä Historia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
