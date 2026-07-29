import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

export default function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0.4)).current;
  const dot2 = useRef(new Animated.Value(0.4)).current;
  const dot3 = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.4,
            duration: 350,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot1,
            transform: [{ scale: dot1 }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot2,
            transform: [{ scale: dot2 }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot3,
            transform: [{ scale: dot3 }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6D7BFF",
    marginHorizontal: 6,
  },
});