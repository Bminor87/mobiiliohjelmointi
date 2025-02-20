import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  Platform,
  Alert
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import styles from "../gui/styles";

export default function Maps() {
  const searchInput = useRef<TextInput>(null);

  const GOOGLE_MAPS_API_KEY = ""; // Add your own API key here

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const [location, setLocation] = useState<any>(null);
  const [query, setQuery] = useState("");

  const search = () => {
    () => searchInput.current?.blur();
    if (!query) return;

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GOOGLE_MAPS_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length) {
          const location = data.results[0].geometry.location;
          setRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          });
        } else {
          console.log(data);
          const errorMessage = GOOGLE_MAPS_API_KEY ? "Osoitetta ei löytynyt" : "Lisää oma Google API KEY tiedostossa Maps.tsx";
          Alert.alert(errorMessage, "", [
            { text: "OK" },
          ]);
        }
      }
      );
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.appContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <MapView style={{ width: "100%", height: "100%" }} region={region}>
                <Marker
                  pinColor="#AACA00"
                  coordinate={{ latitude: 60.200692, longitude: 24.934302 }}
                  title="Haaga-Helia"
                  description="Ratapihantie 13, 00520 Helsinki"
                />
                {location && (
                  <Marker
                    pinColor="#00E0A0"
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title="Your location"
                    description="You are here"
                  />
                )}
              </MapView>

              <View style={styles.searchBoxContainer}>
                <TextInput
                  ref={searchInput}
                  value={query}
                  onChangeText={(text) => setQuery(text)}
                  placeholder="Etsi osoite..."
                  placeholderTextColor={"#999"}
                  style={styles.searchBox}
                  returnKeyType="search"
                />
                <Button title="Etsi" onPress={search} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
