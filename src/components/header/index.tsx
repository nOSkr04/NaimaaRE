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