import { Text } from "@rneui/base";
import React from "react";
import { TextStyle, View } from "react-native";

type IFontWeight =
  | "bold"
  | "400"
  | "normal"
  | "100"
  | "200"
  | "300"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;

const TPText = ({
  fs,
  fw,
  mx,
  my,
  mt,
  mb,
  mr,
  ml,
  bold,
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
  bold?: boolean;
  children: React.ReactNode;
} & TextStyle) => {
  return (
    <View
      style={{
        marginHorizontal: mx || undefined,
        marginVertical: my || undefined,
        marginTop: mt || undefined,
        marginBottom: mb || undefined,
        marginLeft: ml || undefined,
        marginRight: mr || undefined,
      }}
    >
      <Text
        style={{
          fontWeight: fw ? (String(fw) as IFontWeight) : bold ? "700" : "400",
          fontSize: fs ? fs : 16,
          ...textStyles,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

export default TPText;
