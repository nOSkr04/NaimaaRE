import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
const ProductList = memo(({ item }: { item: any }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.nameContainer}>{item.name}</Text>
        <Text style={styles.priceContainer} >{item.price}</Text>
        <Text style={styles.sizeContainer}>{item.name}</Text>
        <View style={styles.widgetContainer}>
          <TouchableOpacity>
            <AntDesign name="QQ"  />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="QQ"  />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.border}/>
    </>
  );
});

ProductList.displayName = "ProductList";

export { ProductList };

const styles = StyleSheet.create({
    container: {
        flexDirection    : "row",
        backgroundColor  : Colors.white,
        paddingBottom    : 8,
        paddingHorizontal: 20,
        alignItems       : "center"
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.border,
    },
    nameContainer: {
      fontSize: 14,
      width   : "40%",
  },
  priceContainer: {
      fontSize: 14,
      width   : "20%",
  },
  sizeContainer: {
      fontSize: 14,
      width   : "20%",
  },
  widgetContainer: {
      flexDirection: "row",
      alignItems   : "center",
      width        : "20%",
  },
  icon:{
    
  }
});
