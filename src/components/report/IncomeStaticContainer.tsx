import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Chevron } from "./Chevron";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../constants/Colors";
import { format, formatDistanceToNow } from "date-fns";
import MN from "date-fns/locale/mn";
import { IncomeProps } from "../../screens/report/incomeStatic/IncomeStaticScreen";
import { IGoods } from "../../interface/IGoods";
import { MyButton } from "../../widgets/MyButton";
import { useNavigation } from "@react-navigation/native";
const LIST_ITEM_HEIGHT = 80;

type Props = {
  item: IncomeProps;
};



const IncomeStaticContainer = memo(({ item }: Props) => {
  const navigation = useNavigation();
  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);

  const progress = useDerivedValue(() => (open.value ? withSpring(1) : withTiming(0)));

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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (height.value === 0) {
            runOnUI(() => {
              "worklet";
              height.value = measure(aref)?.height;
            })();
          }
          open.value = !open.value;
        }}>
        <Animated.View style={[styles.container, headerStyle]}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Сагсний дугаар: O{item.number && item.number.slice(2, 9)}</Text>
              <Text style={styles.title}>Орлогын төрөл: {item.incomeType}</Text>
              <Text style={styles.title}>Хэзээ: {formatDistanceToNow(new Date(item.createdAt), { locale: MN })}</Text>
            </View>
            <Chevron {...{ progress }} type={item.type} />
          </View>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View style={[styles.items, style]}>
        <View
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => console.log({ h })}
          ref={aref}>
          <View style={styles.contentContainer}>
            <View style={styles.contentRoot}>
              <Text style={styles.name}>Нийт дүн: {item.finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}₮</Text>
              <Text>{format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}</Text>
            </View>
            <MyButton
              onPress={() =>
                navigation.navigate("BillDetailScreen", {
                  bill      : item._id,
                  number    : item.number,
                  type      : item.type,
                  createdAt : item.createdAt,
                  finalPrice: item.finalPrice,
                })
              }
              styleButton={styles.buttonContainer}
              title="Дэлгэрэнгүй үзэх"
            />
          </View>
        </View>
      </Animated.View>
      <View style={styles.border} />
    </View>
  );
});

IncomeStaticContainer.displayName = "IncomeStaticContainer";

export { IncomeStaticContainer };

const styles = StyleSheet.create({
  container: {
    padding        : 8,
    justifyContent : "space-between",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize  : 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
  headerRow: {
    flexDirection : "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    backgroundColor  : Colors.white,
    paddingVertical  : 8,
    paddingHorizontal: 8,
    height           : LIST_ITEM_HEIGHT,
    justifyContent   : "center",
  },
  contentRoot: {
    flexDirection : "row",
    justifyContent: "space-between",
    marginBottom  : 10,
  },
  name: {
    fontSize: 16,
  },
  pointsContainer: {
    borderRadius   : 8,
    backgroundColor: Colors.successGreen,
    padding        : 8,
  },
  pointUnSuccess: {
    borderRadius   : 8,
    backgroundColor: Colors.danger,
    padding        : 8,
  },
  points: {
    color     : Colors.white,
    fontWeight: "bold",
  },
  all: {
    textAlign: "right",
    fontSize : 12,
    color    : Colors.greyText,
  },
  border: {
    width          : "100%",
    height         : 2,
    backgroundColor: Colors.border,
  },
  buttonContainer: {
    marginHorizontal: 80,
  },
});
