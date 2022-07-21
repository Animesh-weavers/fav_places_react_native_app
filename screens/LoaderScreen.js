import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../images/loading.gif")} />
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray700,
  },
});
