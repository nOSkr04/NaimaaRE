import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Bill } from "../../screens/report/BillDetailScreen";
import { ExpoImage } from "../../widgets/ExpoImage";

const BillContainer = memo(({ item }: {item: Bill}) => {
    return (
      <View style={styles.container}>
        <ExpoImage borderRadius={10} height={120} uri={item.good.photo} width={120}  />
        <View style={styles.textContainer}>
          <View style={styles.rowText}>
            <Text style={styles.name}>Барааны нэр: </Text>
            <Text style={styles.result}> {item.good.name}</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.name}>Үнэ: </Text>
            <Text style={styles.result}> {item.price} ₮</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.name}>Тоо ширхэг: </Text>
            <Text style={styles.result}> {item.quantity}</Text>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.name}>Нийт үнэ: </Text>
            <Text style={styles.result}> {item.finalPrice} ₮</Text>
          </View>
         
        </View>
      </View>
    );
  });

  BillContainer.displayName="BillContainer";

export { BillContainer };

const styles = StyleSheet.create({
 container: {
  marginTop    : 8,
  flexDirection: "row"
 },
 textContainer: {
  marginLeft: 8
 },
 rowText: {
  flexDirection: "row",
  marginTop    : 4,
  alignItems   : "center"
 },
 name: {
  fontSize  : 14,
  fontWeight: "400"
 },
 result: {
  fontSize  : 16,
  fontWeight: "bold"
 }
});