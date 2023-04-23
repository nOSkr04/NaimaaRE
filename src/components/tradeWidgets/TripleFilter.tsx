import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import React, { memo } from "react";
import { AntDesign,Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");


const TripleFilter = memo(() => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => navigation.navigate("SelectCategorySheet")} style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Категори{"  "}</Text>
        <AntDesign color={Colors.greyText} name="down" size={8}  />
      </TouchableOpacity>
      <TextInput placeholder="Бараа хайх" placeholderTextColor={Colors.greyText} style={styles.nameContainer}  />
      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons color={Colors.greyText} name="image" size={16} />
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
    width            : "65%",
    borderWidth      : 1,
    alignItems       : "center",
    paddingHorizontal: 8,
    borderColor      : Colors.border
  },
  iconContainer: {
    width                  : "10%",
    borderWidth            : 1,
    alignItems             : "center",
    padding                : 8,
    borderColor            : Colors.border,
    borderTopRightRadius   : 8,
    borderBottomRightRadius: 8
  },
  categoryText: {
    fontSize: 10,
    color   : Colors.greyText
  }
});
