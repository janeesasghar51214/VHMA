import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 25,
  },

  image: {
    width: "100%",
    height: 230,
    alignSelf: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 42,
    marginBottom: 18,
  },

  description: {
    fontSize: 17,
    color: "#B6BCD4",
    textAlign: "center",
    lineHeight: 29,
    marginHorizontal: 6,
    marginBottom: 24,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  cardText: {
    flex: 1,
    marginLeft: 16,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#121212",
    marginBottom: 4,
  },

  cardDescription: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 22,
  },

  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5B5D77",
    marginHorizontal: 5,
  },

  activeBar: {
    width: 26,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5F67FF",
    marginHorizontal: 5,
  },

  button: {
    borderRadius: 18,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#5F67FF",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  buttonGradient: {
    height: 62,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  backText: {
    textAlign: "center",
    color: "#AEB3C7",
    fontSize: 19,
    marginTop: 22,
    fontWeight: "500",
  },

});