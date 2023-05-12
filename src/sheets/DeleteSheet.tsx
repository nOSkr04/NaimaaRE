import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
import React,{ memo } from "react";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { GoodsApi } from "../apis";
import { useMutate } from "../hooks/useMutate";

type Props = NativeStackScreenProps<BottomSheetParamList, "DeleteSheet">;

const DeleteSheet = memo(({ route }: Props) => {
  const { id } = route.params;
  const mutate=  useMutate();
  const navigation = useNavigation();
  const onSubmit = async (id: string) => {
    try {
      await GoodsApi.deleteGood(id);
      navigation.navigate("Root");
      mutate("/goods/user");
    } catch (err) {
      console.log(err);
    }
  };
    return (
      <View>
        <Text style={styles.title}>Та уг барааг устгахдаа итгэлтэй байна уу?</Text>
        <View style={styles.rowButton}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.noButton}>
            <Text style={styles.noTitle}>Үгүй</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSubmit(id)} style={styles.yesButton}>
            <Text style={styles.yesTitle}>Тийм</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  DeleteSheet.displayName="DeleteSheet";

export { DeleteSheet };

const styles = StyleSheet.create({
  title: {
    fontSize        : 16,
    fontWeight      : "500",
    color           : Colors.primary,
    textAlign       : "center",
    marginHorizontal: 80,
    marginTop       : 20
  },
  rowButton: {
    flexDirection   : "row",
    justifyContent  : "space-between",
    marginHorizontal: 20,
    marginTop       : 20
  },
  noButton: {
    borderWidth    : 2,
    borderColor    : Colors.primary,
    justifyContent : "center",
    alignItems     : "center",
    width          : "45%",
    borderRadius   : 12,
    paddingVertical: 12
  },
  noTitle: {
    fontSize  : 16,
    fontWeight: "bold",
    color     : Colors.black
  },
  yesTitle: {
    fontSize  : 16,
    fontWeight: "bold",
    color     : Colors.white
  },
  yesButton: {
    borderWidth    : 2,
    borderColor    : Colors.danger,
    backgroundColor: Colors.danger,
    justifyContent : "center",
    alignItems     : "center",
    width          : "45%",
    borderRadius   : 12,
    paddingVertical: 12
  },
});