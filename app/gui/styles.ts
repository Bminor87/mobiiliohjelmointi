import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
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
  navButton: {
    backgroundColor: "#00BF9A",
    padding: 10,
    marginTop: 8,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  recipeContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
  },
  recipeYtLink: {
    marginTop: 8,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  youtubeLogoContainer: {
    marginLeft: 10,
  },
  youtubeLogo: {
    width: 140,
    height: 70,
  },
});

export default styles;
