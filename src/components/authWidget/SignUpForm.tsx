import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../../constants/Colors";
import { Control, Controller, FieldErrors, UseFormClearErrors, UseFormGetValues } from "react-hook-form";
import { ErrorText } from "../ErrorText";

export type ISignUpData = {
  phone: string;
  password: string;
  email: string;
  firstName: string;
  cpassword: string
};

type Props = {
  control: Control<ISignUpData>;
  errors: FieldErrors<{
    phone: string;
    password: string;
    email: string;
    firstName: string;
    cpassword: string
  }>;
  clearErrors: UseFormClearErrors<ISignUpData>;
  getValues:UseFormGetValues<ISignUpData>
};

  const SignUpForm = memo(({ control, errors,clearErrors,getValues }: Props) => {
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Бүртгүүлэх</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value,ref } }) => (
          <TextInput
            keyboardType={"number-pad"}
            onBlur={onBlur}
            onChangeText={value => {onChange(value); clearErrors("phone");}}
            placeholder="Утасны дугаар"
            placeholderTextColor={errors.phone ? Colors.danger : Colors.black}
            ref={ref}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "Утасны дугаараа оруулна уу", minLength: 7 }}
      />
      <View style={[styles.border, errors.password ? styles.danger : null]} />
      {errors.phone && <ErrorText title={errors.phone?.message}  />}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value,ref } }) => (
          <TextInput
            keyboardType={"email-address"}
            onBlur={onBlur}
            onChangeText={value => {onChange(value); clearErrors("email");}}
            placeholder="И-мэйл хаяг"
            placeholderTextColor={errors.email ? Colors.danger : Colors.black}
            ref={ref}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "И-мэйл хаягаа оруулна уу", minLength: 4 }}
      />
      <View style={[styles.border, errors.password ? styles.danger : null]} />
      {errors.email && <ErrorText title={errors.email?.message}  />}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value,ref } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={value => {onChange(value); clearErrors("firstName");}}
            placeholder="Овог нэр"
            placeholderTextColor={errors.email ? Colors.danger : Colors.black}
            ref={ref}
            style={styles.input}
            value={value}
          />
        )}
        rules={{ required: "Овог нэрээ оруулна уу", minLength: 2 }}
      />
      <View style={[styles.border, errors.firstName ? styles.danger : null]} />
      {errors.firstName && <ErrorText title={errors.firstName?.message}  />}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value,ref } }) => (
          <View style={styles.passwordContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={value => {onChange(value); clearErrors("password");}}
              placeholder="Нууц үг"
              placeholderTextColor={errors.password ? Colors.danger : Colors.black}
              ref={ref}
              secureTextEntry={isSecure}
              style={styles.input}
              value={value}
            />
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.iconContainer}>
              <Entypo  color={errors.password ? Colors.danger : Colors.black} name={!isSecure ? "eye" : "eye-with-line"} size={24} />
            </TouchableOpacity>
          </View>
        )}
        rules={{ required: "Нууц үгээ оруулна уу" }}
      />
      <View style={[styles.border, errors.password ? styles.danger : null]} />
      {errors.password && <ErrorText title={errors.password?.message}  />}
    
      <Controller
        control={control}
        name="cpassword"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <View style={styles.passwordContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={value => {onChange(value); clearErrors("cpassword");}}
              placeholder="Нууц үг баталгаажуулах"
              placeholderTextColor={errors.password ? Colors.danger : Colors.black}
              ref={ref}
              secureTextEntry={isSecure}
              style={styles.input}
              value={value}
            />
            <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.iconContainer}>
              <Entypo  color={errors.cpassword ? Colors.danger : Colors.black} name={!isSecure ? "eye" : "eye-with-line"} size={24} />
            </TouchableOpacity>
          </View>
        )}
        rules={{ validate: (value) => {
          const { password } = getValues();
          return password === value || "Нууц үг тохирсонгүй";
        }   }}
      />
      <View style={[styles.border, errors.cpassword ? styles.danger : null]} />
      {errors.cpassword && <ErrorText title={errors.cpassword?.message}  />}
     
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
    backgroundColor: Colors.primary,
    marginBottom   : 18,
    height         : 4,
    marginTop      : 4
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
    backgroundColor: Colors.danger
  }
});
