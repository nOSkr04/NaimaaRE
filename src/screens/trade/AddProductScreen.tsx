import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,  } from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "../../constants/Colors";
import { AddProductForm, IFormData } from "../../components/tradeWidgets/AddProductForm";
import { MyButton } from "../../widgets/MyButton";
import { useForm } from "react-hook-form";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BarcodeContent } from "../../components/tradeWidgets/BarcodeContent";
import { AntDesign } from "@expo/vector-icons";
import { GoodsApi } from "../../apis";
const AddProductScreen = memo(() => {
  const height = useHeaderHeight();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IFormData>();

  const [hasPermission, setHasPermission] = useState<boolean | string | null>(null);
  const [result, setResult] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [libImage, setLibImage] = useState("");
  const [cameraImage, setCameraImage] = useState("");
  const snapPoints = useMemo(() => ["90%"], []);
  
  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);
  const handleSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={"close"} />,
    [],
  );
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onSubmit = async (values: IFormData) => {
    const createData = {
      name       : values.name,
      category   : values.category._id,
      price      : values.price,
      barCode    : result ? result : undefined,
      unit       : values.unit,
      libImage   : libImage ? libImage : undefined,
      cameraImage: cameraImage ? cameraImage : undefined
    };
    const res = await GoodsApi.createGood(createData);
   if(createData.libImage){
    const image = createData.libImage;
    const fileExt = image.substring(
      image.lastIndexOf(".") + 1
    );
    const formData = new FormData();
    formData.append("file", {
      uri : Platform.OS === "ios" ? image.replace("file://", "") : image,
      type: `image/${fileExt}`,
      name: `new__GOOD.${fileExt}`
    });
    await GoodsApi.goodImage(formData, res._id);
   }
     if(createData.cameraImage){
    const image = createData.cameraImage;
    const fileExt = image.substring(
      image.lastIndexOf(".") + 1
    );
    const formData = new FormData();
    formData.append("file", {
      uri : Platform.OS === "ios" ? image.replace("file://", "") : image,
      type: `image/${fileExt}`,
      name: `new__GOOD.${fileExt}`
    });
    await GoodsApi.goodImage(formData, res._id);
   }
  };
  if (hasPermission === null) {
    return console.log("first");
  }
  if (hasPermission === false) {
    return console.log("first");
  }
  return (
    <KeyboardAvoidingView style={styles.root} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <AddProductForm cameraImage={cameraImage} clearErrors={clearErrors} control={control} errors={errors} handleSheetChanges={handleSheetChanges} libImage={libImage}  result={result} setCameraImage={setCameraImage} setLibImage={setLibImage}  />
        <MyButton onPress={handleSubmit(onSubmit)} title="Илгээх"   />
      </ScrollView>
      <BottomSheet backdropComponent={renderBackdrop} enablePanDownToClose={true} index={-1} onChange={handleSheetChanges} ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleSheetClose} style={styles.iconContainer}  >
            <AntDesign name="arrowleft" size={16}  />
          </TouchableOpacity>
          <Text style={styles.title}>Баркод уншуулах</Text>
          <Pressable style={styles.iconContainer}>
            <AntDesign color={Colors.white} name="arrowleft" size={16}  />
          </Pressable>
        </View>
        <BarcodeContent handleSheetChanges={handleSheetClose} result={result} setResult={setResult} />
      </BottomSheet>
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
  headerContainer: {
    flexDirection   : "row",
    justifyContent  : "space-between",
    alignItems      : "center",
    marginHorizontal: 8
},
iconContainer: {
    padding: 8
},
title: {
    textAlign : "center",
    fontWeight: "bold",
    fontSize  : 16,
}
});
