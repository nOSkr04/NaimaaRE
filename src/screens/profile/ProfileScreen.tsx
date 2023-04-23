import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { IAuth } from "../../interface/IAuth";
import { useSelector } from "react-redux";

const ProfileScreen = memo(() => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
    return (
      <View>
        <Text style={styles.text}>{user?.phone}</Text>
      </View>
    );
  });

  ProfileScreen.displayName="ProfileScreen";

export { ProfileScreen };

const styles = StyleSheet.create({
  text: {
    fontSize: 50
  }
});