import { StyleSheet, View } from "react-native";
import React, { memo, useState } from "react";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import MyField from "../widgets/MyField";
import { MyButton } from "../widgets/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomSheetParamList, } from "../navigation/types";
import { TransactionsApi } from "../apis";
import { useMutate } from "../hooks/useMutate";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<BottomSheetParamList, "PriceEditSheet">;

const PriceEditSheet = memo(({ route }:Props) => {
  const mutate = useMutate();
  const navigation = useNavigation();
  const { id, backPrice, backQuantity } = route.params;
  const [price, setPrice] = useState(backPrice ? backPrice : 0);
  const [size, setSize] = useState(backQuantity ? backQuantity : 0);
  const onSubmit = async () => {
    try {
      await TransactionsApi.editBasket({ id: id || "", price: price, quantity: size });
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
        <MyField keyboardType="numeric" onChangeText={setPrice} placeholder="Үнэ" styleInput={styles.priceInput} title="Үнэ" value={price.toString()} />
        <MyField keyboardType="numeric" onChangeText={setSize} placeholder="Хэмжээ" styleInput={styles.priceInput} title="Хэмжээ" value={size.toString()}  />
        <MyButton onPress={onSubmit} title="Болсон" />
      </View>
    </BottomSheetScrollView>
  );
});

PriceEditSheet.displayName = "PriceEditSheet";

export { PriceEditSheet };

const styles = StyleSheet.create({

  container: {
    marginHorizontal: 20,
  },
  priceInput: {
    marginBottom: 16
  },

});
