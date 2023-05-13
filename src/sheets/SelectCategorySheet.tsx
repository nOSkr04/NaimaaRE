import { StyleSheet } from "react-native";
import React, { memo, useCallback } from "react";
import useSwr from "swr";
import { CategoryApi } from "../apis";
import { ICategory } from "../interface/ICategory";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { useFilteredData } from "../components/filtered/SharedDataHook";
import { CategoryContainer } from "../components/CategoryContainer";
import { useNavigation } from "@react-navigation/native";

const SelectCategorySheet = memo(() => {
  const { setData } = useFilteredData();
  const navigation = useNavigation();
  const allIn = {
    name     : "Бүгд",
    _id      : "",
    createdAt: "any",
  };
  const { data } = useSwr<ICategory[]>("categories", async () => {
    const res = await CategoryApi.getCategory();
    return res;
  });
  const generateData = [allIn, ...(data || [])];
  const onPress = useCallback(
    ({ item }: { item: ICategory }) => {
      setData(item);
      navigation.goBack();
    },
    [navigation, setData],
  );
  const renderItem = useCallback(
    ({ item }: { item: ICategory }) => {
      return <CategoryContainer item={item} onPress={onPress} />;
    },
    [onPress],
  );
  return (
    <BottomSheetView style={styles.container}>
      <SheetHeader title={"Категори сонгох"} />
      <BottomSheetFlatList
        data={generateData || []}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.content}
      />
    </BottomSheetView>
  );
});

SelectCategorySheet.displayName = "SelectCategorySheet";

export { SelectCategorySheet };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 8,
  },
});
