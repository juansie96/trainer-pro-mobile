import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  root: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  boxShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  flexRowCenter: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  flexRowBetweenCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexShrink: 1,
  },
  stackBetween: {
    justifyContent: "space-between",
  },
});
