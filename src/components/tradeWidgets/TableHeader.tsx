import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { Divider } from "../../widgets/Divider";
const { width } = Dimensions.get("window");

const TableHeader = memo(() => {
  return (
    <View>
      <View style={styles.root}>
        <Text style={styles.nameContainer}>Барааны нэр</Text>
        <Text style={styles.priceContainer}>Үнэ</Text>
        <Text style={styles.sizeContainer}>Хэмжээ</Text>
        <View style={styles.widgetContainer} />
      </View>
      <Divider custom={styles.divider} />
    </View>
  );
});

TableHeader.displayName = "TableHeader";

export { TableHeader };

const styles = StyleSheet.create({
  root: {
    marginTop           : 4,
    backgroundColor     : Colors.white,
    paddingHorizontal   : 20,
    flexDirection       : "row",
    width               : width,
    borderTopLeftRadius : 20,
    borderTopRightRadius: 20,
    marginBottom        : 4
  },
  nameContainer: {
    fontSize  : 14,
    width     : "40%",
    color     : Colors.greyText,
    fontWeight: "bold",
  },
  priceContainer: {
    fontSize  : 14,
    width     : "20%",
    color     : Colors.greyText,
    fontWeight: "bold"
  },
  sizeContainer: {
    fontSize  : 14,
    width     : "20%",
    color     : Colors.greyText,
    fontWeight: "bold"
  },
  widgetContainer: {
    flexDirection: "row",
    alignItems   : "center",
    width        : "20%",
  },
  divider: {
    marginBottom    : 12,
    marginHorizontal: 20
  }
});
