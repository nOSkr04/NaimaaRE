import {  Text, View } from "react-native";
import React, { memo } from "react";

const LoginScreen = memo(() => {
    return (
      <View>
        <Text>LoginScreen</Text>
      </View>
    );
  });

  LoginScreen.displayName="LoginScreen";

export { LoginScreen };

// const styles = StyleSheet.create({});