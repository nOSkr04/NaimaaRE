import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { IGoods } from "../../interface/IGoods";

const { height } = Dimensions.get("window");

type Props = {
  scrollA: Animated.Value;
  data?: IGoods;
};

const GoodHeader = memo(({ scrollA, data }: Props) => {
  if (!data) {
    return null;
  }
  return (
    <View>
      <Animated.Image
        source={{
          uri: "https://images.pexels.com/photos/16511744/pexels-photo-16511744.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
        }}
        style={[styles.imageStyle, { transform: [{ translateY: scrollA }] }]}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.category}>{data.category.name}</Text>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.price}>{data.price}</Text>
        <Text style={styles.unitQuant}>
          {data.quantity} {data.unit}
        </Text>
        <Text style={styles.barcode}>{data.barcode}</Text>
        <Text style={styles.createdAt}>{data.createdAt}</Text>
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
    marginTop : 4,
  },
  unitQuant: {
    fontSize  : 20,
    color     : Colors.secondaryPrimary,
    fontWeight: "500",
    marginTop : 4,
  },
  barcode: {
    fontSize  : 20,
    color     : Colors.black,
    fontWeight: "500",
    marginTop : 4,
  },
  createdAt: {
    fontSize  : 16,
    fontWeight: "400",
    color     : Colors.greyText,
    marginTop : 10,
  },
});
