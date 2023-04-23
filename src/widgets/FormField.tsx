import { StyleSheet, Text, TextInput,  } from "react-native";
import React, { memo } from "react";
import { useField } from "../components/form/Form";

type Props = {
    placeholder?: string;
    label?: string;
    name: string
}

const FormField = memo(({ placeholder,label,name }: Props) => {
    const { value, onChange } = useField(name);
    return (
      <>
        <Text>{label}</Text>
        <TextInput onChangeText={onChange} placeholder={placeholder} style={styles.input} value={value}   />
      </>
    );
  });

  FormField.displayName="FormField";

export { FormField };

const styles = StyleSheet.create({
    input: {
        borderWidth: 1
    }
});