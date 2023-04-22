import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const ListScreen = memo(() => {
    return (
      <View>
        <Text>ListScreen</Text>
      </View>
    );
  });

  ListScreen.displayName="ListScreen";

export{ ListScreen };

const styles = StyleSheet.create({});