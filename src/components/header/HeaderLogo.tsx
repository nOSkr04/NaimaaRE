import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { logoBlurHash } from "../blurHash";
const HeaderLogo = memo(() => {
    return (
      <Image
        contentFit="contain"
        placeholder={logoBlurHash}
        source={require("../../assets/logo.png")}
        style={styles.image}
        transition={1000}
      />
    );
  });

  HeaderLogo.displayName="HeaderLogo";

export { HeaderLogo };

const styles = StyleSheet.create({
    image: {
        height: 50,
        width : 50,
    }
});