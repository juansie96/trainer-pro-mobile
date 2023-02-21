import { Text } from "@rneui/base";
import { useFonts } from "expo-font";
import React from "react";
import { TextStyle, View } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../utils/fonts";

type ITypes =
  | "thin"
  | "thinItalic"
  | "light"
  | "lightItalic"
  | "medium"
  | "mediumItalic"
  | "regular"
  | "bold"
  | "boldItalic"
  | "black"
  | "blackItalic";

const FONT_TYPES = {
  thin: "Roboto-Thin",
  thinItalic: "Roboto-ThinItalic",
  light: "Roboto-Light",
  lightItalic: "Roboto-LightItalic",
  medium: "Roboto-Medium",
  mediumItalic: "Roboto-MediumItalic",
  regular: "Roboto-Regular",
  bold: "Roboto-Bold",
  boldItalic: "Roboto-BoldItalic",
  black: "Roboto-Black",
  blackItalic: "Roboto-BlackItalic",
};

const TPText = ({
  fs,
  fw,
  mx,
  my,
  mt,
  mb,
  mr,
  ml,
  m,
  bold,
  type,
  gray,
  children,
  ...textStyles
}: {
  fs?: number;
  fw?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  m?: number;
  bold?: boolean;
  type?: ITypes;
  gray?: boolean;
  children: React.ReactNode;
} & TextStyle) => {
  const [fontsLoaded] = useFonts(fonts);
  return (
    <View
      style={{
        marginHorizontal: mx || undefined,
        marginVertical: my || undefined,
        marginTop: mt || undefined,
        marginBottom: mb || undefined,
        marginLeft: ml || undefined,
        marginRight: mr || undefined,
        margin: m || undefined,
        flexShrink: 1,
      }}
    >
      <Text
        style={{
          fontFamily: type ? FONT_TYPES[type] : "Roboto-Regular",
          fontWeight: bold ? "700" : undefined,
          fontSize: fs ? fs : 16,
          color: gray ? colors.gray[200] : undefined,
          ...textStyles,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default TPText;
