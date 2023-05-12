import { StyleSheet } from "react-native";
import React, { memo } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height         : size,
    width          : size,
    borderRadius   : size / 2,
    backgroundColor: Colors.grey300,
    padding        : 10
  },
});

interface ChevronProps {
    progress: Animated.SharedValue<number>;
    type?: string
  }

const Chevron = memo(({ progress,type }: ChevronProps) => {
    const style = useAnimatedStyle(() => ({
        backgroundColor: mixColor(progress.value, Colors.greyText, type === "Орлого"?  Colors.primary : Colors.danger),
        transform      : [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
      }));
    return (
      <Animated.View style={[styles.container, style]}>
        <AntDesign color={Colors.white} height={24} name="down" width={24} />
      </Animated.View>
    );
  });

  Chevron.displayName="Chevron";

export { Chevron };

