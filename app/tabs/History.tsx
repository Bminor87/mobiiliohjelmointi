import React, { useContext } from "react";
import { Text, FlatList, View, TouchableOpacity } from "react-native";
import { HistoryContext } from "../historyContext";
import styles from "../gui/styles";

export default function History() {
  const { history, clearHistory }: any = useContext(HistoryContext);

  return (
    <View style={styles.appContainer}>
      <View style={styles.stepContainer}>
        <FlatList
          data={history}
          renderItem={({ item }) => <Text>{item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            clearHistory();
          }}
        >
          Tyhjennä historia
        </TouchableOpacity>
      </View>
    </View>
  );
}
