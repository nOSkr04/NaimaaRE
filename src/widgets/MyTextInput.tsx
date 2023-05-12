import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";
import { UseFormClearErrors } from "react-hook-form";

type Props = {
  placeholder: string;
  onBlur: any;
  onChange: any;
  value: string;
  title: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  error?: string;
  clearErrors: UseFormClearErrors<any>;
  name: string;
};

const MyTextInput = memo(({ placeholder, onBlur, onChange, value, title, keyboardType, error, name, clearErrors }: Props) => {
  return (
    <View>
      <Text style={[styles.title, error ? styles.error : null]}>{title}</Text>
      <TextInput
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={value => {
          onChange(value);
          // clearErrors(name);
        }}
        placeholder={placeholder}
        placeholderTextColor={Colors.greyText}
        style={[styles.input, error ? styles.error : null]}
        value={value}
      />
    </View>
  );
});

MyTextInput.displayName = "MyTextInput";

export { MyTextInput };

const styles = StyleSheet.create({
  input: {
    fontSize       : 14,
    borderWidth    : 1,
    borderRadius   : 8,
    borderColor    : Colors.border,
    paddingLeft    : 8,
    paddingVertical: 8,
  },
  error: {
    borderColor: Colors.danger,
    color      : Colors.danger,
  },
  title: {
    paddingLeft : 8,
    marginBottom: 4,
    fontSize    : 14,
    fontWeight  : "500",
  },
});
