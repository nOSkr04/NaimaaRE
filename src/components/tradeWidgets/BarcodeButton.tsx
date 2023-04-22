import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
const BarcodeButton = memo(() => {
    return (
      <TouchableOpacity style={styles.container}>
        <Text>Filter</Text>
        <AntDesign name="filter" size={16}  />
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
    }
});