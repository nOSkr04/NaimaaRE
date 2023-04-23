import React from "react";
import TabBarIcon from "./TabBarIcon";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderRight } from "./HeaderRight";
import { styles } from "./styles";

export const tradeTabOption = {
  tabBarIcon : ({ color }: { color: string }) => <TabBarIcon color={color} name="exchange" />,
  headerTitle: "",
  headerLeft : () => <HeaderLogo />,
  headerRight: () => <HeaderRight />,
  headerStyle: styles.primaryBg,
  title      : "Наймаа",
};
export const listTabOption = {
  tabBarIcon : ({ color }: { color: string }) => <TabBarIcon color={color} name="th-list" />,
  headerTitle: "",
  headerLeft : () => <HeaderLogo />,
  headerRight: () => <HeaderRight />,
  headerStyle: styles.primaryBg,
  title      : "Бараа",
};
export const reportTabOption = {
  tabBarIcon : ({ color }: { color: string }) => <TabBarIcon color={color} name="sort-numeric-asc" />,
  headerTitle: "",
  headerLeft : () => <HeaderLogo />,
  headerRight: () => <HeaderRight />,
  headerStyle: styles.primaryBg,
  title      : "Тайлан",
  
};
export const packageTabOption = {
  tabBarIcon : ({ color }: { color: string }) => <TabBarIcon color={color} name="sitemap" />,
  headerTitle: "",
  headerLeft : () => <HeaderLogo />,
  headerRight: () => <HeaderRight />,
  headerStyle: styles.primaryBg,
  title      : "Загвар",
};
export const profileScreenOption = {
  tabBarIcon : ({ color }: { color: string }) => <TabBarIcon color={color} name="users" />,
  headerTitle: "",
  headerLeft : () => <HeaderLogo />,
  headerRight: () => <HeaderRight />,
  headerStyle: styles.primaryBg,
  title      : "Бүртгэл",
};
