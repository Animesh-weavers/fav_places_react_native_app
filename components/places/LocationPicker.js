import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/outlinedButton";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const LocationPicker = () => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0,
  });
  const [getLocationHandler, setGetLocationHandler] = useState(false);
  const [isShowWhichMap, setIsShowWhichMap] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) =>
      setCurrentPosition({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      })
    );
  }, [getLocationHandler]);

  const currentLocationHandler = () => {
    setIsShowWhichMap(false);
    setGetLocationHandler(!getLocationHandler);
  };

  const pickOnMapHandler = () => {
    setIsShowWhichMap(true);
  };
  return (
    <View>
      <View style={styles.mapPreview}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: currentPosition.lat,
            longitude: currentPosition.long,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {isShowWhichMap ? (
            <Marker
              draggable
              tappable={true}
              tracksViewChanges={true}
              title="Your Fav Location..."
              coordinate={{
                latitude: currentPosition.lat,
                longitude: currentPosition.long,
              }}
              onDragEnd={(e) => {
                setCurrentPosition({
                  lat: e.nativeEvent.coordinate.latitude,
                  long: e.nativeEvent.coordinate.longitude,
                });
                console.log(e.nativeEvent.coordinate.latitude);
                console.log(e.nativeEvent.coordinate.longitude);
              }}
            />
          ) : (
            <Marker
              coordinate={{
                latitude: currentPosition.lat,
                longitude: currentPosition.long,
              }}
              title="Current Location"
            />
          )}
        </MapView>
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="map-pin" onPress={currentLocationHandler}>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
