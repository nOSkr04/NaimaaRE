import { StyleSheet,  View, ViewStyle } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";

const Divider = memo(({ custom } : {custom?: ViewStyle}) => {
    return (
      <View style={[styles.divider,  custom ]} />
    );
  });

  Divider.displayName="Divider";

export { Divider };

const styles = StyleSheet.create({
    divider: {
        borderWidth: 1,
        borderColor: Colors.border
    }
});