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
    justifyContent : "center",
    alignItems     : "center",
    backgroundColor: Colors.grey300,
  },
});

interface ChevronProps {
    progress: Animated.SharedValue<number>;
  }

const Chevron = memo(({ progress }: ChevronProps) => {
    const style = useAnimatedStyle(() => ({
        backgroundColor: mixColor(progress.value, Colors.greyText, Colors.primary),
        transform      : [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
      }));
    return (
      <Animated.View style={[styles.container, style]}>
        <AntDesign color={Colors.white} height={20} name="down" width={20} />
      </Animated.View>
    );
  });

  Chevron.displayName="Chevron";

export { Chevron };

