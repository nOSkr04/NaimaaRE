import { FlatList, StyleSheet, Text } from "react-native";
import React, { ReactNode, memo, useCallback } from "react";
import { ReportContainer } from "../../components/report/ReportContainer";
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";

export type ReportType = {
  _id: string;
  name: string;
  onPress: () => void;
  icon: ReactNode;
};

const ReportScreen = memo(() => {
  const navigation = useNavigation();

  const data = [
    {
      _id    : "1",
      name   : "Орлогын гүйлгээний жагсаалт",
      onPress: () => navigation.navigate("IncomeStaticScreen"),
      icon   : <MaterialCommunityIcons color={Colors.black} name="cash-plus" size={24} />,
    },
    {
      _id    : "2",
      name   : "Зарлагын гүйлгээний жагсалт",
      onPress: () => navigation.navigate("OutcomeStaticScreen"),
      icon   : <MaterialCommunityIcons color={Colors.black} name="cash-minus" size={24} />,
    },
    {
      _id    : "3",
      name   : "Гүйлгээний тайлан",
      onPress: () => navigation.navigate("ReportMainSheet", { type: "TransactionReport" }),
      icon   : <MaterialCommunityIcons color={Colors.black} name="transfer" size={24} />,
    },
    {
      _id    : "4",
      name   : "Бараа бүтээгдэхүүний тайлан",
      onPress: () => navigation.navigate("ReportMainSheet", { type: "BoughtRemainder" }),
      icon   : <Entypo color={Colors.black} name="shopping-cart" size={24} />,
    },
    {
      _id    : "5",
      name   : "Борлуулалт үр ашгийн тайлан",
      onPress: () => navigation.navigate("ReportMainSheet", { type: "Profit" }),
      icon   : <FontAwesome5 color={Colors.black} name="piggy-bank" size={24} />,
    },
    // {
    //   _id    : "6",
    //   name   : "Зээлийн тайлан",
    //   onPress: () => navigation.navigate("ReportMainSheet"),
    //   icon   : <MaterialCommunityIcons color={Colors.black} name="bank-transfer-out" size={24} />,
    // },
    // {
    //   _id    : "7",
    //   name   : "Авлагын тайлан",
    //   onPress: () => navigation.navigate("ReportMainSheet"),
    //   icon   : <MaterialCommunityIcons color={Colors.black} name="bank-transfer-in" size={24} />,
    // },
    {
      _id    : "8",
      name   : "Борлуулалт төсөөллийн нэгдсэн тайлан",
      onPress: () => navigation.navigate("ReportMainSheet", { type: "SalesForecast" }),
      icon   : <Ionicons color={Colors.black} name="wallet" size={24} />,
    },
  ];

  const renderItem = useCallback(({ item }: { item: ReportType }) => {
    return <ReportContainer item={item} />;
  }, []);
  const renderHeader = useCallback(() => {
    return <Text style={styles.headerTitle}>Тайлан</Text>;
  }, []);
  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item._id}
      numColumns={2}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  );
});

ReportScreen.displayName = "ReportScreen";

export { ReportScreen };

const styles = StyleSheet.create({
  container: {
    flex             : 1,
    backgroundColor  : Colors.white,
    marginTop        : 4,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize  : 18,
    paddingTop: 12,
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 8,
  },
  row: {
    justifyContent: "space-between",
  },
});
