import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
    paddingBottom: 30,
  },

  skipContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
  },

  skipText: {
    color: "#B9B9D5",
    fontSize: 18,
    fontWeight: "500",
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  imageGlow: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "rgba(120,120,255,0.08)",
  },

  image: {
    width: 310,
    height: 310,
  },

  textContainer: {
    alignItems: "center",
    marginTop: 10,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
  },

  highlight: {
    color: "#7A83FF",
  },

  description: {
    marginTop: 20,
    color: "#A8ACC7",
    fontSize: 18,
    lineHeight: 30,
    textAlign: "center",
    paddingHorizontal: 5,
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#5F67FF",
    marginHorizontal: 6,
  },

  inactiveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#55586E",
    marginHorizontal: 6,
  },

  button: {
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 18,
    overflow: "hidden",
  },

  buttonGradient: {
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
});