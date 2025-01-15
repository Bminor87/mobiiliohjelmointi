import { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState(0);

  const colorScheme = useColorScheme();

  const add = () => setResult(parseInt(input1) + parseInt(input2));
  const subtract = () => setResult(parseInt(input1) - parseInt(input2));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Laskin</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Tulos: {result}</ThemedText>
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
        <TouchableOpacity style={styles.customButton} onPress={add}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.customButton} onPress={subtract}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    height: 40,
    paddingLeft: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  customButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
