import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { PackageDetailProps } from "../../screens/package/PackageDetail";
import { ExpoImage } from "../../widgets/ExpoImage";
import { Colors } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const PackageContainer = memo(({ item }: { item: PackageDetailProps }) => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate("GoodDetailScreen", { id: item.good._id })} style={styles.container}>
        <ExpoImage borderRadius={20} height={80} uri={item.good.photo} width={80} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.good.name}</Text>
          <Text style={styles.price}>Үнэ: {item.price} ₮</Text>
          <Text style={styles.price}>{item.quantity}ш</Text>
          <Text style={styles.allPrice}>Нийт үнэ: {item.price * item.quantity} ₮</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.border} />
    </>
  );
});

PackageContainer.displayName = "PackageContainer";

export { PackageContainer };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop       : 8,
    flexDirection   : "row",
    alignItems      : "center",
  },
  nameContainer: {
    marginLeft: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize  : 16,
    color     : Colors.black,
  },
  price: {
    fontSize  : 14,
    fontWeight: "500",
    color     : Colors.black,
    marginTop : 4,
  },
  allPrice: {
    fontWeight: "600",
    fontSize  : 15,
    color     : Colors.black,
  },
  border: {
    height          : 2,
    backgroundColor : Colors.greyText,
    marginHorizontal: 20,
    marginTop       : 8,
  },
});
