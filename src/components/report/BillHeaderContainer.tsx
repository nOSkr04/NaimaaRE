import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { format } from "date-fns";
import { Colors } from "../../constants/Colors";

type Props ={
    number: string, type: string, createdAt: string, finalPrice: number
}

const BillHeaderContainer = memo((props: Props) => {
    const { createdAt, finalPrice,number,type } = props;
    return (
      <View>
        <Text
          style={type === "Орлого" ?  styles.incomeTitle : styles.outComeTitle}
        >
          {type}
        </Text>
        <View style={styles.basketContainer}>
          <Text style={styles.name}>
            Сагсны дугаар:
          </Text>
          <Text style={styles.result}>  {number}</Text>
        </View>
        <View style={styles.basketContainer}>
          <Text style={styles.name}>
            Үүсгэсэн огноо:
          </Text>
          <Text style={styles.result}>  {format(new Date(createdAt), "yyyy-MM-dd")}</Text>
        </View>
        <View style={styles.basketContainer}>
          <Text style={styles.name}>
            Нийт дүн:
          </Text>
          <Text style={styles.result}>   {finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮</Text>
        </View>
        <View style={styles.border} />
        <Text style={styles.dataHeader}>Бараанууд:</Text>
      </View>
    );
  });

  BillHeaderContainer.displayName="BillHeaderContainer";

export { BillHeaderContainer };

const styles = StyleSheet.create({
    incomeTitle: {
            color     : Colors.primary,
            fontWeight: "bold",
            fontSize  : 24,
            textAlign : "center",
            marginTop : 20
    },
    outComeTitle: {
        color       : Colors.danger,
        fontWeight  : "bold",
        fontSize    : 24,
        textAlign   : "center",
        marginTop   : 20,
        marginBottom: 8
    },
    basketContainer: {
        flexDirection: "row",
        alignItems   : "center",
        marginTop    : 8
    },
    name: {
        fontSize  : 18,
        fontWeight: "400"
    },
    result: {
        fontSize  : 20,
        fontWeight: "500",
    },
    dataHeader: {
      fontSize  : 16,
      fontWeight: "600",
    },
    border: {
      borderWidth : 1,
      borderColor : Colors.border,
      marginTop   : 10,
      marginBottom: 16
    }
});