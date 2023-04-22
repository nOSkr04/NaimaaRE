import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../../constants/Colors";
import { Control, Controller,FieldErrors } from "react-hook-form";

export type ILoginData = {
  phone: string;
  password: string;
};

type Props = {
  control: Control<ILoginData>;
  errors: FieldErrors<{
    phone: string;
    password: string;
  }>;
};

const LoginForm = memo(({ control, errors }: Props) => {
  return (
    <>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Нэвтрэх</Text>
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType={"number-pad"}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              placeholder="Утасны дугаар"
              placeholderTextColor={"black"}
              style={styles.input}
              value={value}
            />
          )}
          rules={{ required: "Утас заавал оруулна ",  }}
        />
        {errors.phone && 
          <Text> aldaa </Text>
        }
        <View style={styles.border} />
        <View style={styles.passwordContainer}>
          <TextInput placeholder="Нууц үг *" placeholderTextColor={"black"} style={styles.input} />
          <TouchableOpacity style={styles.iconContainer}>
            {/* <Entypo color={"black"} name={isSecure ? "eye" : "eye-with-line"} size={24} /> */}
            <Entypo color={"black"} name="eye" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.border} />
      </View>
    </>
  );
});

LoginForm.displayName = "LoginForm";

export { LoginForm };

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 50,
    marginTop       : 100,
  },
  title: {
    fontWeight  : "bold",
    fontSize    : 20,
    marginBottom: 20,
  },
  input: {
    flex        : 1,
    fontSize    : 16,
    marginBottom: 20,
  },
  border: {
    borderWidth   : 1,
    borderColor   : Colors.primary,
    marginVertical: 5,
  },
  iconContainer: {
    position: "absolute",
    padding : 15,
    right   : 0,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems   : "center",
    marginTop    : 10,
  },
});
