import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { Image } from "expo-image";
import { logoBlurHash } from "../../components/blurHash";
import { ILoginData, LoginForm } from "../../components/authWidget/LoginForm";
import { useForm } from "react-hook-form";
import { Colors } from "../../constants/Colors";
import { AuthApi } from "../../apis";
import { authLogin } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { MyButton } from "../../widgets/MyButton";
import { useHeaderHeight } from "@react-navigation/elements";
import { ErrorText } from "../../components/ErrorText";
const LoginScreen = memo(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ILoginData>();
  const dispatch = useDispatch();
  const height = useHeaderHeight();
  const onSubmit = async (value: ILoginData) => {
    try {
      const res = await AuthApi.login(value);
      dispatch(authLogin(res));
    } catch (err: any) {
      setError("root", {
        type: err.statusCode
      });
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formHeader}>
          <Image contentFit="contain" placeholder={logoBlurHash} source={require("../../assets/logo.png")} style={styles.logo} transition={1000} />
        </View>
        <LoginForm control={control} errors={errors} />
        {errors.root?.type === 401 && <ErrorText title={"Утасны дугаар нууц үгээ зөв оруулна уу"}  />}
      </ScrollView>
      <MyButton onPress={handleSubmit(onSubmit)} styleButton={styles.button} title="Нэвтрэх" />
    </KeyboardAvoidingView>
  );
});

LoginScreen.displayName = "LoginScreen";

export { LoginScreen };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
    borderRadius   : 20,
    marginTop      : 4,
  },

  formHeader: {
    marginVertical: 30,
    alignSelf     : "center",
  },
  logo  : { width: 100, height: 43.4 },
  button: {
    marginHorizontal: 20,
    bottom          : 15
  },
});
