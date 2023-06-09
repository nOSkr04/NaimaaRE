import React from "react";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import RootNavigator from "./RootNavigator";
import { BottomSheetParamList } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { SelectCategorySheet } from "../sheets/SelectCategorySheet";
import { PriceSheet } from "../sheets/PriceSheet";
import { BasketSheet } from "../sheets/BasketSheet";
import { PriceEditSheet } from "../sheets/PriceEditSheet";
import { FormSelectCategory } from "../sheets/FormSelectCategory";
import { FormSelectUnit } from "../sheets/FormSelectUnit";
import { DeleteSheet } from "../sheets/DeleteSheet";
import { ReportMainSheet } from "../sheets/ReportMainSheet";
import { ReportDateSheet } from "../sheets/ReportDateSheet";
import { DeleteAccountSheet } from "../sheets/DeleteAccountSheet";
import { ReportCategorySheet } from "../sheets/ReportCategorySheet";
import { ReportResultCategorySheet } from "../sheets/ReportResultCategorySheet";
import { QpaySheet } from "../sheets/QpaySheet";
import {  DateExtendSheet } from "../sheets/DateExtendSheet";

const BottomSheet = createBottomSheetNavigator<BottomSheetParamList>();

const BottomSheetNavigator = () => {
  const { Navigator, Screen } = BottomSheet;

  const insets = useSafeAreaInsets();

  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={"close"} />,
    [],
  );

  return (
    <Navigator>
      <Screen component={RootNavigator} name="RootNavigator" />
      <Screen
        component={SelectCategorySheet}
        name="SelectCategorySheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["60%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={FormSelectCategory}
        name="FormSelectCategory"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["60%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={FormSelectUnit}
        name="FormSelectUnit"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["60%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={PriceSheet}
        name="PriceSheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["40%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={BasketSheet}
        name="BasketSheet"
        options={{
          backdropComponent   : renderBackdrop,
          snapPoints          : ["80%"],
          index               : 1,
          topInset            : insets.top,
          enablePanDownToClose: false,
        }}
      />
      <Screen
        component={PriceEditSheet}
        name="PriceEditSheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["40%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={DeleteSheet}
        name="DeleteSheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["40%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={ReportMainSheet}
        name="ReportMainSheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["30%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={ReportDateSheet}
        name="ReportDateSheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["80%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={ReportCategorySheet}
        name="ReportCategorySheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["60%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={ReportResultCategorySheet}
        name="ReportResultCategorySheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["80%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
        component={DeleteAccountSheet}
        name="DeleteAccountSheet"
        options={{
          backdropComponent: renderBackdrop,
          snapPoints       : ["40%"],
          index            : 1,
          topInset         : insets.top,
        }}
      />
      <Screen
          component={QpaySheet}
          name="QpaySheet"
          options={{
            backdropComponent: renderBackdrop,
            snapPoints       : ["80%"],
            index            : 1,
            topInset         : insets.top,
          }}
        />
      <Screen
          component={DateExtendSheet}
          name="DateExtendSheet"
          options={{
            backdropComponent: renderBackdrop,
            snapPoints       : ["40%"],
            index            : 1,
            topInset         : insets.top,
          }}
        />
    </Navigator>
  );
};

export { BottomSheetNavigator };
