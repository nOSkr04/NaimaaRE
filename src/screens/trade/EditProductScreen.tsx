import { KeyboardAvoidingView, PermissionStatus, Platform,Pressable,ScrollView,StyleSheet,Text,TouchableOpacity ,View } from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useMutate } from "../../hooks/useMutate";
import { EditProductForm, IFormData } from "../../components/tradeWidgets/EditProductForm";
import { useForm } from "react-hook-form";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GoodsApi } from "../../apis";
import { MyButton } from "../../widgets/MyButton";
import { AntDesign } from "@expo/vector-icons";
import { BarcodeContent } from "../../components/tradeWidgets/BarcodeContent";
import { Colors } from "../../constants/Colors";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IGoods } from "../../interface/IGoods";
import useSwr from "swr";
type Props = NativeStackScreenProps<RootStackParamList, "EditProductScreen">;

const EditProductScreen = memo(({ route }: Props) => {
  const { id } = route.params;
  const height = useHeaderHeight();
  const navigation = useNavigation();
  const mutate = useMutate();
  const { data } = useSwr<IGoods>(`/goods/${id}`, async () => {
    const res = await GoodsApi.goodDetail({ id });
    return res;
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    
  } = useForm<IFormData>({ defaultValues: {
    name    : data?.name,
    price   : data?.price,
    unit    : data?.unit,
    category: data?.category
  } });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [hasPermission, setHasPermission] = useState<null | PermissionStatus | boolean>(null);
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
    try {
      const createData = {
        name    : values.name,
        category: values.category._id,
        price   : values.price,
        barCode : result ? result : undefined,
        unit    : values.unit,
       
      };

      await GoodsApi.editGood({ id: id, data: createData });

      if (libImage) {
        const image = libImage;
        const fileExt = image?.substring(image.lastIndexOf(".") + 1);
        const formData = new FormData();
        formData.append("file", {
          uri : Platform.OS === "ios" ? image?.replace("file://", "") : image,
          type: `image/${fileExt}`,
          name: `new__GOOD.${fileExt}`,
        });
        await  GoodsApi.goodImage(id,formData, );
      }

      if (cameraImage) {
        const image = cameraImage;
        const fileExt = image?.substring(image.lastIndexOf(".") + 1);
        const formData = new FormData();
        formData.append("file", {
          uri : Platform.OS === "ios" ? image?.replace("file://", "") : image,
          type: `image/${fileExt}`,
          name: `new__GOOD.${fileExt}`,
        });
         await GoodsApi.goodImage(id,formData, );
      }
      
      mutate("/goods/user");
      mutate(`/goods/${id}`);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.root} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <EditProductForm
        cameraImage={cameraImage}
        clearErrors={clearErrors}
        control={control}
        data={data}
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

EditProductScreen.displayName="EditProductScreen";

export { EditProductScreen };

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