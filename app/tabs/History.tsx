import React, {useRef, useState} from "react";

import {
    Text,
    FlatList,
    View
} from "react-native";
import styles from "../gui/styles";

export default function History ({history}: {history: Array<string>}) {

    return (
        <View style={styles.stepContainer}>
            <Text>Historia</Text>
            <FlatList
                data={history}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )

}