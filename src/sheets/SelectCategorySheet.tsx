import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import useSwr from "swr";
import { CategoryApi } from "../apis";
import { ICategory } from "../interface/ICategory";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider } from "../widgets/Divider";

const SelectCategorySheet = memo(() => {
  const { data } = useSwr<ICategory[]>("categories", async () => {
    const res = await CategoryApi.getCategory();
    return res;
  });

  const renderItem = useCallback(({ item }: { item: ICategory }) => {
    return (
      <>
        <TouchableOpacity>
          <Text style={styles.categoryText}>{item.name}</Text>
          <Divider custom={styles.divider} />
        </TouchableOpacity>
      </>
    );
  }, []);

  return (
    <View style={styles.container}>
      <SheetHeader title={"Категори сонгох"} />
      <BottomSheetFlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} showsVerticalScrollIndicator={false} style={styles.content} />
    </View>
  );
});

SelectCategorySheet.displayName = "SelectCategorySheet";

export { SelectCategorySheet };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 8
  },
  categoryText: {
    fontSize  : 14,
    fontWeight: "500",
    marginLeft: 20,
  },
  divider: {
    marginTop   : 4,
    marginBottom: 8
  }
});
