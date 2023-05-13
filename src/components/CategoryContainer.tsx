import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
import React, { memo } from "react";
import { Divider } from "../widgets/Divider";
import { ICategory } from "../interface/ICategory";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

type Props ={
    item: ICategory;
    onPress: ({ item }: {
      item: ICategory;
  }) => void
}

const CategoryContainer = memo(({ item,onPress }: Props) => {

    return (
      <TouchableOpacity
            onPress={() => onPress({ item })}>
        <View style={styles.row}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <AntDesign color={Colors.black} name="right" size={16}  />
        </View>
        <Divider custom={styles.divider} />
      </TouchableOpacity>
    );
  });


  CategoryContainer.displayName="CategoryContainer";

export { CategoryContainer };

const styles = StyleSheet.create({
    categoryText: {
        fontSize  : 14,
        fontWeight: "500",
       
      },
      divider: {
        marginTop       : 8,
        marginBottom    : 12,
        marginHorizontal: 20
      },
      row: {
        flexDirection   : "row",
        justifyContent  : "space-between",
        marginHorizontal: 20
      }
});