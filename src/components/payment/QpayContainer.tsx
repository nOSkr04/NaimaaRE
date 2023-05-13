import { Linking, StyleSheet, Text,TouchableOpacity,  } from "react-native";
import React, { memo } from "react";
import { Urls } from "../../sheets/QpaySheet";
import { Image } from "expo-image";



const QpayContainer = memo(({ item } : {item: Urls}) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(`${item.link}`)} style={styles.container}>
        <Image source={item.logo} style={styles.logo} />
        <Text style={styles.bankText}>{item.description}</Text>
      </TouchableOpacity>
    );
  });

  QpayContainer.displayName="QpayContainer";

export { QpayContainer };

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems   : "center",
        marginTop    : 10
      },
      logo: {
        width       : 60,
        height      : 60,
        borderRadius: 20
      },
      bankText: {
        marginLeft: 8,
    
      }
});