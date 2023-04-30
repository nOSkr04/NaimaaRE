/* eslint-disable react/prop-types */
import { FlatList, StyleSheet,   } from "react-native";
import React, { memo, useCallback } from "react";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageDataContainer } from "../../components/tradeWidgets/ImageDataContainer";
import useSwr from "swr";
import { GoodsApi } from "../../apis";
import { IGoods } from "../../interface/IGoods";
import { useSharedData } from "../../components/shared/SharedDataHook";
import { BasketButton } from "../../components/tradeWidgets/BasketButton";
type Props = NativeStackScreenProps<RootStackParamList, "ImageBasketScreen">;

const ImageBasketScreen = memo(({ route }: Props ) => {
    const { barcode } = route.params;
    const { data: basketData } = useSharedData();
    const { data } = useSwr<IGoods[]>(barcode ? `/goods/user?barCode=${barcode}` : "/goods/user", async () => {
        const res = await GoodsApi.getGoods({ barcode: barcode });
        return res;
      });
  
    const renderItem = useCallback(({ item }: {item: IGoods}) => {
        return(
          <ImageDataContainer barcode={barcode} item={item}  />
        );
    },[barcode]);
    return (
      <>
        <FlatList data={data} keyExtractor={item => item._id} numColumns={2} renderItem={renderItem} showsVerticalScrollIndicator={false} style={styles.contentContainer}  />
        { <BasketButton value={basketData?.length}  />}
      </>
    );
  });

  ImageBasketScreen.displayName="ImageBasketScreen";

export { ImageBasketScreen };

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    marginTop        : 4
  }
});