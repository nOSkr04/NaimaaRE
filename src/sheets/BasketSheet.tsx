/* eslint-disable react/prop-types */
import { StyleSheet, View } from "react-native";
import React, { memo, useCallback } from "react";
import { useSharedData } from "../components/shared/SharedDataHook";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ProductList } from "../components/tradeWidgets/ProductList";
import { IBasket } from "../interface/IBasket";
import { TableHeader } from "../components/tradeWidgets/TableHeader";
import { MyButton } from "../widgets/MyButton";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EmptyContainer } from "../components/EmptyContainer";

type Props = NativeStackScreenProps<BottomSheetParamList, "BasketSheet">;

const BasketSheet = memo(({ route }: Props) => {
  const { drain } = route?.params;
  const navigation = useNavigation();
  const { data } = useSharedData();
  const renderItem = useCallback(
    ({ item }: { item: IBasket }) => {
      if (!item.good) {
        return null;
      }
      return (
        <ProductList
          basketId={item._id}
          drain={drain}
          edit={true}
          item={item.good}
          name={item.good.name}
          price={item.price}
          quantity={item.quantity}
        />
      );
    },
    [drain],
  );
 
  return (
    <View style={styles.root}>
      <SheetHeader title="Сагсанд оногдсон бараа" />

      <BottomSheetFlatList
        ListEmptyComponent={<EmptyContainer title="Сагсанд бараа байхгүй байна"  />}
        ListFooterComponent={<View style={styles.footer} />}
        ListHeaderComponent={<TableHeader />}
        data={data}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
      {drain ? (
        <MyButton disabled={data.length ? false : true} onPress={() => navigation.navigate("GetExpenseScreen")} styleButton={styles.button} title="Зарлага гаргах" type={"danger"} />
      ) : (
        <MyButton disabled={data.length ? false : true} onPress={() => navigation.navigate("GetIncomeScreen")} styleButton={styles.button} title="Орлого авах" />
      )}
    </View>
  );
});

BasketSheet.displayName = "BasketSheet";

export { BasketSheet };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom  : 20,
    right   : 20,
    left    : 20,
  },
  footer: {
    paddingBottom: 80,
  },
});
