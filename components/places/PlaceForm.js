import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import { AuthContext } from "../../store/auth-context";
import LoaderScreen from "../../screens/LoaderScreen";
import axios from "axios";

const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredCurrentAddress, setEnteredCurrentAddress] = useState("");
  const [enteredPickedAddress, setEnteredPickedAddress] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = () => {
    setIsSubmit(true);
    setIsLoading(true);
    if (
      (enteredTitle != "" && enteredImage != "") ||
      enteredCurrentAddress != "" ||
      enteredPickedAddress != ""
    ) {
      //entered value
      const data = {
        title: enteredTitle,
        image: enteredImage,
        pickedAddress: enteredPickedAddress,
        currentAddress: enteredCurrentAddress,
      };

      //print obj object
      // console.log(obj);
      //call post api
      axios
        .post("https://ritendu-api.weavers-web.com/api/place", data)
        .then((response) => {
          setIsLoading(false);
          if (response.status === 200) {
            // ToastAndroid.showWithGravity(
            //   "All Your Base Are Belong To Us",
            //   ToastAndroid.SHORT,
            //   ToastAndroid.CENTER
            // );
          }
        })
        .catch((error) => {
          // console.log(error);
          setIsLoading(false);
          alert("Enter Valid Data...");
        });

      //reset states
      setEnteredCurrentAddress("");
      setEnteredImage("");
      setEnteredPickedAddress("");
      setEnteredTitle("");
    } else {
      alert("Enter valid inputs...");
    }
  };

  const LogoutHandler = () => {
    authCtx.logout();
  };
  return (
    <>
      {!isLoading && (
        <ScrollView style={styles.form}>
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              onChangeText={(e) => setEnteredTitle(e)}
              value={enteredTitle}
              style={styles.input}
            />
          </View>
          <ImagePicker imagePickHandler={(e) => setEnteredImage(e)} />
          <LocationPicker
            currentLocationPickedHandler={(e) => setEnteredCurrentAddress(e)}
            pickedLocationHandler={(e) => setEnteredPickedAddress(e)}
            isSubmit={isSubmit}
          />
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.subitButtonPressed,
            ]}
            onPress={submitHandler}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.subitButtonPressed,
            ]}
            onPress={LogoutHandler}
          >
            <Text style={styles.submitButtonText}>Logout</Text>
          </Pressable>
        </ScrollView>
      )}
      {isLoading && <LoaderScreen />}
    </>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
  submitButton: {
    backgroundColor: Colors.accent500,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 18,
    borderRadius: 10,
  },
  subitButtonPressed: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
