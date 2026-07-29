import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./SplashScreen2Styles";

export default function SplashScreen2({ navigation }) {
  return (
    <LinearGradient
      colors={["#0B1020", "#171B2F", "#0B1020"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Skip Button */}
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
            source={require("../../assets/images/splash/meditation_robot.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Your Safe{" "}
            <Text style={styles.highlight}>Space</Text>
            {"\n"}to Talk
          </Text>

          <Text style={styles.description}>
            Share your thoughts, emotions,
            and daily experiences in a
            private and judgment-free
            environment whenever you need
            support.
          </Text>
        </View>

        {/* Indicator */}
        <View style={styles.indicatorContainer}>
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Splash3")}
        >
          <LinearGradient
            colors={["#5B5FEF", "#6F73FF"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              Next →
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}