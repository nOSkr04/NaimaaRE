import { Dimensions, StyleSheet,  TextInput, View } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const IconField = memo(() => {
    return (
      <View style={styles.container}>
        <TextInput style={styles.field}/>
        <View style={styles.iconContainer}>
          <AntDesign name="filter" size={16}   />
        </View>
      </View>
    );
  });

  IconField.displayName="IconField";

export { IconField };

const styles = StyleSheet.create({
  container: {
     flexDirection: "row"
  },
  field: {
    borderWidth : 1,
    width       : width* 0.9,
    borderRadius: 8,
    padding     : 8
  },
  iconContainer: {
    position : "absolute",
    alignSelf: "center",
    right    : 10
  }
});