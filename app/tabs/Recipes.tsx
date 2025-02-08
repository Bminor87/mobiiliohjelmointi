import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import styles from "../gui/styles";

type Recipe = {
  strMeal: string;
  strMealThumb: string;
  strYoutube: string;
};

const Recipes = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes]: [Recipe[], any] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      const data = await response.json();
      setRecipes(data.meals);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.stepContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setInput}
            value={input.toString()}
            placeholder="Hae reseptejä..."
            onSubmitEditing={() => fetchRecipes()}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.customButton}
            onPress={() => fetchRecipes()}
          >
            <Text style={styles.buttonText}>Etsi</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.stepContainer}>
          <FlatList
            data={recipes}
            renderItem={({ item }) => (
              <View style={styles.recipeContainer}>
                <Text style={styles.recipeTitle}>{item.strMeal}</Text>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.strMealThumb }}
                    style={styles.thumbnail}
                  />
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.strYoutube)}
                    style={styles.youtubeLogoContainer}
                  >
                    <Image
                      source={{
                        uri: "https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png",
                      }}
                      style={styles.youtubeLogo}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Recipes;
