import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";

const HeaderRight = memo(() => {
  return (
    <TouchableOpacity>
      <Text style={styles.phone}>88334411</Text>
    </TouchableOpacity>
  );
});

HeaderRight.displayName = "HeaderRight";

export { HeaderRight };

const styles = StyleSheet.create({
  phone: {
    color      : Colors.white,
    fontWeight : "bold",
    marginRight: 20,
  },
});
