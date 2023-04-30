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
  AddProductScreen: undefined;
  BarcodeScreen: undefined;
  ImageBasketScreen: {barcode?: string};
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
  BasketSheet: undefined;
  FormSelectCategory: {onChange: any, clearErrors: UseFormClearErrors<IFormData>;};
  FormSelectUnit: {onChange: any, clearErrors: UseFormClearErrors<IFormData>;};
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
