/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import { LoginScreen } from "../screens/auth/LoginScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen component={BottomTabNavigator} name="Root" options={{ headerShown: false }} />
        <Stack.Screen component={LoginScreen} name="LoginScreen" options={{  }} />
      </Stack.Group>  
    </Stack.Navigator>
  );
}



export default RootNavigator;
