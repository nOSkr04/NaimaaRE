import { Alert, StyleSheet, } from "react-native";
import React, { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { ReportDateForm, ReportDateFormProps } from "../components/report/ReportDateForm";
import { MyButton } from "../widgets/MyButton";
import { ReportApi } from "../apis";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BigLoader } from "../components/loader/BigLoader";
import { BottomSheetView } from "@gorhom/bottom-sheet";

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

type Props = NativeStackScreenProps<BottomSheetParamList, "ReportResultCategorySheet">;

const ReportResultCategorySheet = memo(({ route }: Props) => {
  const { type, id } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ReportDateFormProps>();
  const onSubmit = async (values: ReportDateFormProps) => {
    setLoading(true);
    try {
      const res = await ReportApi.getTimeCategoryReport(values, id);
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
    } catch (err: any) {
      Alert.alert(err.error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <BottomSheetView style={styles.root}>
      {loading ? (
        <BigLoader />
      ) : (
        <>
          <ReportDateForm clearErrors={clearErrors} control={control} errors={errors} />
          <MyButton onPress={handleSubmit(onSubmit)} styleButton={styles.button} title="Үргэлжлүүлэх" />
        </>
      )}
    </BottomSheetView>
  );
});

ReportResultCategorySheet.displayName = "ReportResultCategorySheet";

export { ReportResultCategorySheet };

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  root: {
    marginHorizontal: 20,
    flex            : 1
  },
});



// ReportResultCategorySheet