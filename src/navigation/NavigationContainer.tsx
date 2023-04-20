/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from "@react-navigation/native";
import { BottomSheetNavigator } from "./BottomSheetNavigator";
export default function Navigation() {
  return (
    <NavigationContainer
      >
      <BottomSheetNavigator/>
    </NavigationContainer>
  );
}