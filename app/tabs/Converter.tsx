import React, { useState, useEffect } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../gui/styles";

const API_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

const LOGO_URL =
  "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/256/coin-euro-icon.png";

const Converter = () => {
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [updatedAt, setUpdatedAt] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [conversionResult, setConversionResult] = useState(0);
  const [sum, setSum] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setRates(data.eur);
        setUpdatedAt(data.date);
        setLoading(false);
      });
  }, []);

  const sanitizeInput = (value: string) => {
    return value.replace(/,/g, ".").replace(/[^0-9.]/g, "");
  };

  const convertCurrency = (
    options = {
      raceCondition: false,
      newCurrency: selectedCurrency,
      newSum: sum,
    }
  ) => {
    let result = 0;
    if (options.raceCondition) {
      result = parseFloat(options.newSum) * rates[options.newCurrency];
    } else {
      result = parseFloat(sum) * rates[selectedCurrency];
    }
    isNaN(result) ? setConversionResult(0) : setConversionResult(result);
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.stepContainer}>
        <Image source={{ uri: LOGO_URL }} style={styles.logo} />
      </View>
      {loading ? (
        <View style={styles.stepContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.stepContainer}>
          <Text style={styles.convertedCurrency}>
            {conversionResult.toFixed(2)} €
          </Text>
          <Text>
            Valuuttatiedot päivitetty:{" "}
            {Intl.DateTimeFormat("fi-FI", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(updatedAt))}
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Syötä summa"
            value={sum}
            onChangeText={(value) => {
              let sanitizedValue = sanitizeInput(value);
              setSum(sanitizedValue);
              convertCurrency({
                raceCondition: true,
                newCurrency: selectedCurrency,
                newSum: sanitizedValue,
              });
            }}
            onSubmitEditing={() => convertCurrency()}
          />
          <Text>Valitse valuutta</Text>
          <Picker
            style={styles.input}
            selectedValue={selectedCurrency}
            onValueChange={(itemValue) => {
              setSelectedCurrency(itemValue);
              convertCurrency({
                raceCondition: true,
                newCurrency: itemValue,
                newSum: sum,
              });
            }}
          >
            {Object.entries(rates).map(([key]) => (
              <Picker.Item key={key} label={key.toUpperCase()} value={key} />
            ))}
          </Picker>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => convertCurrency()}
        >
          Näytä Euroissa
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Text>Nappi on hyödytön :)</Text>
      </View>
    </View>
  );
};

export default Converter;
