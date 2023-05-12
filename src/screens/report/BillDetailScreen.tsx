/* eslint-disable react/prop-types */
import { FlatList, StyleSheet } from "react-native";
import React, { memo, useCallback } from "react";
import useSwr from "swr";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ReportApi } from "../../apis";
import { BillContainer } from "../../components/report/BillContainer";
import { IGoods } from "../../interface/IGoods";
import { Colors } from "../../constants/Colors";
import { BillHeaderContainer } from "../../components/report/BillHeaderContainer";
type Props = NativeStackScreenProps<RootStackParamList, "BillDetailScreen">;

export interface Bill {
  _id: string;
  balanceGoodNumber: number;
  bill: string;
  createUser: string;
  createdAt: string;
  finalPrice: string;
  good: IGoods;
  incomeType: string;
  price: number;
  quantity: number;
  type: string;
}

const BillDetailScreen = memo(({ route }: Props) => {
  const { bill, createdAt, finalPrice, number, type } = route.params;
  const { data } = useSwr<Bill[]>(`/transactions/user?bill=${bill}`, async () => {
    const res = await ReportApi.getIncomeStaticDetail({ id: bill });
    return res;
  });

  const renderItem = useCallback(({ item }: { item: Bill }) => {
    return <BillContainer item={item} />;
  }, []);

  return (
    <FlatList
      ListHeaderComponent={<BillHeaderContainer createdAt={createdAt} finalPrice={finalPrice} number={number} type={type} />}
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      style={styles.root}
    />
  );
});

BillDetailScreen.displayName = "BillDetailScreen";

export { BillDetailScreen };

const styles = StyleSheet.create({
  root: {
    backgroundColor  : Colors.white,
    marginTop        : 4,
    flex             : 1,
    paddingHorizontal: 16
  },
});
