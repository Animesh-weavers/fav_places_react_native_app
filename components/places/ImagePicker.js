import {
  Text,
  View,
  Button,
  PermissionsAndroid,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { launchCamera } from "react-native-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/outlinedButton";

const ImagePicker = () => {
  const [capturedImageUri, setCapturedImageUri] = useState({});
  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          mediaType: "photo",
          includeBase64: true,
          Path: "images",
        };
        const response = await launchCamera(options);
        if (response.didCancel) {
          // console.log("User cancelled image picker");
        } else if (response.error) {
          // console.log("ImagePicker Error: ", response.error);
        } else {
          const source = { uri: response.assets[0].uri };
          setCapturedImageUri(source);
        }
      } else {
        // console.log("Camera permission denied");
      }
    } catch (error) {
      alert("Retry..");
      // console.log(error);
    }
  };

  let imagePreview = <Text>No image taken yet..</Text>;
  if (capturedImageUri.uri) {
    imagePreview = (
      <Image source={{ uri: capturedImageUri.uri }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={openCamera}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 300,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
