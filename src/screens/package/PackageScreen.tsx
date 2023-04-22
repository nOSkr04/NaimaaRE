import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const PackageScreen = memo(() => {
    return (
      <View style={styles.root}>
        <Text>PackageScreen</Text>
      </View>
    );
  });

  PackageScreen.displayName="PackageScreen";

export { PackageScreen };

const styles = StyleSheet.create({ root: {
  flex: 1
} });