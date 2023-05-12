/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IGoods } from "../interface/IGoods";
import { UseFormClearErrors } from "react-hook-form";
import { IFormData } from "../components/tradeWidgets/AddProductForm";

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  LoginScreen: undefined;
  GetIncomeScreen: undefined;
  GetExpenseScreen: undefined;
  AddProductScreen: undefined;
  BarcodeScreen: undefined;
  ImageBasketScreen: {barcode?: string};
  GoodDetailScreen: {id: string};
  EditProductScreen: {id: string};
  IncomeStaticScreen: undefined;
  OutcomeStaticScreen: undefined;
  BillDetailScreen: {bill: string, number: string, type: string, createdAt: string, finalPrice: number};
  TransactionReport: {date1: string, date2: string, data: string[]};
  BoughtRemainder: {date1: string, date2: string, data: string[]};
  ProfitScreen: {date1: string, date2: string, data: string[]};
  SalesForecastScreen: {date1: string, date2: string, data: string[]};
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TradeScreen: undefined;
  ListScreen: undefined;
  ReportScreen: undefined;
  PackageScreen: undefined;
  ProfileScreen: undefined;
 
};

export type BottomSheetParamList = {
  RootNavigator: undefined;
  SelectCategorySheet:undefined
  PriceSheet: {data: IGoods| undefined};
  PriceEditSheet: {id?: string, backPrice: number, backQuantity:number};
  BasketSheet: {drain: boolean};
  FormSelectCategory: {onChange: any, clearErrors: UseFormClearErrors<IFormData>;};
  FormSelectUnit: {onChange: any, clearErrors: UseFormClearErrors<IFormData>;};
  DeleteSheet: {id: string};
  ReportMainSheet: {type: string};
  ReportDateSheet: {type: string};
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
export type BottomSheetScreenProps<T extends keyof BottomSheetParamList> = NativeStackScreenProps<BottomSheetParamList, T>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface RootParamList extends BottomSheetParamList {}
  }
}
