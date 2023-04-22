import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
const { width } = Dimensions.get("window");


const TripleFilter = memo(() => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text>filter</Text>
        <AntDesign name="down" size={12}  />
      </TouchableOpacity>
      <TextInput placeholder="filter" style={styles.nameContainer}  />
      <TouchableOpacity style={styles.iconContainer}>
        <AntDesign name="info" size={20}  />
      </TouchableOpacity>
    </View>
  );
});

TripleFilter.displayName = "TripleFilter";

export { TripleFilter };

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width        : width*0.9,
    marginTop    : 4,
    marginBottom : 8
  },
  categoryContainer: {
    width                 : "25%",
    borderWidth           : 1,
    alignItems            : "center",
    flexDirection         : "row",
    justifyContent        : "center",
    padding               : 8,
    borderTopLeftRadius   : 8,
    borderBottomLeftRadius: 8,
    borderColor           : Colors.border
  },
  nameContainer: {
    width      : "65%",
    borderWidth: 1,
    alignItems : "center",
    padding    : 8,
    borderColor: Colors.border
  },
  iconContainer: {
    width                  : "10%",
    borderWidth            : 1,
    alignItems             : "center",
    padding                : 8,
    borderColor            : Colors.border,
    borderTopRightRadius   : 8,
    borderBottomRightRadius: 8
  }
});
