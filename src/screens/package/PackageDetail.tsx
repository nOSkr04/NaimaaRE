/* eslint-disable react/prop-types */
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { memo, useCallback } from "react";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useSwr from "swr";
import { TemplateApi } from "../../apis";
import { IGoods } from "../../interface/IGoods";
import { PackageContainer } from "../../components/package/PackageContainer";
import { Colors } from "../../constants/Colors";
import { MyButton } from "../../widgets/MyButton";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "PackageDetail">;

export type PackageDetailProps = {
  _id: string;
  createUser: string;
  createdAt: string;
  good: IGoods
  id: string;
  isBasket: boolean;
  price: number;
  quantity: number;
  template: string;
  templateName: string;
};

const PackageDetail = memo(({ route }: Props) => {
  const { id, name } = route.params;
  const navigation = useNavigation();
  const { data } = useSwr<PackageDetailProps[]>(`/transactions/user?template=${id}`, async () => {
    const res = await TemplateApi.getTemplateDetail(id);
    return res;
  });
  const renderItem = useCallback(({ item }: {item: PackageDetailProps}) => {
    return <PackageContainer item={item}  />;
  },[]);

  const onIncome = (id: string) => {
    navigation.navigate("PackageIncome", { template: id,  });
  };

  const onExpense = (id: string) => {
    navigation.navigate("PackageExpense", { template: id });
  };


  return (
    <FlatList
      ListFooterComponent={
        <View style={styles.footerContainer}>
          <View style={styles.mv10} />
          <MyButton onPress={() => onIncome(id)} title="Орлого авах"  />
          <View style={styles.mv10} />
          <MyButton onPress={() => onExpense(id)} title="Зарлага гаргах" type="danger" />
        </View>
      }
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Text style={styles.name}>Загварын нэр: </Text>
            <Text style={styles.title}>{name}</Text>
          </View>
          <Text style={styles.contentHeader}>Бараанууд:</Text>
        </>
      }
      data={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      style={styles.root}
    />
  );
});

PackageDetail.displayName = "PackageDetail";

export { PackageDetail };

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems   : "center",
    margin       : 20
  },
  name: {
    fontSize  : 16,
    color     : Colors.grey300,
    fontWeight: "500"
  },
  title: {
    fontSize  : 20,
    color     : Colors.black,
    fontWeight: "bold"
  },
  contentHeader: {
    fontSize        : 20,
    color           : Colors.black,
    marginHorizontal: 20,
    marginBottom    : 8,
    fontWeight      : "500"
  },
  footerContainer: {
    marginHorizontal: 20
  },
  mv10: {
    marginVertical: 10
  }
});
