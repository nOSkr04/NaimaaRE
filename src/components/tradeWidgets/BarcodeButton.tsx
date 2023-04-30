import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const BarcodeButton = memo(() => {
  const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate("BarcodeScreen")} style={styles.container}>
        <Text style={styles.text}>Баркодоор хайх</Text>
        <AntDesign color={Colors.greyText} name="barcode" size={16}  />
      </TouchableOpacity>
    );
  });

  BarcodeButton.displayName="BarcodeButton";

export { BarcodeButton };

const styles = StyleSheet.create({
    container: {
        borderWidth   : 1,
        borderRadius  : 8,
        padding       : 8,
        flexDirection : "row",
        justifyContent: "space-between",
        alignItems    : "center",
        borderColor   : Colors.border
    },
    text: {
      paddingLeft: 8,
      color      : Colors.greyText
    }
});