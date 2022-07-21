import { View, Text } from "react-native";
import React from "react";
import PlacesList from "../components/places/PlacesList";

const places = [
  {
    _id: 0,
    image:
      "https://i.pinimg.com/originals/e3/4d/c3/e34dc34286f9f2f9b0377f34241f2510.jpg",
    currentAddress: "abc",
    pickedAddress: "",
  },
  {
    _id: 1,
    image:
      "https://i.pinimg.com/originals/e3/4d/c3/e34dc34286f9f2f9b0377f34241f2510.jpg",
    currentAddress: "",
    pickedAddress: "def",
  },
  {
    _id: 2,
    image:
      "https://i.pinimg.com/originals/e3/4d/c3/e34dc34286f9f2f9b0377f34241f2510.jpg",
    currentAddress: "",
    pickedAddress: "def",
  },
  {
    _id: 3,
    image:
      "https://i.pinimg.com/originals/e3/4d/c3/e34dc34286f9f2f9b0377f34241f2510.jpg",
    currentAddress: "",
    pickedAddress: "def",
  },
];

const AllPlaces = () => {
  return <PlacesList places={places} />;
};

export default AllPlaces;
