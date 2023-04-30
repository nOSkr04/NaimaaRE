/* eslint-disable react/prop-types */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback } from "react";
import { SheetHeader } from "../components/header/SheetHeader";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Divider } from "../widgets/Divider";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<BottomSheetParamList, "FormSelectUnit">;

const FormSelectUnit = memo(({ route }: Props) => {
  const { onChange,clearErrors } = route.params;
  const navigation = useNavigation();


  const selectCategory = useCallback(({ data }: {data: string}) => {
    onChange(data);
    clearErrors("category");
    navigation.goBack();
  }, [clearErrors, navigation, onChange]);

  const renderItem = useCallback(({ item }: { item: string }) => {
    return (
      <>
        <TouchableOpacity onPress={() => selectCategory({ data: item })}>
          <Text style={styles.categoryText}>{item}</Text>
          <Divider custom={styles.divider} />
        </TouchableOpacity>
      </>
    );
  }, [selectCategory]);

  return (
    <View style={styles.container}>
      <SheetHeader title={"Хэмжих нэгж сонгох"} />
      <BottomSheetFlatList data={["кг", "литр", "см", "ширхэг", "мк2", "мк3"]} keyExtractor={(item) => item} renderItem={renderItem} showsVerticalScrollIndicator={false} style={styles.content} />
    </View>
  );
});

FormSelectUnit.displayName = "FormSelectUnit";

export { FormSelectUnit };

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
