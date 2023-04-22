import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";

const ProfileScreen = memo(() => {
    return (
      <View>
        <Text>ProfileScreen</Text>
      </View>
    );
  });

  ProfileScreen.displayName="ProfileScreen";

export { ProfileScreen };

const styles = StyleSheet.create({});