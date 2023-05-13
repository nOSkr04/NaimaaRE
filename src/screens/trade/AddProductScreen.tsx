import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, PermissionStatus, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useForm } from "react-hook-form";
import { AddProductForm, IFormData } from "../../components/tradeWidgets/AddProductForm";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { GoodsApi } from "../../apis";
import { Colors } from "../../constants/Colors";
import { BarcodeContent } from "../../components/tradeWidgets/BarcodeContent";
import { MyButton } from "../../widgets/MyButton";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { useMutate } from "../../hooks/useMutate";
import { BigLoader } from "../../components/loader/BigLoader";
const AddProductScreen = memo(() => {
  const height = useHeaderHeight();
  const navigation = useNavigation();
  const mutate = useMutate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IFormData>();
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [hasPermission, setHasPermission] = useState<null | PermissionStatus | boolean>(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const createData = {
        name    : values.name,
        category: values.category._id,
        price   : values.price,
        barCode : result ? result : undefined,
        unit    : values.unit,
      };

      const res = await GoodsApi.createGood(createData);

      if (libImage) {
        const fileExt = libImage?.substring(libImage.lastIndexOf(".") + 1);
        const formData = new FormData();
        formData.append("file", {
          uri : libImage,
          type: `image/${fileExt}`,
          name: Platform.OS === "ios" ? libImage?.replace("file://", "") : libImage,
        });
         await GoodsApi.goodImage("645f528aa69c741f1c7b9854",formData, );
      }

      if (cameraImage) {
        const fileExt = cameraImage?.substring(cameraImage.lastIndexOf(".") + 1);
        const formData = new FormData();
        formData.append("file", {
          uri : cameraImage,
          type: `image/${fileExt}`,
          name: Platform.OS === "ios" ? cameraImage?.replace("file://", "") : cameraImage,
        });
        await GoodsApi.goodImage(res._id,formData, );
      }
      mutate("/goods/user");
      navigation.goBack();
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  };
  if(loading){
    return <BigLoader/>;
  }
  return (
    <KeyboardAvoidingView style={styles.root} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <AddProductForm
          cameraImage={cameraImage}
          clearErrors={clearErrors}
          control={control}
          errors={errors}
          handleSheetChanges={handleSheetChanges}
          libImage={libImage}
          result={result}
          setCameraImage={setCameraImage}
          setLibImage={setLibImage}
        />
        <MyButton onPress={handleSubmit(onSubmit)} title="Илгээх" />
      </ScrollView>
      <BottomSheet
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        index={-1}
        onChange={handleSheetChanges}
        ref={bottomSheetRef}
        snapPoints={snapPoints}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleSheetClose} style={styles.iconContainer}>
            <AntDesign name="arrowleft" size={16} />
          </TouchableOpacity>
          <Text style={styles.title}>Баркод уншуулах</Text>
          <Pressable style={styles.iconContainer}>
            <AntDesign color={Colors.white} name="arrowleft" size={16} />
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
    marginHorizontal: 8,
  },
  iconContainer: {
    padding: 8,
  },
  title: {
    textAlign : "center",
    fontWeight: "bold",
    fontSize  : 16,
  },
});
