import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { logoBlurHash } from "../../components/blurHash";
import { ILoginData, LoginForm } from "../../components/authWidget/LoginForm";
import { useForm } from "react-hook-form";
import { Colors } from "../../constants/Colors";
import { AuthApi } from "../../apis";
import { authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
const LoginScreen = memo(() => {
  const { control, handleSubmit, formState: { errors } } = useForm<ILoginData>();
  const dispatch = useDispatch();
  const onSubmit = async(value: ILoginData) => {
    try {
      const res = await AuthApi.login(value);
      dispatch(authLogin(res));
    } catch(err: any) {
      console.log(err);
    }
    console.log(value);
  };
  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.root}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.root}>
          <View style={styles.formHeader}>
            <Image contentFit="contain" placeholder={logoBlurHash} source={require("../../assets/logo.png")} style={styles.logo} transition={1000} />
            <LoginForm control={control} errors={errors}  />
          </View>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={styles.buttonTitle}>Нэвтрэх</Text>
          </TouchableOpacity>
          {/* <View style={styles.detailContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")} style={styles.textButton}>
          <Text style={styles.textButtonTitle}>Нууц үг мартсан</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={() => navigation.navigate("SignUpScreen")} style={styles.textButtonTitle}>
            Бүртгүүлэх
          </Text>
        </TouchableOpacity>
      </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  formHeader: {
    alignItems: "center",
    marginTop : 100,
  },
  logo  : { width: 100, height: 43.4 },
  button: {
    alignItems     : "center",
    backgroundColor: Colors.primary,
    padding        : 10,
    justifyContent : "center",
  },
  buttonTitle    : { color: Colors.white },
  detailContainer: { marginHorizontal: 50, marginTop: 50 },
  textButton     : { marginBottom: 20 },
  textButtonTitle: { fontWeight: "bold" },
});
