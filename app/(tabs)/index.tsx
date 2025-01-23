import { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import styles from "../gui/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [input, setInput]: [string, any] = useState("");
  const [shoppinglist, setShoppinglist]: [string[], any] = useState([]);

  const colorScheme = useColorScheme();

  const addShoppingItem = () => {
    if (input === "") {
      Alert.alert("Virhe", "Tuote ei voi olla tyhjä");
      return;
    }
    setShoppinglist([...shoppinglist, input]);
    setInput("");
  };

  const clearShoppingList = () => {
    setShoppinglist([]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Apparently ios and android handle this differently
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.appContainer}>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Ostoslista</ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">&nbsp;</ThemedText>
            <FlatList
              data={shoppinglist}
              renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
              keyExtractor={(item, index) => index.toString()}
            />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">&nbsp;</ThemedText>
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
              onChangeText={setInput}
              onSubmitEditing={addShoppingItem}
              value={input.toString()}
              placeholder="ostoskoriin lisättävä tuote"
            />
          </ThemedView>
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={addShoppingItem}
            >
              <Text style={styles.buttonText}>Lisää</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButton}
              onPress={clearShoppingList}
            >
              <Text style={styles.buttonText}>Tyhjennä</Text>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
