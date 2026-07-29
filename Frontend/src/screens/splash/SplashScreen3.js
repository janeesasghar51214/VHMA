import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import styles from "./SplashScreen3Styles";

export default function SplashScreen3({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
      }}
    >
      <LinearGradient
        colors={["#0B1020", "#171B2F", "#0B1020"]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          {/* Skip */}
          <TouchableOpacity
            style={styles.skipContainer}
            onPress={() => navigation.navigate("Splash4")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          {/* Image */}
          <View style={styles.imageContainer}>
            <View style={styles.imageGlow} />

            <Image
              source={require("../../assets/images/splash/emotion_tracking.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Track Your Emotional{"\n"}Well-being
            </Text>

            <Text style={styles.description}>
              Monitor your mood, journal your thoughts, and discover patterns
              that help you better understand yourself.
            </Text>
          </View>

          {/* Indicator */}
          <View style={styles.indicatorContainer}>
            <View style={styles.inactiveDot} />
            <View style={styles.activeDot} />
            <View style={styles.inactiveDot} />
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("Splash4")}
            >
              <LinearGradient
                colors={["#5A5FFF", "#7376FF"]}
                style={styles.buttonGradient}
              >
                <Text style={styles.nextText}>Next</Text>

                <Ionicons
                  name="arrow-forward"
                  size={22}
                  color="#FFFFFF"
                  style={{ marginLeft: 8 }}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
}