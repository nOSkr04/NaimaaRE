import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const ExpenseTab = memo(() => {
    return (
      <View>
        <Text>ExpenseTab</Text>
      </View>
    );
  });

  ExpenseTab.displayName="ExpenseTab";

export { ExpenseTab };

const styles = StyleSheet.create({});