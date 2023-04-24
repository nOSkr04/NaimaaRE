import { StyleSheet, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const HeaderBackButton = memo(() => {
  const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
        <AntDesign color={Colors.white} name="arrowleft" size={24}  />
      </TouchableOpacity>
    );
  });

  HeaderBackButton.displayName="HeaderBackButton";

export { HeaderBackButton };

const styles = StyleSheet.create({
  container: {
      padding: 8
    }
});