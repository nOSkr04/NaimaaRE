import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { ReportDateForm, ReportDateFormProps } from "../components/report/ReportDateForm";
import { MyButton } from "../widgets/MyButton";
import { ReportApi } from "../apis";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type timeReportProps = {
  allProfit: number;
  drainAveragePrice: number;
  drainFinalPrice: number;
  drainQuantity: number;
  firstBalance: number;
  lastBalance: number;
  oneProfit: number;
  receiptAveragePrice: number;
  receiptFinalPrice: number;
  receiptQuantity: number;
  success: boolean;
  goodsLists: string[][];
  goodsMargins: string[][];
  goodsProfits: {
    allLeftBalanceReceiptPrice: number;
    allProfit: number;
    drainAveragePrice: number;
    drainFinalPrice: number;
    drainQuantity: number;
    drainReceiptPrice: number;
    firstBalance: number;
    good: string;
    lastBalance: number;
    oneProfit: number;
    receiptAveragePrice: number;
    receiptFinalPrice: number;
    receiptQuantity: number;
  }[];
  goodsReceipts: string[][];
};

type Props = NativeStackScreenProps<BottomSheetParamList, "ReportDateSheet">;

const ReportDateSheet = memo(({ route }: Props) => {
  const { type } = route.params;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ReportDateFormProps>();
  const onSubmit = async (values: ReportDateFormProps) => {
    try {
      const res = await ReportApi.getTimeReport(values);
      if (type === "TransactionReport") {
        navigation.navigate("TransactionReport", {
          date1: values.date1,
          date2: values.date2,
          data : res.transactionReport,
        });
      }
      if (type === "BoughtRemainder") {
        navigation.navigate("BoughtRemainder", {
          date1: values.date1,
          date2: values.date2,
          data : res.goodsLists,
        });
      }
      if (type === "Profit") {
        navigation.navigate("ProfitScreen", {
          date1: values.date1,
          date2: values.date2,
          data : res.goodsMargins,
        });
      }
      if (type === "SalesForecast") {
        navigation.navigate("SalesForecastScreen", {
          date1: values.date1,
          date2: values.date2,
          data : res.salesForecastReport,
        });
      }
      // navigation.navigate("Root");
      // mutate("/goods/user");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.root}>
      <ReportDateForm clearErrors={clearErrors} control={control} errors={errors} />
      <MyButton onPress={handleSubmit(onSubmit)} styleButton={styles.button} title="Үргэлжлүүлэх" />
    </View>
  );
});

ReportDateSheet.displayName = "ReportDateSheet";

export { ReportDateSheet };

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  root: {
    marginHorizontal: 20,
  },
});
