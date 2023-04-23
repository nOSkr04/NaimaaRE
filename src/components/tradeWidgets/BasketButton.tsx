import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const BasketButton = memo(({ value }: { value?: number }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("BasketSheet")} style={styles.container}>
      <FontAwesome color={Colors.secondaryPrimary} name="shopping-basket" size={20} />
      {value ? <Text style={styles.text}>{value}</Text> : null}
    </TouchableOpacity>
  );
});

BasketButton.displayName = "BasketButton";

export { BasketButton };

const styles = StyleSheet.create({
  container: {
    position       : "absolute",
    right          : 20,
    bottom         : 20,
    height         : 48,
    width          : 48,
    backgroundColor: Colors.primary,
    alignItems     : "center",
    justifyContent : "center",
    borderRadius   : 100,
  },
  text: {
    fontSize         : 12,
    position         : "absolute",
    left             : 4,
    top              : -5,
    backgroundColor  : Colors.fbColor,
    color            : Colors.white,
    padding          : 2,
    borderRadius     : 100,
    fontWeight       : "bold",
    paddingHorizontal: 5,
  },
});
