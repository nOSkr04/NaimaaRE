import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../../constants/Colors";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ErrorText } from "../ErrorText";

export type ISignUpData = {
  phone: string;
  firstName: string;
  email: string;
  password: string;
};

type Props = {
  control: Control<ISignUpData>;
  errors: FieldErrors<ISignUpData>;
};

const SignUpForm = memo(({ control, errors }: Props) => {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Бүртгүүлэх</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            keyboardType={"number-pad"}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="Утасны дугаар"
            placeholderTextColor={Colors.black}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "Утасны дугаараа оруулна уу" }}
      />
      <View style={[styles.border, errors.phone ? styles.danger : null]} />
      {errors.phone && <ErrorText title={errors.phone?.message}  />}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="Нэрээ оруулна уу"
            placeholderTextColor={Colors.black}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "Нэрээ оруулна уу" }}
      />
      <View style={[styles.border, errors.firstName ? styles.danger : null]} />
      {errors.firstName && <ErrorText title={errors.firstName?.message}  />}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            placeholder="И мэйл хаяг оруулна уу"
            placeholderTextColor={Colors.black}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "И мэйл хаягаа оруулна уу" }}
      />
      <View style={[styles.border, errors.email ? styles.danger : null]} />
      {errors.email && <ErrorText title={errors.email?.message}  />}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.passwordContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              placeholder="Нууц үг"
              placeholderTextColor={Colors.black}
              secureTextEntry={isSecure}
              style={styles.input}
              value={value}
            
            />
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.iconContainer}>
              <Entypo color={"black"} name={!isSecure ? "eye" : "eye-with-line"} size={24} />
            </TouchableOpacity>
          </View>
        )}
        rules={{ required: "Нууц үгээ оруулна уу" }}
      />
      <View style={[styles.border, errors.password ? styles.danger : null]} />
      {errors.password && <ErrorText title={errors.password?.message}  />}
     
    </View>
  );
});

SignUpForm.displayName = "SignUpForm";

export { SignUpForm };

const styles = StyleSheet.create({
  formContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight  : "bold",
    fontSize    : 20,
    marginBottom: 20,
  },
  input: {
    flex        : 1,
    fontSize    : 16,
    marginBottom: 6
  },
  border: {
    borderWidth : 1.5,
    borderColor : Colors.primary,
    marginBottom: 18
  },
  iconContainer: {
    position: "absolute",
    padding : 8,
    right   : 0,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems   : "center",
    marginTop    : 10,
  },
  danger: {
    borderColor: Colors.danger
  }
});