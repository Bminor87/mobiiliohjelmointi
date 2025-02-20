import React from "react";

import { View, Text } from "react-native";

import MapView, { Marker } from "react-native-maps";

import styles from "../gui/styles";

export default function Maps() {
  return (
    <View style={styles.appContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.1695,
          longitude: 24.9354,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 60.1695, longitude: 24.9354 }}
          title={"Helsinki"}
          description={"Helsingin keskusta"}
        />
      </MapView>
    </View>
  );
}
