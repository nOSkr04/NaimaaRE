import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { IAuth } from "../../interface/IAuth";
import { useSelector } from "react-redux";

const HeaderRight = memo(() => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);

  return (
    <TouchableOpacity>
      <Text style={styles.phone}>{user?.phone}</Text>
    </TouchableOpacity>
  );
});

HeaderRight.displayName = "HeaderRight";

export { HeaderRight };

const styles = StyleSheet.create({
  phone: {
    color      : Colors.white,
    fontWeight : "bold",
    marginRight: 20,
  },
});
