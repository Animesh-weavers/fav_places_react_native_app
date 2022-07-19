import { View, Text, ScrollView } from "react-native";
import React from "react";
import PlaceForm from "../components/places/PlaceForm";

const AddPlace = () => {
  return (
    <ScrollView>
      <PlaceForm />
    </ScrollView>
  );
};

export default AddPlace;
