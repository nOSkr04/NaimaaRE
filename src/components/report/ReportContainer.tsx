import {  Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { ReportType } from "../../screens/report/ReportScreen";
import { Colors } from "../../constants/Colors";

const { width } = Dimensions.get("window");

const ReportContainer = memo(({ item }: { item: ReportType }) => {
  return (
    <TouchableOpacity onPress={item.onPress} style={styles.content}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
});

ReportContainer.displayName = "ReportContainer";

export { ReportContainer };

const styles = StyleSheet.create({
  content: {
    marginRight      : 8,
    paddingHorizontal: 8,
    marginTop        : 8,
    paddingVertical  : 16,
    backgroundColor  : Colors.smokeWhite,
    borderWidth      : 1,
    borderRadius     : 8,
    width            : width * 0.44,
    borderColor      : Colors.border,
    alignItems       : "center",
  },
  title: {
    fontSize  : 14,
    fontWeight: "bold",
    textAlign : "center",
    marginTop : 8
  },
  iconContainer: {
    backgroundColor: Colors.border,
    alignItems     : "center",
    justifyContent : "center",
    width          : 48,
    height         : 48,
    borderRadius   : 100,
  },
});
