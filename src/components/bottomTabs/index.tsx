import React from "react";
import TabBarIcon from "./TabBarIcon";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderRight } from "./HeaderRight";
import { styles } from "./styles";

export const tradeTabOption = {
  tabBarIcon         : ({ color }: { color: string }) => <TabBarIcon color={color} name="home" />,
  headerTitle        : "",
  headerLeft         : () => <HeaderLogo />,
  headerRight        : () => <HeaderRight />,
  headerStyle        : styles.primaryBg,
  title              : "Наймаа",
  headerShadowVisible: false,
};
export const listTabOption = {
  tabBarIcon         : ({ color }: { color: string }) => <TabBarIcon color={color} name="user" />,
  headerTitle        : "",
  headerLeft         : () => <HeaderLogo />,
  headerRight        : () => <HeaderRight />,
  headerStyle        : styles.primaryBg,
  title              : "Наймаа",
  headerShadowVisible: false,
};
export const reportTabOption = {
  tabBarIcon         : ({ color }: { color: string }) => <TabBarIcon color={color} name="user" />,
  headerTitle        : "",
  headerLeft         : () => <HeaderLogo />,
  headerRight        : () => <HeaderRight />,
  headerStyle        : styles.primaryBg,
  title              : "Наймаа",
  headerShadowVisible: false,
};
export const packageTabOption = {
  tabBarIcon         : ({ color }: { color: string }) => <TabBarIcon color={color} name="user" />,
  headerTitle        : "",
  headerLeft         : () => <HeaderLogo />,
  headerRight        : () => <HeaderRight />,
  headerStyle        : styles.primaryBg,
  title              : "Наймаа",
  headerShadowVisible: false,
};
export const profileScreenOption = {
  tabBarIcon         : ({ color }: { color: string }) => <TabBarIcon color={color} name="user" />,
  headerTitle        : "",
  headerLeft         : () => <HeaderLogo />,
  headerRight        : () => <HeaderRight />,
  headerStyle        : styles.primaryBg,
  title              : "Наймаа",
  headerShadowVisible: false,
};
