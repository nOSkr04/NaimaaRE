import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import AntDesign  from "@expo/vector-icons/AntDesign";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const SheetHeader = memo(({ title } : {title?: string}) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}  >
          <AntDesign name="arrowleft" size={16}  />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Pressable style={styles.iconContainer}>
          <AntDesign color={Colors.white} name="arrowleft" size={16}  />
        </Pressable>
      </View>
    );
  });

  SheetHeader.displayName="SheetHeader";

export { SheetHeader };

const styles = StyleSheet.create({
    container: {
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "center",
        marginHorizontal: 8
    },
    iconContainer: {
        padding: 8
    },
    title: {
        textAlign : "center",
        fontWeight: "bold",
        fontSize  : 16,
    }
});