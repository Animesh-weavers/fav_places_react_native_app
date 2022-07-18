import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/outlinedButton";
import Geolocation from "@react-native-community/geolocation";

const LocationPicker = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0,
  });
  const getLocationHandler = () => {
    Geolocation.getCurrentPosition((info) =>
      setCurrentPosition({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      })
    );
    console.log(currentPosition.lat, currentPosition.long);
  };
  const pickOnMapHandler = () => {};
  return (
    <View>
      <View style={styles.mapPreview}>
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="map-pin" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 270,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
