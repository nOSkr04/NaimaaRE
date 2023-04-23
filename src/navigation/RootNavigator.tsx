/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import { IAuth } from "../interface/IAuth";
import { AuthApi } from "../apis";
import { authMe } from "../store/authSlice";
import { useSWRToken } from "../hooks/useSWRToken";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const { isInitialLoading } = useSWRToken(
    "auth/me",
    async () => {
      return await AuthApi.me();
    },
    {
      onSuccess: authData => {
        dispatch(authMe(authData));
      }
    }
  );
  if (isInitialLoading) {
    return null;
  }
  return (
    <Stack.Navigator>
      <Stack.Group>
        {user ? 
          <Stack.Screen component={BottomTabNavigator} name="Root" options={{ headerShown: false,  }} />
        :
          <Stack.Screen component={LoginScreen} name="LoginScreen" options={{  }} />
      }
      </Stack.Group>  
    </Stack.Navigator>
  );
}



export default RootNavigator;
