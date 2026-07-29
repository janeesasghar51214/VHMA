import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Defs, RadialGradient, Stop } from "react-native-svg";
import styles from "./BrainIllustrationStyles";

const ORBIT_NODES = [
  { angle: 0, radius: 118, size: 8 },
  { angle: 40, radius: 108, size: 6 },
  { angle: 80, radius: 120, size: 5 },
  { angle: 120, radius: 112, size: 7 },
  { angle: 160, radius: 118, size: 5 },
  { angle: 200, radius: 108, size: 6 },
  { angle: 240, radius: 120, size: 8 },
  { angle: 280, radius: 112, size: 5 },
  { angle: 320, radius: 118, size: 6 },
];

export default function BrainIllustration() {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(0)).current;
  const twinkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 24000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 0,
          duration: 3600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(twinkleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(twinkleAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const glowScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  const glowOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const sphereRotate = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["-6deg", "6deg"],
  });

  const twinkleOpacity = twinkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={styles.container}>
      {/* Outer Glow */}
      <Animated.View
        style={[
          styles.outerGlow,
          { opacity: glowOpacity, transform: [{ scale: glowScale }] },
        ]}
      />

      {/* Middle Glow */}
      <Animated.View
        style={[styles.middleGlow, { transform: [{ scale: glowScale }] }]}
      />

      {/* Faceted, breathing brain core */}
      <Animated.View style={{ transform: [{ rotate: sphereRotate }] }}>
        <Svg width={180} height={180} viewBox="0 0 180 180">
          <Defs>
            <RadialGradient id="sphereGrad" cx="35%" cy="30%" r="75%">
              <Stop offset="0%" stopColor="#A6B4FF" stopOpacity="1" />
              <Stop offset="45%" stopColor="#7C83FD" stopOpacity="1" />
              <Stop offset="100%" stopColor="#4F6EF7" stopOpacity="1" />
            </RadialGradient>
          </Defs>

          <Circle cx="90" cy="90" r="72" fill="url(#sphereGrad)" />

          {/* Facet lines - crystalline/neural look, like the reference */}
          {[
            [90, 18, 30, 60],
            [90, 18, 150, 60],
            [30, 60, 20, 110],
            [150, 60, 160, 110],
            [30, 60, 90, 90],
            [150, 60, 90, 90],
            [20, 110, 90, 90],
            [160, 110, 90, 90],
            [20, 110, 90, 160],
            [160, 110, 90, 160],
            [90, 90, 90, 160],
            [90, 18, 90, 90],
          ].map(([x1, y1, x2, y2], i) => (
            <Line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#E8EBFF"
              strokeOpacity={0.35}
              strokeWidth={1}
            />
          ))}
        </Svg>
      </Animated.View>

      {/* Orbit Ring */}
      <View style={styles.orbitRing} />

      {/* Orbiting synapse nodes */}
      <Animated.View
        style={[styles.orbitLayer, { transform: [{ rotate: spin }] }]}
      >
        {ORBIT_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = node.radius * Math.cos(rad);
          const y = node.radius * Math.sin(rad);
          return (
            <Animated.View
              key={i}
              style={[
                styles.orbitNode,
                {
                  width: node.size,
                  height: node.size,
                  borderRadius: node.size / 2,
                  transform: [{ translateX: x }, { translateY: y }],
                  opacity: twinkleOpacity,
                },
              ]}
            />
          );
        })}
      </Animated.View>
    </View>
  );
}