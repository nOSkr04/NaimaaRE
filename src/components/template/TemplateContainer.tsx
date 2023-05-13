import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
import React, { memo } from "react";
import { ITemplate } from "../../interface/ITemplate";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  data: ITemplate
}

const TemplateContainer = memo(({ data }: Props) => {
  const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate("PackageDetail", { id: data._id, name: data.name })} style={styles.container}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>Загварын нэр: </Text>
          <Text style={styles.title}>{data.name}</Text>
        </View>
        <AntDesign color={Colors.black} name="right" size={16}    />
      </TouchableOpacity>
    );
  });

  TemplateContainer.displayName="TemplateContainer";

export { TemplateContainer };

const styles = StyleSheet.create({
  container: {
    marginHorizontal : 20,
    flexDirection    : "row",
    justifyContent   : "space-between",
    paddingVertical  : 16,
    alignItems       : "center",
    borderWidth      : 1,
    borderRadius     : 16,
    marginTop        : 12,
    paddingHorizontal: 12
    
  },
  title: {
    fontSize  : 18,
    fontWeight: "bold",
  },
  border: {
    height          : 2,
    backgroundColor : Colors.primary,
    marginHorizontal: 20
  },
  nameRow: {
    flexDirection: "row",
    alignItems   : "center",
    
  },
  name: {
    fontSize  : 16,
    fontWeight: "400",
    color     : Colors.grey300
  }
});