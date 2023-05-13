import React from "react";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

interface SquareProps {
  index: number;
  progress: Animated.SharedValue<number>;
}

const N = 12;
 const SQUARE_SIZE = 12;

const Square: React.FC<SquareProps> = ({ index, progress }) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }
    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }

    return progress.value;
  }, []);

  const translateY = useDerivedValue(() => {
    if (rotate.value === finalAngle) {
      return withSpring(-N * SQUARE_SIZE);
    }

    if (progress.value > 2 * Math.PI) {
      return withTiming((index - N) * SQUARE_SIZE);
    }

    return withTiming(-index * SQUARE_SIZE);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotate.value}rad` },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <Animated.View
      style={[
      style.contianer,
        rStyle,
      ]}
    />
  );
};

export default Square;

const style = StyleSheet.create({
    contianer: {
        height         : SQUARE_SIZE,
        aspectRatio    : 1,
        backgroundColor: Colors.primary,
        position       : "absolute",
    }
});