import { StatusBar } from "expo-status-bar";
import React, { memo, useEffect } from "react";
import { StyleSheet,  View } from "react-native";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Square from "./Square";
import { Colors } from "../../constants/Colors";

const BigLoader = memo(() => {
    const progress = useSharedValue(0);
    const N = 12;
    useEffect(() => {
      progress.value = withRepeat(
        withTiming(4 * Math.PI, {
          duration: 4000,
          easing  : Easing.linear,
        }),
        -1
      );
    }, [progress]);
  
    return (
      <View style={styles.container}>
        <StatusBar style="inverted" />
        {new Array(N).fill(0).map((_, index) => {
          return <Square index={index} key={index} progress={progress} />;
        })}
      </View>
    );
});

BigLoader.displayName="BigLoader";

export { BigLoader };

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
    alignItems     : "center",
    justifyContent : "center",
  },
});