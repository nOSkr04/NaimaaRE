import React from "react";
import { createBottomSheetNavigator } from "@th3rdwave/react-navigation-bottom-sheet";
import RootNavigator  from "./RootNavigator";
import { BottomSheetParamList } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { SelectCategorySheet } from "../sheets/SelectCategorySheet";
import { PriceSheet } from "../sheets/PriceSheet";
import { BasketSheet } from "../sheets/BasketSheet";
import { PriceEditSheet } from "../sheets/PriceEditSheet";


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
          enablePanDownToClose: false
          
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
    
    </Navigator>
  );
};

export { BottomSheetNavigator };
