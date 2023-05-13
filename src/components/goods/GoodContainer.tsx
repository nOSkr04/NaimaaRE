import { StyleSheet, Text, TouchableOpacity,  View } from "react-native";
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
import { ITransactions } from "../../interface/ITransactions";
import { format } from "date-fns";

const LIST_ITEM_HEIGHT = 60;

const GoodContainer = memo(({ item }: {item: ITransactions}) => {
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
 if(!item.type){
  return null;
 }
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
            <Text style={styles.title}>{item.type}</Text>
            <Chevron {...{ progress }} type={item.type} />
          </View>
          <Text>{format(new Date(item.createdAt), "yyyy-MM-dd HH:mm")}</Text>
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
              <Text style={styles.name}>Төрөл: {item.incomeType}</Text>
              <View style={item.type ==="Орлого"?  styles.pointsContainer : styles.pointUnSuccess}>
                <Text style={styles.points}> {item.quantity} </Text>
              </View>
            </View>
            <Text>Үлдэгдэл: {item.balanceGoodNumber}</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.border} />
    </View>
  );
});

GoodContainer.displayName = "GoodContainer";

export { GoodContainer };

const styles = StyleSheet.create({
    container: {
      padding        : 8,
      justifyContent : "space-between",
      backgroundColor: Colors.white
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
      justifyContent   : "center"
    },
    contentRoot: {
      flexDirection : "row",
      justifyContent: "space-between",
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
        backgroundColor: Colors.border
    }
  });
