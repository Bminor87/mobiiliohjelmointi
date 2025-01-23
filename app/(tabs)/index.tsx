import { useState, useRef } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import styles from "../gui/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [input1, setInput1]: [string, any] = useState("");
  const [input2, setInput2]: [string, any] = useState("");
  const result = useRef(0);
  const [message, setMessage]: [any, any] = useState(0);
  const [history, setHistory]: [string[], any] = useState([]);

  const colorScheme = useColorScheme();

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
    setHistory([newMessage, ...history]);
  };

  return (
    <ThemedView style={styles.appContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Laskin</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{message}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <TextInput
          style={[
            styles.input,
            {
              color: colorScheme === "dark" ? "white" : "black",
              borderColor: colorScheme === "dark" ? "white" : "gray",
            },
          ]}
          onChangeText={setInput1}
          value={input1.toString()}
          keyboardType="numeric"
          placeholder="Syötä numero"
        />
        <TextInput
          style={[
            styles.input,
            {
              color: colorScheme === "dark" ? "white" : "black",
              borderColor: colorScheme === "dark" ? "white" : "gray",
            },
          ]}
          onChangeText={setInput2}
          value={input2.toString()}
          keyboardType="numeric"
          placeholder="Syötä toinen numero"
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
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
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Historia</ThemedText>
        <FlatList
          data={history}
          renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
          keyExtractor={(item, index) => index.toString()}
        />
      </ThemedView>
    </ThemedView>
  );
}
