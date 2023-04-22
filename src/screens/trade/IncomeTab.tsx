import { FlatList, StyleSheet, } from "react-native";
import React, { memo, useCallback } from "react";
import { FilterWidgets } from "../../components/tradeWidgets/FilterWidgets";
import { ProductList } from "../../components/tradeWidgets/ProductList";
import { TableHeader } from "../../components/tradeWidgets/TableHeader";

const IncomeTab = memo(() => {
  const data = [
    { id: "1", name: "baraa", price: "une", hemjee: "hemjee" },
    { id: "2", name: "baraa", price: "une", hemjee: "hemjee" },
    { id: "3", name: "baraa", price: "une", hemjee: "hemjee" },
    { id: "4", name: "baraa", price: "une", hemjee: "hemjee" },
  ];
  const renderItem = useCallback(({ item }: { item: any }) => {
    return <ProductList item={item} />;
  }, []);
  return (
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
  );
});

IncomeTab.displayName = "IncomeTab";

export { IncomeTab };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  
});
