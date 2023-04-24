import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";
import { MyTextInput } from "../../widgets/MyTextInput";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export type IFormData = {
  name: string;
  category: string;
  price: number;
  barCode: string;
  unit: string;
};

type Props = {
  control: Control<IFormData>;
  errors: FieldErrors<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
};

const { width } = Dimensions.get("window");

const AddProductForm = memo(({ control, errors, clearErrors }: Props) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.category?.message}
            name={"category"}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Категори"
            title="Категори"
            value={value}
          />
        )}
        rules={{
          required: { value: true, message: "Категори" },
        }}
      />
      <View style={styles.mv8} />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.name?.message}
            name={"name"}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Бүтээгдэхүүний нэр"
            title="Бүтээгдэхүүний нэр"
            value={value}
          />
        )}
        rules={{
          required: { value: true, message: "Бүтээгдэхүүний нэр" },
        }}
      />
      <View style={styles.mv8} />
      <Controller
        control={control}
        name="price"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.price?.message}
            keyboardType="number-pad"
            name={"price"}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Үнэ"
            title="Үнэ"
            value={value ? value.toString() : ""}
          />
        )}
        rules={{
          required: { value: true, message: "Үнэ" },
        }}
      />
      <View style={styles.mv8} />
      <Controller
        control={control}
        name="unit"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.unit?.message}
            keyboardType="number-pad"
            name={"unit"}
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Хэмжих нэгж"
            title="Хэмжих нэгж"
            value={value ? value.toString() : ""}
          />
        )}
        rules={{
          required: { value: true, message: "Хэмжих нэгж " },
        }}
      />
      <View style={styles.mv8} />
      <View style={styles.photo}>
        <TouchableOpacity style={styles.soloPhoto}>
          <AntDesign color={Colors.black} name="camera" size={24} />
          <Text>Зураг оруулах</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.soloPhoto}>
          <AntDesign color={Colors.black} name="pushpino" size={24} />
          <Text>Зураг дарах</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.barcode}>
        <AntDesign color={Colors.black} name="barcode" size={24} />
        <Text>Баркод уншуулах</Text>
      </TouchableOpacity>
    </View>
  );
});

AddProductForm.displayName = "AddProductForm";

export { AddProductForm };

const styles = StyleSheet.create({
  container: {},
  mv8      : {
    marginVertical: 8,
  },
  photo: {
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-between",
    width         : width * 0.9,
  },
  soloPhoto: {
    width          : "49%",
    height         : 100,
    backgroundColor: Colors.border,
    alignItems     : "center",
    justifyContent : "center",
    borderRadius   : 20,
  },
  barcode: {
    height         : 100,
    alignItems     : "center",
    justifyContent : "center",
    backgroundColor: Colors.border,
    borderRadius   : 20,
    marginTop      : 8,
    marginBottom   : 16
  },
});
