import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OfferNew from "./Components/OfferNew";
import Offers from "./Components/Offers";
import UpdateOffer from "./Components/UpdateOffer";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
          <Text>"hola"</Text>

      <Stack.Navigator initialRouteName="Offers">
        <Stack.Screen
          name="Offers"
          component={Offers}
          options={{ title: "Job Offers" }}
        />
        <Stack.Screen
          name="OfferNew"
          component={OfferNew}
          options={{ title: "New Job Offer" }}
        />
        <Stack.Screen
          name="UpdateOffer"
          component={UpdateOffer}
          options={{ title: "Update Job Offer" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
