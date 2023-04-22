import React from "react";
import {  createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { listTabOption,  packageTabOption,  profileScreenOption, reportTabOption, tradeTabOption } from "../components/bottomTabs";
import { TradeScreen } from "../screens/trade/TradeScreen";
import { ListScreen } from "../screens/list/ListScreen";
import { ReportScreen } from "../screens/report/ReportScreen";

import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { RootTabParamList } from "./types";
import { PackageScreen } from "../screens/package/PackageScreen";

const BottomTabNavigator = () => {
 
  const BottomTab = createBottomTabNavigator<RootTabParamList>();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        component={TradeScreen}
        name="TradeScreen"
        options={tradeTabOption}
      />
      <BottomTab.Screen
        component={ListScreen}
        name="ListScreen"
        options={listTabOption}
      />
      <BottomTab.Screen
        component={ReportScreen}
        name="ReportScreen"
        options={reportTabOption}
      />
      <BottomTab.Screen
        component={PackageScreen}
        name="PackageScreen"
        options={packageTabOption}
      />
      <BottomTab.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={profileScreenOption}
      />
    
       
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
