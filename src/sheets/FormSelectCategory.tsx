/* eslint-disable react/prop-types */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import useSwr from "swr";
import { CategoryApi } from "../apis";
import { ICategory } from "../interface/ICategory";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider } from "../widgets/Divider";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<BottomSheetParamList, "FormSelectCategory">;

const FormSelectCategory = memo(({ route }: Props) => {
  
  const { onChange,clearErrors } = route.params;
  const navigation = useNavigation();
  const { data } = useSwr<ICategory[]>("categories", async () => {
    const res = await CategoryApi.getCategory();
    return res;
  });

  const selectCategory = useCallback(({ data }: {data: ICategory}) => {
    onChange(data);
    clearErrors("category");
    navigation.goBack();
  }, [clearErrors, navigation, onChange]);

  const renderItem = useCallback(({ item }: { item: ICategory }) => {
    return (
      <>
        <TouchableOpacity onPress={() => selectCategory({ data: item })}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <Divider custom={styles.divider} />
        </TouchableOpacity>
      </>
    );
  }, [selectCategory]);

  return (
    <View style={styles.container}>
      <SheetHeader title={"Категори сонгох"} />
      <BottomSheetFlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} showsVerticalScrollIndicator={false} style={styles.content} />
    </View>
  );
});

FormSelectCategory.displayName = "FormSelectCategory";

export { FormSelectCategory };

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
