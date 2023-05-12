import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { IGoods } from "../../interface/IGoods";
import { format } from "date-fns";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");

type Props = {
  scrollA: Animated.Value;
  data?: IGoods;
};

const GoodHeader = memo(({ scrollA, data }: Props) => {
  const navigation = useNavigation();
  if (!data) {
    return null;
  }

  return (
    <View>
      <Animated.Image
        source={ data.photo !== "no-photo.jpg"  ? { uri: `https://naimaaadmin.com/upload/${data.photo}` } :{ uri: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?auto=compress&cs=tinysrgb&w=600" } }
        style={[styles.imageStyle, { transform: [{ translateY: scrollA }] }]}
      />
      <View style={styles.contentContainer}>
        <View style={styles.rowText}>
          <Text style={styles.textTitle}>Категори: </Text>
          <Text style={styles.category}>{data.category.name}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.textTitle}>Нэр: </Text>
          <Text style={styles.name}>{data.name}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.textTitle}>Үнэ: </Text>
          <Text style={styles.price}>{data.price} ₮</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.textTitle}>Хэмжээ: </Text>
          <Text style={styles.unitQuant}>
            {data.quantity} {data.unit}
          </Text>
        </View>
        {data.barCode && (
          <View style={styles.rowText}>
            <Text style={styles.textTitle}>Баркод: </Text>
            <Text style={styles.barcode}>
              {data.barCode} 
            </Text>
          </View>
        )}
        <View style={styles.rowText}>
          <Text style={styles.textTitle}>Үүсгэсэн огноо: </Text>
          <Text style={styles.createdAt}>{format(new Date(data.createdAt), "yyyy-MM-dd")}</Text>
        </View>
      </View>
      <View style={styles.rowEdit}>
        <TouchableOpacity onPress={() => navigation.navigate("DeleteSheet", { id: data._id })} style={styles.widget}>
          <AntDesign color={Colors.danger} name="delete" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("EditProductScreen", { id: data._id })} style={styles.widget}>
          <AntDesign color={Colors.primary} name="edit" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

GoodHeader.displayName = "GoodHeader";

export { GoodHeader };

const styles = StyleSheet.create({
  imageStyle: {
    width : "100%",
    height: height * 0.4,
  },
  contentContainer: {
    backgroundColor     : Colors.white,
    paddingTop          : 16,
    paddingHorizontal   : 16,
    borderTopLeftRadius : 20,
    borderTopRightRadius: 20,
  },
  category: {
    fontSize  : 14,
    fontWeight: "600",
    color     : Colors.greyText,
  },
  name: {
    fontSize  : 30,
    fontWeight: "600",
    marginTop : 4,
  },
  price: {
    fontSize  : 24,
    color     : Colors.primary,
    fontWeight: "500",
  },
  unitQuant: {
    fontSize  : 20,
    color     : Colors.secondaryPrimary,
    fontWeight: "500",
  },
  barcode: {
    fontSize  : 20,
    color     : Colors.black,
    fontWeight: "500",
  },
  createdAt: {
    fontSize  : 16,
    fontWeight: "400",
    color     : Colors.greyText,
  },
  rowText: {
    flexDirection: "row",
    alignItems   : "center",
    marginTop    : 5,
  },
  textTitle: {
    fontSize  : 14,
    fontWeight: "500",
    color     : Colors.black,
  },
  rowEdit: {
    flexDirection    : "row",
    alignItems       : "center",
    justifyContent   : "space-between",
    paddingHorizontal: 20,
    paddingTop       : 20,
    backgroundColor  : Colors.white,
  },
  widget: {
    borderWidth   : 1,
    borderRadius  : 20,
    width         : "46%",
    alignItems    : "center",
    justifyContent: "center",
    height        : 60,
  },
});
