import React, { memo } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { IncomeTab } from "./IncomeTab";
import { ExpenseTab } from "./ExpenseTab";

const TradeScreen = memo(() => {
  const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator initialRouteName="IncomeTab"             >
        <Tab.Screen component={IncomeTab} name="IncomeTab" options={{ title: "Газар" }}    />
        <Tab.Screen component={ExpenseTab} name="ExpenseTab" options={{ title: "Минийх" }}    />
      </Tab.Navigator>
    );
  });

  TradeScreen.displayName="TradeScreen";

export { TradeScreen };

