import React, { useState, useEffect, useCallback } from "react";
import {
  KeyboardAvoidingView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import debounce from "lodash.debounce";

import styles from "../gui/styles";

export default function Restaurants() {

  const GOOGLE_MAPS_API_KEY = ""; // USE YOUR OWN API KEY HERE

  const [region, setRegion] = useState<Region>({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0644,
    longitudeDelta: 0.0442,
  });

  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [nearbyRestaurants, setNearbyRestaurants] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setRegion((prevRegion) => ({
        ...prevRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }));
      fetchNearbyRestaurants(region);
    })();
  }, []);

  const fetchNearbyRestaurants = useCallback(
    debounce((newRegion: Region) => {
      console.log("Fetching nearby restaurants...");
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${newRegion.latitude},${newRegion.longitude}&radius=3000&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length) {
            console.log("Nearby restaurants found!");
            setNearbyRestaurants(data.results);
          } else {
            const errorMessage = GOOGLE_MAPS_API_KEY
              ? "Ravintoloita ei löytynyt"
              : "Lisää oma Google API KEY tiedostossa Restaurants.tsx";
            Alert.alert(errorMessage, "", [{ text: "OK" }]);
          }
        })
        .catch((error) => {
          console.error("Error fetching nearby restaurants:", error);
        });
    }, 2000), // 2 sec viive ennen uutta API kutsua kartan siirtämisen jälkeen
    []
  );

  const handleRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
    fetchNearbyRestaurants(newRegion);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.appContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <MapView
                style={{ width: "100%", height: "100%" }}
                region={region}
                onRegionChangeComplete={handleRegionChangeComplete}
              >
                <Marker
                  pinColor="#AACA00"
                  coordinate={{ latitude: 60.200692, longitude: 24.934302 }}
                  title="Haaga-Helia"
                  description="Ratapihantie 13, 00520 Helsinki"
                />
                {currentLocation && (
                  <Marker
                    pinColor="#00E0A0"
                    coordinate={{
                      latitude: currentLocation.coords.latitude,
                      longitude: currentLocation.coords.longitude,
                    }}
                    title="Your location"
                    description="You are here"
                  />
                )}
                {nearbyRestaurants &&
                  nearbyRestaurants.map((restaurant, index) => (
                    <Marker
                      key={index}
                      pinColor="#FF0000"
                      coordinate={{
                        latitude: restaurant.geometry.location.lat,
                        longitude: restaurant.geometry.location.lng,
                      }}
                      title={restaurant.name}
                      description={restaurant.vicinity}
                    />
                  ))}
              </MapView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
