import { StyleSheet } from "react-native";
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 25,
  },

  /* ---------- Logo ---------- */

  logoContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },

  logoCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: "#141F38",
    borderWidth: 2,
    borderColor: "#495DFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#5B6CFF",
    shadowOpacity: 0.7,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 12,
  },

  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* ---------- Brain ---------- */

  brainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  /* ---------- Loading ---------- */

  loadingContainer: {
    marginTop: -10,
    marginBottom: 30,
  },

  /* ---------- Text ---------- */

  textContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  title: {
    color: COLORS.white,
    fontSize: 31,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 42,
  },

  subtitle: {
    marginTop: 18,
    color: COLORS.textSecondary,
    fontSize: 17,
    textAlign: "center",
    lineHeight: 28,
    paddingHorizontal: 10,
  },

  /* ---------- Bottom Progress ---------- */

  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  activeBar: {
    width: 45,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#6A7BFF",
    marginHorizontal: 5,
  },

  inactiveBar: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#384766",
    marginHorizontal: 5,
  },
});

export default styles;