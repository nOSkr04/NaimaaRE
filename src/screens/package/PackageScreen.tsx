import { FlatList, StyleSheet,  } from "react-native";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { IAuth } from "../../interface/IAuth";
import useSwr from "swr";
import { TemplateApi } from "../../apis";
import { ITemplate } from "../../interface/ITemplate";
import { TemplateContainer } from "../../components/template/TemplateContainer";
const PackageScreen = memo(() => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const { data } = useSwr<ITemplate[]>(`/templates?createUser=${user?._id}`, async () => {
    const res = await TemplateApi.getTemplates(user?._id || "");
    return res;
  });
  const renderItem = React.useCallback(({ item }: {item: ITemplate}) => {
    return(
      <TemplateContainer data={item} />
    );
  },[]);

    return (
      <FlatList data={data} keyExtractor={item => item._id} renderItem={renderItem}  showsVerticalScrollIndicator={false} style={styles.root}  />
    );
  });

  PackageScreen.displayName="PackageScreen";

export { PackageScreen };

const styles = StyleSheet.create({ root: {
  flex: 1
} });