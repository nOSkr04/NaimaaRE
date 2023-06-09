import React from "react";
import { HeaderRight } from "./HeaderRight";
import { styles } from "./styles";
import { HeaderBackButton } from "./HeaderBackButton";

export const getIncomeScreenOptions = {
  headerTitle             : "Орлого авах",
  headerLeft              : () => <HeaderBackButton />,
  headerRight             : () => <HeaderRight />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const getExpenseScreenOptions = {
  headerTitle             : "Зарлага гаргах",
  headerLeft              : () => <HeaderBackButton />,
  headerRight             : () => <HeaderRight />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const addScreenOptions = {
  headerTitle             : "Бараа бүртгэх",
  headerLeft              : () => <HeaderBackButton />,
  headerRight             : () => <HeaderRight />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const editScreenOptions = {
  headerTitle             : "Бараа янзлах",
  headerLeft              : () => <HeaderBackButton />,
  headerRight             : () => <HeaderRight />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const searchBarcodeOptions = {
  headerTitle             : "Баркодоор хайх",
  headerLeft              : () => <HeaderBackButton />,
  headerRight             : () => <HeaderRight />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const goodDetailOptions = {
  headerTitle             : "Бараа дэлгэрэнгүй",
  headerLeft              : () => <HeaderBackButton />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const incomeStaticOptions = {
  headerTitle             : "Орлогын гүйлгээний жагсаалт",
  headerLeft              : () => <HeaderBackButton />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const outcomeStaticOptions = {
  headerTitle             : "Зарлагын гүйлгээний жагсаалт",
  headerLeft              : () => <HeaderBackButton />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };
export const imageBasketScreenOptions = {
  headerTitle             : "",
  headerLeft              : () => <HeaderBackButton />,
  headerRight             : () => <HeaderRight />,
  headerStyle             : styles.primaryBg,
  headerTitleStyle        : styles.title,
  fullScreenGestureEnabled: true
  };