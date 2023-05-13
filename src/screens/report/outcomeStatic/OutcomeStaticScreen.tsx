import { FlatList, StyleSheet } from "react-native";
import React, { memo, useCallback,  } from "react";
import useSwr from "swr";
import { ReportApi } from "../../../apis";
import { IncomeStaticContainer } from "../../../components/report/IncomeStaticContainer";
import { Colors } from "../../../constants/Colors";


export interface OutcomeProps {
  _id: string;
  createdAt: string;
  finalPrice: number;
  incomeType: string;
  number: string;
  type: string;

}

const OutcomeStaticScreen = memo(() => {
    const { data } = useSwr<OutcomeProps[]>("/bills/user?limit=1000&sort=-createdAt&type=Зарлага", async () => {
        const res = await ReportApi.getOutcomeStatic();
        return res;
      });
      const renderItem = useCallback(({ item }: {item: OutcomeProps}) => {
        return(
          <IncomeStaticContainer item={item}  />
        );
      },[]);
      
  return (
    <FlatList data={data} keyExtractor={item => item._id} renderItem={renderItem} style={styles.root} />
  );
});

OutcomeStaticScreen.displayName="OutcomeStaticScreen";

export { OutcomeStaticScreen };

const styles = StyleSheet.create({
    root: {
        flex           : 1,
        backgroundColor: Colors.white,
         borderRadius   : 20,
         marginTop      : 4
    }
});