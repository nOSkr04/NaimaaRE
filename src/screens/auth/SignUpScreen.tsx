import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { logoBlurHash } from "../../components/blurHash";
import { useForm } from "react-hook-form";
import { Colors } from "../../constants/Colors";
import { MyButton } from "../../widgets/MyButton";
import { useHeaderHeight } from "@react-navigation/elements";
import { ErrorText } from "../../components/ErrorText";
import { ISignUpData, SignUpForm } from "../../components/authWidget/SignUpForm";
import { AuthApi } from "../../apis";
import { useDispatch } from "react-redux";
import { authLogin } from "../../store/authSlice";
const SignUpScreen = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    getValues,
  } = useForm<ISignUpData>();
  const height = useHeaderHeight();
  const dispatch = useDispatch();
  const onSubmit = async (value: ISignUpData) => {
    const createData = {
      phone    : value.phone,
      email    : value.email,
      firstName: value.firstName,
      password : value.password,
    };
    try {
     const data = await AuthApi.signUp(createData);
     dispatch(authLogin(data));
      // navigation.navigate("OtpVerifyScreen", { data: value });
    } catch (err: any) {
      setError("root", {
        type: err.statusCode,
      });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formHeader}>
          <Image contentFit="contain" placeholder={logoBlurHash} source={require("../../assets/logo.png")} style={styles.logo} transition={1000} />
        </View>
        <SignUpForm clearErrors={clearErrors} control={control} errors={errors} getValues={getValues} />
        {errors.root?.type === 401 && <ErrorText title={"Бүртгэлтэй хэрэглэгч байна"} />}
        {errors.root?.type === 400 && <ErrorText title={"Утасны дугаар бүртгэлтэй байна"} />}
        <MyButton onPress={handleSubmit(onSubmit)} styleButton={styles.button} title="Бүртгүүлэх" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

SignUpScreen.displayName = "SignUpScreen";

export { SignUpScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
    borderRadius   : 20,
  },

  formHeader: {
    marginVertical: 30,
    alignSelf     : "center",
  },
  logo  : { width: 100, height: 43.4, marginTop: 50 },
  button: {
    marginHorizontal: 20,
    bottom          : 15,
  },
  buttonRow: {
    marginHorizontal: 20,
  },
  title: {
    fontSize    : 14,
    fontWeight  : "500",
    color       : Colors.silver,
    textAlign   : "center",
    marginTop   : 8,
    marginBottom: 4,
  },
});
