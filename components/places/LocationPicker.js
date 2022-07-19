import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/outlinedButton";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geocoder from "@timwangdev/react-native-geocoder";

const LocationPicker = (props) => {
  const [currentPosition, setCurrentPosition] = useState({
    lat: 0,
    long: 0,
  });
  const [getLocationHandler, setGetLocationHandler] = useState(false);
  const [isShowWhichMap, setIsShowWhichMap] = useState(false);
  // const [pickedAddress, setPickedAddress] = useState("");
  // const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    Geolocation.getCurrentPosition((info) =>
      setCurrentPosition({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      })
    );
  }, [getLocationHandler, props.isSubmit]);

  const currentLocationHandler = async () => {
    props.pickedLocationHandler("");
    setIsShowWhichMap(false);
    setGetLocationHandler(!getLocationHandler);
    try {
      const position = { lat: currentPosition.lat, lng: currentPosition.long };
      const response = await Geocoder.geocodePosition(position);
      // console.log(response[0].formattedAddress);
      props.currentLocationPickedHandler(response[0].formattedAddress);
    } catch (error) {
      // console.log(error);
    }
  };

  const pickOnMapHandler = () => {
    setIsShowWhichMap(true);
  };

  const mapDragEndHandler = async (e) => {
    props.currentLocationPickedHandler("");
    setCurrentPosition({
      lat: e.nativeEvent.coordinate.latitude,
      long: e.nativeEvent.coordinate.longitude,
    });
    try {
      const position = {
        lat: currentPosition.lat,
        lng: currentPosition.long,
      };
      const response = await Geocoder.geocodePosition(position);
      // setPickedAddress(response[0].formattedAddress);
      props.pickedLocationHandler(response[0].formattedAddress);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.mapPreview}>
        <MapView
          provider={PROVIDER_GOOGLE}
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
              onDragEnd={mapDragEndHandler}
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
    height: 300,
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
