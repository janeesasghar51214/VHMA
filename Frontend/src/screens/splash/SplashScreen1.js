import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import BrainIllustration from "../../components/BrainIllustration/BrainIllustration";
import LoadingDots from "../../components/LoadingDots/LoadingDots";

import styles from "./SplashScreen1Styles";

export default function SplashScreen1({ navigation }) {

  // Fade animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("Splash2");
    }, 2000);

    return () => clearTimeout(timer);

  }, [navigation]);

  return (

    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
      }}
    >

      <LinearGradient
        colors={["#081120", "#0F1B34", "#081120"]}
        style={styles.container}
      >

        <SafeAreaView style={styles.safeArea}>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>
                VMHA
              </Text>
            </View>
          </View>

          {/* Brain */}
          <View style={styles.brainContainer}>
            <BrainIllustration />
          </View>

          {/* Loading */}
          <View style={styles.loadingContainer}>
            <LoadingDots />
          </View>

          {/* Text */}
          <View style={styles.textContainer}>

            <Text style={styles.title}>
              Virtual Mental{"\n"}Health Assistant
            </Text>

            <Text style={styles.subtitle}>
              Your Companion for Emotional Well-being
            </Text>

          </View>

          {/* Bottom Indicator */}
          <View style={styles.indicatorContainer}>

            <View style={styles.activeBar} />
            <View style={styles.inactiveBar} />
            <View style={styles.inactiveBar} />
            <View style={styles.inactiveBar} />

          </View>

        </SafeAreaView>

      </LinearGradient>

    </Animated.View>

  );
}