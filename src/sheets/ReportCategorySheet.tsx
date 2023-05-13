/* eslint-disable react/prop-types */
import { StyleSheet,  } from "react-native";
import React, { memo, useCallback } from "react";
import { ICategory } from "../interface/ICategory";
import useSwr from "swr";
import { CategoryApi } from "../apis";
import { BottomSheetFlatList, BottomSheetView } from "@gorhom/bottom-sheet";
import { SheetHeader } from "../components/header/SheetHeader";
import { CategoryContainer } from "../components/CategoryContainer";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<BottomSheetParamList, "ReportCategorySheet">;

const ReportCategorySheet = memo(({ route }: Props) => {
  const { type } = route.params;
    const { data } = useSwr<ICategory[]>("categories", async () => {
        const res = await CategoryApi.getCategory();
        return res;
      });
      const navigation = useNavigation();
      const onPress = useCallback(({ item }: {item: ICategory}) => {
           navigation.navigate("ReportResultCategorySheet", { id: item._id, type: type });
      },[navigation, type]);
      const renderItem = useCallback(({ item }: {item: ICategory}) => {
        return <CategoryContainer item={item}  onPress={onPress}    />;
      },[onPress]);
    return (
      <BottomSheetView style={styles.container}>
        <SheetHeader title={"Категори сонгох"} />
        <BottomSheetFlatList
        data={data || []}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.content}
      />
      </BottomSheetView>
    );
  });

  ReportCategorySheet.displayName="ReportCategorySheet";

export { ReportCategorySheet };

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 8,
  },
});