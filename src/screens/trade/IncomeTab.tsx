import { FlatList, StyleSheet,   } from "react-native";
import React, { memo, useCallback, useState,  } from "react";
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
import { useFilteredData } from "../../components/filtered/SharedDataHook";
const IncomeTab = memo(() => {
  const { setData } = useSharedData();
  const { data: cate } = useFilteredData();
  const [search, setSearch] = useState("");
console.log(search);
  const { data } = useSwr<IGoods[]>(cate? `/goods/user?category=${cate._id}` : "/goods/user", async () => {
    const res = await GoodsApi.getGoods({ category: cate._id });
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
          <FilterWidgets search={search} setSearch = {setSearch}   />
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
