import { StyleSheet, View } from "react-native";
import React, { memo, useState } from "react";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { MyButton } from "../widgets/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheetParamList, } from "../navigation/types";
import { TransactionsApi } from "../apis";
import { useMutate } from "../hooks/useMutate";
import { useNavigation } from "@react-navigation/native";
import { MySheetInput } from "../widgets/MySheetInput";

type Props = NativeStackScreenProps<BottomSheetParamList, "PriceSheet">;

const PriceSheet = memo(({ route }:Props) => {
  const mutate = useMutate();
  const navigation = useNavigation();
  const { data } = route.params;
  const [price, setPrice] = useState(data?.price ? data?.price : 0);
  const [size, setSize] = useState(data?.quantity ? data?.quantity : 0);
  const onSubmit = async () => {
    try {
      await TransactionsApi.postBasket({ id: data?._id || "", price: price, quantity: size });
      navigation.goBack();
    } catch (err: any) {
      console.log(err);
    } finally{
      mutate("/transactions/basket");
    }
  };
  return (
    <BottomSheetScrollView showsVerticalScrollIndicator={false} >
      <SheetHeader title="Сагсанд хийх" />
      <View style={styles.container}>
        <MySheetInput keyboardType="numeric" onChange={setPrice} placeholder="Үнэ" styleInput={styles.priceInput} title="Үнэ" value={price.toString()} />
        <MySheetInput keyboardType="numeric" onChange={setSize} placeholder="Хэмжээ" styleInput={styles.priceInput} title="Хэмжээ" value={size.toString()}  />
        <MyButton onPress={onSubmit} title="Болсон" />
      </View>
    </BottomSheetScrollView>
  );
});

PriceSheet.displayName = "PriceSheet";

export { PriceSheet };

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
  },
  priceInput: {
    marginBottom: 16
  },

});
