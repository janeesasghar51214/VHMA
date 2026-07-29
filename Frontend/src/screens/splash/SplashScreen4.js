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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./SplashScreen4Styles";

export default function SplashScreen4({ navigation }) {

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim,{
      toValue:1,
      duration:700,
      useNativeDriver:true,
    }).start();
  },[]);

  return (

    <Animated.View
      style={{
        flex:1,
        opacity:fadeAnim,
      }}
    >

      <LinearGradient
        colors={["#0B1020","#171B2F","#0B1020"]}
        style={styles.container}
      >

        <SafeAreaView style={styles.safeArea}>

          {/* Image */}

          <Image
            source={require("../../assets/images/splash/digital_sanctuary.png")}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Heading */}

          <Text style={styles.title}>
            Your Safe Space{"\n"}for Well-being
          </Text>

          {/* Description */}

          <Text style={styles.description}>
            Your conversations, mood check-ins,
            journals, and wellness insights remain
            private and secure. VMHA is here to
            support your journey with compassion.
          </Text>

          {/* Cards */}

          <View style={styles.card}>

            <MaterialCommunityIcons
              name="shield-lock"
              size={34}
              color="#6C72FF"
            />

            <View style={styles.cardText}>

              <Text style={styles.cardTitle}>
                Private & Secure
              </Text>

              <Text style={styles.cardDescription}>
                Your personal wellness data is encrypted and protected.
              </Text>

            </View>

          </View>

          <View style={styles.card}>

            <MaterialCommunityIcons
              name="account-group"
              size={34}
              color="#6C72FF"
            />

            <View style={styles.cardText}>

              <Text style={styles.cardTitle}>
                Judgment-Free Support
              </Text>

              <Text style={styles.cardDescription}>
                Express yourself openly in a safe and welcoming environment.
              </Text>

            </View>

          </View>

          <View style={styles.card}>

            <MaterialCommunityIcons
              name="star-four-points"
              size={34}
              color="#6C72FF"
            />

            <View style={styles.cardText}>

              <Text style={styles.cardTitle}>
                Designed for You
              </Text>

              <Text style={styles.cardDescription}>
                Receive personalized insights, recommendations and encouragement.
              </Text>

            </View>

          </View>

          {/* Indicator */}

          <View style={styles.indicatorContainer}>

            <View style={styles.inactiveDot}/>
            <View style={styles.inactiveDot}/>
            <View style={styles.activeBar}/>

          </View>

          {/* Get Started */}

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={() => {
               console.log("Navigate to Login");
             }}
          >

            <LinearGradient
              colors={["#5A5FFF","#7478FF"]}
              style={styles.buttonGradient}
            >

              <Text style={styles.buttonText}>
                Get Started
              </Text>

              <Ionicons
                name="arrow-forward"
                color="white"
                size={24}
                style={{marginLeft:10}}
              />

            </LinearGradient>

          </TouchableOpacity>

          {/* Back */}

          <TouchableOpacity
            onPress={()=>navigation.goBack()}
          >

            <Text style={styles.backText}>
              Back
            </Text>

          </TouchableOpacity>

        </SafeAreaView>

      </LinearGradient>

    </Animated.View>

  );

}