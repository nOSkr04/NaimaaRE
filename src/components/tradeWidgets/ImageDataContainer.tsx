import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { IGoods } from "../../interface/IGoods";
import { ExpoImage } from "../../widgets/ExpoImage";
import { Colors } from "../../constants/Colors";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ImageDataContainer = memo(({ item,barcode }: { item: IGoods,barcode?: string }) => {
  const navigation = useNavigation();
  if(!barcode){
    if(item.photo === "no-photo.jpg"){
      return null;
    }
  }
  return (
    <View style={styles.container}>
      {item.photo && item.photo !== "no-photo.jpg" ? (
        <ExpoImage borderRadius={20} height={200} uri={item.photo} width={"100%"} />
      ) : item.barcode ? (
        <View style={styles.barcode}>
          <Text>{item.barcode}</Text>
        </View>
      ) : (
        <ExpoImage borderRadius={20} height={200} uri={item.photo} width={"100%"} />
      )}
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Төрөл: </Text>
          <Text style={styles.category}> {item.category.name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Үүссэн: </Text>
          <Text style={styles.date}>{format(new Date(item.createdAt), "yyyy-MM-dd")}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>Үлдэгдэл: </Text>
          <Text style={styles.date}>{item.quantity} {item.unit}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("PriceSheet", { data: item })} style={styles.button}>
        <Text style={styles.buttonTitle}>Сагсанд хийх</Text>
      </TouchableOpacity>
    </View>
  );
});

ImageDataContainer.displayName = "ImageDataContainer";

export { ImageDataContainer };

const styles = StyleSheet.create({
  container: {
    width          : width * 0.45,
    backgroundColor: Colors.white,
    marginVertical : 2,
    marginRight    : 4,
    borderRadius   : 20,
    paddingBottom  : 16,
    marginTop      : 4
  },
  barcode: {
    borderRadius   : 20,
    backgroundColor: Colors.greyText,
    height         : 200,
    width          : "100%",
    justifyContent : "center",
    alignItems     : "center",
  },
  detailContainer: {
    marginLeft  : 8,
    marginTop   : 8,
    marginBottom: 8
  },
  title: {
    fontSize  : 16,
    fontWeight: "600",
    textAlign : "center"
  },
  category: {
    fontWeight: "400",
    fontSize  : 14,
    marginTop : 4
  },
  date: {
    fontSize  : 12,
    fontWeight: "500",
marginTop : 4
  },
  rowContainer: {
    flexDirection: "row",
    alignItems   : "center",
  },
  rowText: {
    fontSize  : 12,
    fontWeight: "500"
  },
  button: {
    backgroundColor : Colors.primary,
    borderRadius    : 10,
    marginHorizontal: 16,
    alignItems      : "center",
    justifyContent  : "center",
    flexDirection   : "row",
    paddingVertical : 12,
    marginTop       : 16
  },
  buttonTitle: {
    fontSize  : 12,
    color     : Colors.white,
    fontWeight: "bold"

  }
});
