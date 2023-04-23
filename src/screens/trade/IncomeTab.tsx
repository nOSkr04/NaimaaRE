import { FlatList, StyleSheet,   } from "react-native";
import React, { memo, useCallback } from "react";
import { FilterWidgets } from "../../components/tradeWidgets/FilterWidgets";
import { ProductList } from "../../components/tradeWidgets/ProductList";
import { TableHeader } from "../../components/tradeWidgets/TableHeader";
import { Colors } from "../../constants/Colors";
import useSwr from "swr";
import { GoodsApi, TransactionsApi } from "../../apis";
import { IGoods } from "../../interface/IGoods";
import { BasketButton } from "../../components/tradeWidgets/BasketButton";
import { IBasket } from "../../interface/IBasket";
import { useSharedData } from "../../components/shared/SharedDataHook";
const IncomeTab = memo(() => {
  const { setData } = useSharedData();
  const { data } = useSwr<IGoods[]>("/goods/user", async () => {
    const res = await GoodsApi.getGoods();
    return res;
  });
  const { data:basketData } = useSwr<IBasket[]>("/transactions/basket", async () => {
    const res = await TransactionsApi.getBasket();
    return res;
  },
  {
    onSuccess(_data){
      setData(_data);
    }
  }
  
  );
  const renderItem = useCallback(({ item }: { item: IGoods }) => {
    return <ProductList  item={item} name={item.name} price={item.price} quantity={item.quantity} unit={item.unit} />;
  }, []);
  return (
    <>
      <FlatList
      ListHeaderComponent={
        <>
          <FilterWidgets />
          <TableHeader />
        </>
      }
      data={data}
      renderItem={renderItem}
      style={styles.root}
      />
      <BasketButton value={basketData?.length}  />
    </>
  );
});

IncomeTab.displayName = "IncomeTab";

export { IncomeTab };

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
    borderRadius   : 20,
    marginTop      : 4
  },
 
});
