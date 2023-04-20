import React from "react";
import {  createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "../screens/auth/LoginScreen";

const BottomTabNavigator = () => {
 
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
   
      <Tab.Screen
            component={LoginScreen}
            name={"HomeScreen"}
            options={{
              // tabBarShowLabel: false,
            }}
          />
       
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
