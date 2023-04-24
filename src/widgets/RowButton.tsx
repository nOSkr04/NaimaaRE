import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode, memo } from "react";
import { Divider } from "./Divider";

type Props = {
    title: string,
    icon?: ReactNode,
    onPress?:(event: GestureResponderEvent) => void
}

const RowButton = memo(({ title,icon,onPress }: Props) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          {icon && icon }
          <Text style={styles.title}>{title}</Text>
        </View>
        <Divider/>
      </TouchableOpacity>
    );
  });

  RowButton.displayName="RowButton";

export { RowButton };

const styles = StyleSheet.create({
  container: {
    flexDirection : "row",
    alignItems    : "center",
    marginVertical: 8
  },
  title: {
    fontSize  : 18,
    fontWeight: "500",
    marginLeft: 8
  }
});