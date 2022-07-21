import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";

const PlaceItem = ({ place }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: place.image,
          }}
        />
        <Text>dhfguefgie</Text>
      </View>
      <View>
        {place.currentAddress != "" && <Text>{place.currentAddress}</Text>}
        {place.pickedAddress != "" && <Text>{place.pickedAddress}</Text>}
      </View>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: "white",
    padding:10
  },
  imageContainer: {
    width: "100%",
    // borderWidth: 1,
    // borderColor: "white",
  },
  tinyLogo: {
    width: "100%",
    height: 250,
  },
});
