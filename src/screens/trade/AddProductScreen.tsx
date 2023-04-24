import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import React, { memo } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "../../constants/Colors";
import { AddProductForm, IFormData } from "../../components/tradeWidgets/AddProductForm";
import { MyButton } from "../../widgets/MyButton";
import { useForm } from "react-hook-form";
const AddProductScreen = memo(() => {
  const height = useHeaderHeight();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors 
  } = useForm<IFormData>();
  const onSubmit = async (values: IFormData) => {
    console.log(values);
  };
  return (
    <KeyboardAvoidingView style={styles.root} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <AddProductForm clearErrors={clearErrors} control={control} errors={errors} />
        <MyButton onPress={handleSubmit(onSubmit)} title="Илгээх" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

AddProductScreen.displayName = "AddProductScreen";

export { AddProductScreen };

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
    borderRadius   : 20,
    marginTop      : 4,
  },
  container: {
    marginHorizontal: 20,
    marginTop       : 16,
  },
});
