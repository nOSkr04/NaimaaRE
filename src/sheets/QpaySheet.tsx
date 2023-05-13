/* eslint-disable react/prop-types */
import { StyleSheet,  } from "react-native";
import React, { memo, useCallback } from "react";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { PaymentApi } from "../apis";
import useSwr from "swr";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { QpayContainer } from "../components/payment/QpayContainer";
type Props = NativeStackScreenProps<BottomSheetParamList, "QpaySheet">;

export type Urls = {
        _id: string;
        description: string;
        link: string;
        logo: string;
        name: string
}

type QpayProps = {
    _id: string;
    invoiceId: string;
    qrImage: string;
    urls: Urls[]
}



const QpaySheet = memo(({ route }: Props) => {
    const { id } = route.params;
    const { data } = useSwr<QpayProps>(`/wallets/${id}`, async () => {
        const res = await PaymentApi.getWallet(id);
        return res;
      });
      const renderItem = useCallback(({ item }: {item:Urls} ) => {
        return(
          <QpayContainer item={item}  />
        );
      },[]);
    return (
      <BottomSheetFlatList data={data?.urls} renderItem={renderItem} style={styles.root}    />
    );
  });

  QpaySheet.displayName="QpaySheet";

export { QpaySheet };

const styles = StyleSheet.create({
    root: {
        flex            : 1,
        marginHorizontal: 20
    }
});