import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState } from "react";

import axios from "axios";

import LoaderScreen from "./LoaderScreen";
import { Colors } from "../constants/colors";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = () => {
    if (email.trim().includes("@")) {
      if (email !== "") {
        setIsLoading(true);
        let headersList = {
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        let bodyContent = {
          requestType: "PASSWORD_RESET",
          email: email,
        };

        let reqOptions = {
          url: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBmunXZi1nkmO5Q_wEp2RefQpFRD_pJl1o",
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };

        axios(reqOptions)
          .then((res) => {
            setIsLoading(false);
            // console.log(res);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.response.data.error.code) {
              alert(error.response.data.error.message);
            }
          });
        setEmail("");
      }
    } else {
      alert("Enter your Email...");
    }
  };
  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>FavPlace</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.emailContainer}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={email}
                  onChangeText={(e) => setEmail(e)}
                />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.btn,
                  pressed && styles.pressable,
                ]}
                onPress={submitHandler}
              >
                <Text style={styles.btnText}>Send</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
      {isLoading && <LoaderScreen />}
    </>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    paddingTop: 35,
    paddingBottom: 30,
  },
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 15,
  },
  emailContainer: {
    marginBottom: 11,
  },
  passwordContainer: {
    marginBottom: 12,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    paddingLeft: 20,
    color: "black",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.primary500,
    width: 125,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
  pressable: {
    opacity: 0.8,
  },
  navigateContainer: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  navigateText: {
    color: "white",
  },
});
