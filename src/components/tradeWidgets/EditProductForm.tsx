import {   StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";
import { MyTextInput } from "../../widgets/MyTextInput";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { ICategory } from "../../interface/ICategory";

import { IGoods } from "../../interface/IGoods";

export type IFormData = {
  name: string;
  category: ICategory;
  price: number;
  barCode: string;
  unit: string;
};

type Props = {
  control: Control<IFormData>;
  errors: FieldErrors<IFormData>;
  clearErrors: UseFormClearErrors<IFormData>;
  handleSheetChanges: (index: number) => void;
  result: string;
  libImage: string;
  setLibImage: React.Dispatch<React.SetStateAction<string>>;
  cameraImage: string;
  setCameraImage: React.Dispatch<React.SetStateAction<string>>;
  data?: IGoods;
};

// const { width } = Dimensions.get("window");

const EditProductForm = memo((props: Props) => {
  const {
    control,
    errors,
    clearErrors,
    handleSheetChanges,
    result,
    //  libImage,
    //  setLibImage,
    //  cameraImage,
    //  setCameraImage,
    data,
  } = props;
  const navigation = useNavigation();

  // const openProductImageLibrary = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     Alert.alert("Зургийн эрхийг нээнэ үү?");
  //   }

  //   if (status === "granted") {
  //     const response = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes   : ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //     });
  //     if (!response.canceled) {
  //       setLibImage(response.assets[0].uri);
  //       setCameraImage("");
  //     }
  //   }
  // };

  // const openCamera = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     Alert.alert("Камераны эрхийг нээнэ үү?");
  //   }
  //   if (status === "granted") {
  //     const response = await ImagePicker.launchCameraAsync({
  //       allowsEditing: true,
  //     });
  //     if (!response.canceled) {
  //       setCameraImage(response.assets[0].uri);
  //       setLibImage("");
  //     }
  //   }
  // };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[styles.title, errors.category?.message ? styles.error : null]}>Категори</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("FormSelectCategory", { onChange: onChange, clearErrors: clearErrors })}
              style={[styles.selectSheet, errors.category?.message ? styles.error : null]}>
              <Text style={value ? styles.primeText : styles.selectText}>{value ? value?.name : "Категори"}</Text>
              <AntDesign color={value ? Colors.black : Colors.greyText} name="down" size={14} />
            </TouchableOpacity>
          </>
        )}
        rules={{
          required: { value: true, message: "category" },
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
          required: { value: true, message: "name" },
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
          required: { value: true, message: "price" },
        }}
      />
      <View style={styles.mv8} />
      <Controller
        control={control}
        name="unit"
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[styles.title, errors.unit?.message ? styles.error : null]}>Хэмжих нэгж</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("FormSelectUnit", { onChange: onChange, clearErrors: clearErrors })}
              style={[styles.selectSheet, errors.unit?.message ? styles.error : null]}>
              <Text style={value ? styles.primeText : styles.selectText}>{value ? value : "Хэмжих нэгж"}</Text>
              <AntDesign color={value ? Colors.black : Colors.greyText} name="down" size={14} />
            </TouchableOpacity>
          </>
        )}
        rules={{
          required: { value: true, message: "unit" },
        }}
      />
      <View style={styles.mv8} />
      {/* <View style={styles.photo}>
        { libImage ? (
          <ExpoImage backgroundColor={Colors.border} borderRadius={20} cacheUri={libImage} contentFit="contain" height={100} width={"49%"} />
        ) : data?.photo ? (
          <TouchableOpacity onPress={openProductImageLibrary} style={styles.soloPhoto}>
            <ExpoImage backgroundColor={Colors.border} borderRadius={20} contentFit="contain" height={100} uri={data.photo} width={"100%"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openProductImageLibrary} style={styles.soloPhoto}>
            <AntDesign color={Colors.black} name="camera" size={24} />
            <Text>Зураг оруулах</Text>
          </TouchableOpacity>
        )}
        {cameraImage ? (
          <ExpoImage backgroundColor={Colors.border} borderRadius={20} cacheUri={cameraImage} contentFit="contain" height={100} width={"49%"} />
        ) : (
          <TouchableOpacity onPress={openCamera} style={styles.soloPhoto}>
            <AntDesign color={Colors.black} name="pushpino" size={24} />
            <Text>Зураг дарах</Text>
          </TouchableOpacity>
        )}
      </View> */}
      <TouchableOpacity onPress={() => handleSheetChanges(0)} style={styles.barcode}>
        <AntDesign color={Colors.black} name="barcode" size={24} />
        <Text> {result ? result : data?.barCode ? data.barCode : "Баркод уншуулах"} </Text>
      </TouchableOpacity>
    </View>
  );
});

EditProductForm.displayName = "EditProductForm";

export { EditProductForm };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mv8: {
    marginVertical: 8,
  },
  // photo: {
  //   flexDirection : "row",
  //   alignItems    : "center",
  //   justifyContent: "space-between",
  //   width         : width * 0.9,
  // },
  // soloPhoto: {
  //   width          : "49%",
  //   height         : 100,
  //   backgroundColor: Colors.border,
  //   alignItems     : "center",
  //   justifyContent : "center",
  //   borderRadius   : 20,
  // },
  barcode: {
    height         : 100,
    alignItems     : "center",
    justifyContent : "center",
    backgroundColor: Colors.border,
    borderRadius   : 20,
    marginTop      : 8,
    marginBottom   : 16,
  },
  selectSheet: {
    borderWidth   : 1,
    borderRadius  : 8,
    borderColor   : Colors.border,
    padding       : 8,
    flexDirection : "row",
    alignItems    : "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 14,
    color   : Colors.greyText,
  },
  primeText: {
    fontSize: 14,
    color   : Colors.black,
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
