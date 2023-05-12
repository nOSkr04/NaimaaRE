import { FlatList, StyleSheet } from "react-native";
import React, { memo, useCallback,  } from "react";
import useSwr from "swr";
import { ReportApi } from "../../../apis";
import { IncomeStaticContainer } from "../../../components/report/IncomeStaticContainer";
import { Colors } from "../../../constants/Colors";


export interface IncomeProps {
  _id: string;
  createdAt: string;
  finalPrice: number;
  incomeType: string;
  number: string;
  type: string;

}

const IncomeStaticScreen = memo(() => {
    const { data } = useSwr<IncomeProps[]>("/bills/user?limit=1000&sort=-createdAt&type=Орлого", async () => {
        const res = await ReportApi.getIncomeStatic();
        return res;
      });
      const renderItem = useCallback(({ item }: {item: IncomeProps}) => {
        return(
          <IncomeStaticContainer item={item}  />
        );
      },[]);
      console.log(data);
  return (
    <FlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} style={styles.root} />
  );
});

IncomeStaticScreen.displayName="IncomeStaticScreen";

export { IncomeStaticScreen };

const styles = StyleSheet.create({
    root: {
        flex           : 1,
        backgroundColor: Colors.white,
         borderRadius   : 20,
         marginTop      : 4
    }
});