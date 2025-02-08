import { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  Text as ThemedText,
  TouchableOpacity,
  useColorScheme,
  ScrollView as ParallaxScrollView,
  View as ThemedView,
} from "react-native";

export default function HomeScreen() {
  const [fresh, setFresh] = useState(true);
  const [input, setInput] = useState("");
  const [result, setResult]: any = useState(0);
  const [randNumber, setRandNumber] = useState(0);
  const [tries, setTries] = useState(0);
  const [record, setRecrod] = useState(0);

  const colorScheme = useColorScheme();

  const guess = () => {
    setTries(tries + 1);
    if (parseInt(input) === randNumber) {
      setResult("Oikein! Arvasit " + tries + " kertaa.");
      if (record === 0 || tries < record) {
        setRecrod(tries);
      }
      setFresh(false);
    } else if (parseInt(input) < randNumber) {
      setResult(parseInt(input) + " on liian pieni!");
    } else {
      setResult(parseInt(input) + " on liian suuri!");
    }
    setInput("");
  };

  const startGame = () => {
    setFresh(true);
    setRandNumber(Math.floor(Math.random() * 100) + 1);
    setResult("Arvaa mitä lukua ajattelen (1-100)");
    setInput("");
    setTries(0);
  };

  useEffect(() => {
    startGame();
  }, []);

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
        <ThemedText type="title">Arvauspeli</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{result}</ThemedText>
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
          value={input.toString()}
          keyboardType="numeric"
          placeholder="Syötä numero"
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.customButton}
          onPress={fresh ? guess : startGame}
        >
          <ThemedText style={styles.buttonText}>
            {fresh ? "Arvaa" : "Aloita Alusta"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          {record != 0 && "Session ennätys: " + record + " yritystä"}
        </ThemedText>
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
