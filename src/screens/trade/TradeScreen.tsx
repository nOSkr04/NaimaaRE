import React, { memo } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { IncomeTab } from "./IncomeTab";
import { ExpenseTab } from "./ExpenseTab";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

const TradeScreen = memo(() => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="IncomeTab"
      screenOptions={{
        tabBarLabelStyle    : styles.tabLabelStyle,
        tabBarStyle         : styles.tabBackground,
        tabBarIndicatorStyle: styles.indicator,
      }}
     >
      <Tab.Screen component={IncomeTab} name="IncomeTab" options={{ title: "Орлого" }} />
      <Tab.Screen component={ExpenseTab} name="ExpenseTab" options={{ title: "Зарлага" }} />
    </Tab.Navigator>
  );
});

TradeScreen.displayName = "TradeScreen";

export { TradeScreen };

const styles = StyleSheet.create({
  tabLabelStyle: {
    fontSize     : 14,
    lineHeight   : 18,
    textTransform: "none",
    color        : Colors.white,
    fontWeight   : "bold",
  },
  tabBackground: {
    backgroundColor: Colors.primary,
  },
  indicator: {
    backgroundColor: Colors.secondaryPrimary,
    padding        : 2,
  },
});
