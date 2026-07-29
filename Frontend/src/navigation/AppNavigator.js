import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen1 from "../screens/Splash/SplashScreen1";
import SplashScreen2 from "../screens/Splash/SplashScreen2";
import SplashScreen3 from "../screens/Splash/SplashScreen3";
import SplashScreen4 from "../screens/Splash/SplashScreen4";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash1"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Splash1"
          component={SplashScreen1}
        />

        <Stack.Screen
          name="Splash2"
          component={SplashScreen2}
        />

        <Stack.Screen
          name="Splash3"
          component={SplashScreen3}
        />
        <Stack.Screen
          name="Splash4"
          component={SplashScreen4}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}