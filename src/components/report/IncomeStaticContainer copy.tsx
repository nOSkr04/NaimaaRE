import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
import React, { memo } from "react";
// import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Colors } from "../../constants/Colors";
import { useAnimatedRef, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

type Props ={
    item: {
        _id: string;
        id: string;
        createdAt: string;
        bill: string
        number: string,
        type: string,
        finalPrice: string;
        incomeType: string
    }
}

const IncomeStaticContainer = memo(({ item }: Props) => {
  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0),
  );
  const height = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius : progress.value === 0 ? 8 : 0,
    borderBottomRightRadius: progress.value === 0 ? 8 : 0,
  }));
  const style = useAnimatedStyle(() => ({
    height : height.value * progress.value + 1,
    opacity: progress.value === 0 ? 0 : 1,
  }));
    return (
      <TouchableOpacity
        key={item._id}
        // onPress={() =>
        //   navigation.navigate("BillDetailScreen", {
        //     bill      : item.id,
        //     number    : item.number,
        //     type      : item.type,
        //     createdAt : item.createdAt,
        //     finalPrice: item.finalPrice,
        //   })
        // }
        style={styles.container}
      >
        <View style={{}}>
          <Text>
            Сагсны дугаар: O{item.number && item.number.slice(2, 9)}
          </Text>
          <Text>
            Нийт дүн:{" "}
            {item.finalPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            ₮
          </Text>
          <Text>Орлогын төрөл: {item.incomeType} </Text>
        </View>
        <Text>
          {format(new Date(item.createdAt), "yyyy-MM-dd")}</Text>
      </TouchableOpacity>
    );
  });

  IncomeStaticContainer.displayName="IncomeStaticContainer";

export { IncomeStaticContainer };

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderWidth     : 1,
        borderColor     : Colors.primary,
        borderRadius    : 20,
        padding         : 5,
        marginTop       : 5,
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "center",
      }
});