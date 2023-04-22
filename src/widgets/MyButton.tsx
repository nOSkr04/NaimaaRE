import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity,  ViewStyle } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";

type Props ={
    styleButton?: ViewStyle;
    title?: string;
    textStyle?: TextStyle;
    onPress?: (event: GestureResponderEvent) => void
}

const MyButton = memo(({ styleButton,title,textStyle, onPress }: Props) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, { ...styleButton }]}>
        <Text style={[styles.title, { ...textStyle }]}>{title}</Text>
      </TouchableOpacity>
    );
  });

  MyButton.displayName="MyButton";

export { MyButton };

const styles = StyleSheet.create({
    container: {
        alignItems     : "center",
        justifyContent : "center",
        padding        : 8,
        backgroundColor: Colors.primary,
        borderRadius   : 8,
    },
    title: {
        color: Colors.white
    }
});