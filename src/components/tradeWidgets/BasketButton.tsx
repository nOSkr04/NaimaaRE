import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const BasketButton = memo(({ value }: { value?: number }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("BasketSheet")} style={styles.container}>
      <FontAwesome color={value ? Colors.secondaryPrimary : Colors.white} name="shopping-basket" size={20} />
      {value ? (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{value}</Text>
        </View>
      ) : null}
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
    fontSize  : 12,
    color     : Colors.white,
    fontWeight: "bold",
  },
  textContainer: {
    position       : "absolute",
    left           : 4,
    top            : -2,
    borderRadius   : 100,
    height         : 20,
    width          : 20,
    backgroundColor: Colors.fbColor,
    alignItems     : "center",justifyContent : "center"
  },
});
