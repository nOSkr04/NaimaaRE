import { StyleSheet, Text, TextInput,   TextInputProps,   TextStyle,  ViewStyle } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

type Props = {
    title?: string
    placeholder?: string
    value?:any
    onChangeText?:any
    styleInput?: ViewStyle
    styleText?: TextStyle
    keyboardType?: string
} & TextInputProps;

const MyField = ({ title, placeholder, value, onChangeText, styleInput,styleText,keyboardType }: Props) => {
  return (
    <>
      {title && 
        <Text style={[styles.text, { ...styleText }]}>{title}</Text>
    }
      <TextInput keyboardType={keyboardType} onChangeText={onChangeText} placeholder={placeholder} style={[styles.input, { ...styleInput }]} value={value}    />
    </>
  );
};

export default MyField;

const styles = StyleSheet.create({
    input: {
        borderWidth : 1,
        paddingLeft : 8,
        borderRadius: 8,
        borderColor : Colors.greyText,
        padding     : 4
    },
    text: {
           paddingLeft : 8,
           marginBottom: 4,
           fontWeight  : "600",
           fontSize    : 16
    }
});