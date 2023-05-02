import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { memo, useCallback } from "react";
import useSwr from "swr";
import { CategoryApi } from "../apis";
import { ICategory } from "../interface/ICategory";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { Divider } from "../widgets/Divider";
import { useFilteredData } from "../components/filtered/SharedDataHook";
import { useNavigation } from "@react-navigation/native";

const SelectCategorySheet = memo(() => {
  const { setData } = useFilteredData();
  const navigation = useNavigation();
  const allIn = {
    name     : "Бүгд",
    _id      : "",
    createdAt: "any"
  };
  const { data } = useSwr<ICategory[]>("categories", async () => {
    const res = await CategoryApi.getCategory();
    return res;
  });
  const generateData = [allIn, ...(data || [])];
  const renderItem = useCallback(
    ({ item }: { item: ICategory }) => {
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              setData(item);
              navigation.goBack();
            }}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <Divider custom={styles.divider} />
          </TouchableOpacity>
        </>
      );
    },
    [navigation, setData],
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
  categoryText: {
    fontSize  : 14,
    fontWeight: "500",
    marginLeft: 20,
  },
  divider: {
    marginTop   : 4,
    marginBottom: 8,
  },
});
