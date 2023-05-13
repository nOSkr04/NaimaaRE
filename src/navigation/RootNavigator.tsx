/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../interface/IAuth";
import { AuthApi } from "../apis";
import { authMe } from "../store/authSlice";
import { GetIncomeScreen } from "../screens/trade/income/GetIncomeScreen";
import {
  addScreenOptions,
  editScreenOptions,
  getExpenseScreenOptions,
  getIncomeScreenOptions,
  goodDetailOptions,
  imageBasketScreenOptions,
  incomeStaticOptions,
  outcomeStaticOptions,
  searchBarcodeOptions,
} from "../components/header";
import { AddProductScreen } from "../screens/trade/AddProductScreen";
import { BarcodeScreen } from "../screens/trade/BarcodeScreen";
import { ImageBasketScreen } from "../screens/trade/ImageBasketScreen";
import { GoodDetailScreen } from "../screens/GoodDetail";
import { GetExpenseScreen } from "../screens/trade/expense/GetExpenseScreen";
import { EditProductScreen } from "../screens/trade/EditProductScreen";
import { IncomeStaticScreen } from "../screens/report/incomeStatic/IncomeStaticScreen";
import { BillDetailScreen } from "../screens/report/BillDetailScreen";
import { OutcomeStaticScreen } from "../screens/report/outcomeStatic/OutcomeStaticScreen";
import { TransactionReport } from "../screens/report/transactionReport/TransactionReport";
import { BoughtRemainder } from "../screens/report/boughtRemainder/BoughtRemainder";
import { ProfitScreen } from "../screens/report/profitStatic/ProfitScreen";
import { SalesForecastScreen } from "../screens/report/salesForecast/SalesForecastScreen";
import { SignUpScreen } from "../screens/auth/SignUpScreen";
import OtpVerifyScreen from "../screens/auth/OtpVerifyScreen";
import { PackageDetail } from "../screens/package/PackageDetail";
import { isAfter, parseISO } from "date-fns";
import { PaymentMainScreen } from "../screens/payment/PaymentMainScreen";
import useSwr from "swr";
import { BigLoader } from "../components/loader/BigLoader";
import { tradeTabOption } from "../components/bottomTabs";
import { PackageIncome } from "../screens/package/PackageIncome";
import { PackageExpense } from "../screens/package/PackageExpense";
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const { isLoading,data } = useSwr(
    "auth/me",
    async () => {
      return await AuthApi.me();
    },
    {
      onSuccess: authData => {
        dispatch(authMe(authData));
      },
    },
  );
  if (isLoading) {
    return <BigLoader/>;
  }
  const currentTime = new Date();
  const targetTime = parseISO(data?.deadline || "");
  const lessThanTime = isAfter(currentTime, targetTime);
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerTitleAlign: "center" }}>
        {user && (
          <>
            {!lessThanTime ? (
              <Stack.Group>
                <Stack.Screen component={BottomTabNavigator} name="Root" options={{ headerShown: false }} />
                <Stack.Screen component={GetIncomeScreen} name="GetIncomeScreen" options={getIncomeScreenOptions} />
                <Stack.Screen component={GetExpenseScreen} name="GetExpenseScreen" options={getExpenseScreenOptions} />
                <Stack.Screen component={AddProductScreen} name="AddProductScreen" options={addScreenOptions} />
                <Stack.Screen component={EditProductScreen} name="EditProductScreen" options={editScreenOptions} />
                <Stack.Screen component={BarcodeScreen} name="BarcodeScreen" options={searchBarcodeOptions} />
                <Stack.Screen component={ImageBasketScreen} name="ImageBasketScreen" options={imageBasketScreenOptions} />
                <Stack.Screen component={GoodDetailScreen} name="GoodDetailScreen" options={goodDetailOptions} />
                <Stack.Screen component={IncomeStaticScreen} name="IncomeStaticScreen" options={incomeStaticOptions} />
                <Stack.Screen component={OutcomeStaticScreen} name="OutcomeStaticScreen" options={outcomeStaticOptions} />
                <Stack.Screen component={BillDetailScreen} name="BillDetailScreen" options={imageBasketScreenOptions} />
                <Stack.Screen component={TransactionReport} name="TransactionReport" options={imageBasketScreenOptions} />
                <Stack.Screen component={BoughtRemainder} name="BoughtRemainder" options={imageBasketScreenOptions} />
                <Stack.Screen component={ProfitScreen} name="ProfitScreen" options={imageBasketScreenOptions} />
                <Stack.Screen component={SalesForecastScreen} name="SalesForecastScreen" options={imageBasketScreenOptions} />
                <Stack.Screen component={PackageDetail} name="PackageDetail" options={imageBasketScreenOptions} />
                <Stack.Screen component={PackageIncome} name="PackageIncome" options={imageBasketScreenOptions} />
                <Stack.Screen component={PackageExpense} name="PackageExpense" options={imageBasketScreenOptions} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen component={PaymentMainScreen} name="PaymentMainScreen" options={tradeTabOption} />
              </Stack.Group>
            )}
          </>
        )}
        {!user && (
          <>
            <Stack.Screen component={LoginScreen} name="LoginScreen" options={{ headerShown: false }} />
            <Stack.Screen component={SignUpScreen} name="SignUpScreen" options={{ headerShown: false }} />
            <Stack.Screen component={OtpVerifyScreen} name="OtpVerifyScreen" options={{ headerShown: false }} />
          </>
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
