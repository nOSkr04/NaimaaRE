import { StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyButton } from "../widgets/MyButton";

type Props = NativeStackScreenProps<BottomSheetParamList, "ReportMainSheet">;

const ReportMainSheet = memo(({ route }: Props) => {
  const { type } = route.params;
    const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <MyButton onPress={() => navigation.navigate("ReportDateSheet", { type: type })} title="Хугацаагаар" type="secondary"  />
      <View style={styles.mv} />
      <MyButton onPress={() => navigation.navigate("ReportDateSheet", { type: type })} title=" Категори-оор" type="secondary" />
    </View>
  );
});

ReportMainSheet.displayName = "ReportMainSheet";

export { ReportMainSheet };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  mv: {
    marginVertical: 8
  }
});
