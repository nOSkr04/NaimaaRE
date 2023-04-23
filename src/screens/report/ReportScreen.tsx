import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";

const ReportScreen = memo(() => {
    return (
      <View style={styles.container}>
        <Text>ReportScreen</Text>
      </View>
    );
  });

  ReportScreen.displayName="ReportScreen";

export { ReportScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.primary
  }
});