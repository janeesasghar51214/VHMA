import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  outerGlow: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#3B82F620",
  },
  middleGlow: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: "#6366F130",
  },
  orbitRing: {
    position: "absolute",
    width: 235,
    height: 235,
    borderRadius: 118,
    borderWidth: 2,
    borderColor: "#4F6EF730",
  },
  orbitLayer: {
    position: "absolute",
    width: 260,
    height: 260,
    justifyContent: "center",
    alignItems: "center",
  },
  orbitNode: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    shadowColor: "#A6B4FF",
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
});