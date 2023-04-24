import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity,  View,  ViewStyle } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
type Props ={
    styleButton?: ViewStyle;
    title?: string;
    textStyle?: TextStyle;
    onPress?: (event: GestureResponderEvent) => void
    disabled?: boolean
}

const MyButton = memo(({ styleButton,title,textStyle, onPress,disabled }: Props) => {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container, { ...styleButton }]}>
        {disabled ? 
          <View>
            <Text style={[styles.title, { ...textStyle }]}>{title}</Text>
            <Entypo color={Colors.black} name="block" size={16}  />
          </View>
      :
          <Text style={[styles.title, { ...textStyle }]}>{title}</Text>
    }
      </TouchableOpacity>
    );
  });

  MyButton.displayName="MyButton";

export { MyButton };

const styles = StyleSheet.create({
    container: {
        alignItems     : "center",
        justifyContent : "center",
        padding        : 8,
        backgroundColor: Colors.primary,
        borderRadius   : 12,
        paddingVertical: 12
    },
    title: {
        color: Colors.white
    }
});