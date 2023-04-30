import { KeyboardTypeOptions, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

type Props = {
  placeholder: string;
  onBlur?: any;
  onChange: any;
  value: string;
  title: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  error?: string;
  styleInput: ViewStyle
};

const MySheetInput = memo(({ placeholder, onBlur, onChange, value, title, keyboardType, error,styleInput }: Props) => {
  return (
    <View>
      <Text style={[styles.title,error ? styles.error : null ]}>{title}</Text>
      <BottomSheetTextInput
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={value => onChange(value)}
        placeholder={placeholder}
        placeholderTextColor={Colors.greyText}
        style={[styles.input, error ? styles.error : null, styleInput]}
        value={value}
      />
     
    </View>
  );
});

MySheetInput.displayName = "MySheetInput";

export { MySheetInput };

const styles = StyleSheet.create({
  input: {
    fontSize       : 14,
    borderWidth    : 1,
    borderRadius   : 8,
    borderColor    : Colors.border,
    paddingLeft    : 8,
    paddingVertical: 4,
  },
  error: {
    borderColor: Colors.danger,
    color      : Colors.danger
  },
  title: {
  paddingLeft : 8,
  marginBottom: 4,
  fontSize    : 14,
  fontWeight  : "500",
  }
});
