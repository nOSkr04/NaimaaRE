/* eslint-disable react/prop-types */
import { Animated, StyleSheet } from "react-native";
import React, { memo, useCallback, useRef } from "react";
import { Colors } from "../constants/Colors";
import { GoodContainer } from "../components/goods/GoodContainer";
import { GoodHeader } from "../components/goods/GoodHeader";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useSwr from "swr";
import { GoodsApi, TransactionsApi } from "../apis";
import { IGoods } from "../interface/IGoods";
import { ITransactions } from "../interface/ITransactions";

type Props = NativeStackScreenProps<RootStackParamList, "GoodDetailScreen">;

const GoodDetailScreen = memo(({ route }: Props) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const { id } = route.params;

  const { data } = useSwr<IGoods>(`/goods/${id}`, async () => {
    const res = await GoodsApi.goodDetail({ id });
    return res;
  });
  const { data: userTrans } = useSwr<ITransactions[]>(`/transactions/user?good=${id}&sort=-createdAt`, async () => {
    const res = await TransactionsApi.getUserTransactions({ id });
    return res;
  });
  const renderItem = useCallback(({ item }: { item: any }) => {
    return <GoodContainer item={item} />;
  }, []);
  const renderHeader = useCallback(() => {
    return <GoodHeader data={data} scrollA={scrollA} />;
  }, [data, scrollA]);
  return (
    <Animated.FlatList
      ListHeaderComponent={renderHeader}
      data={userTrans}
      keyExtractor={item => item._id}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollA } } }], {
        useNativeDriver: true,
      })}
      renderItem={renderItem}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={styles.root}
    />
  );
});

GoodDetailScreen.displayName = "GoodDetailScreen";

export { GoodDetailScreen };

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
});
