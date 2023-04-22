import { Dimensions, StyleSheet, Text,  View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
const { width } = Dimensions.get("window");

const TableHeader = memo(() => {
    return (
      <View style={styles.root}>
        <Text style={styles.nameContainer} >Ner</Text>
        <Text style={styles.priceContainer}>une</Text>
        <Text style={styles.sizeContainer}>hemjee</Text>
        <View style={styles.widgetContainer} />
      </View>
    );
  });

  TableHeader.displayName="TableHeader";

export { TableHeader };

const styles = StyleSheet.create({
    root: {
        marginTop           : 4,
        backgroundColor     : Colors.white,
        paddingVertical     : 16,
        paddingHorizontal   : 20,
        flexDirection       : "row",
        width               : width,
        borderTopLeftRadius : 20,
        borderTopRightRadius: 20
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
    }
});