import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity,  View,  ViewStyle } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
type Props ={
    styleButton?: ViewStyle;
    title?: string;
    textStyle?: TextStyle;
    onPress?: (event: GestureResponderEvent) => void
    disabled?: boolean;
    type?: "primary" | "secondary" | "danger" | "warning" | "success"
}

const MyButton = memo(({ styleButton,title,textStyle, onPress,disabled,type }: Props) => {
  if(type === "danger"){
    return (
      <TouchableOpacity onPress={onPress} style={[{ ...styleButton },styles.danger, ]}>
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
  }
  if(type === "secondary"){
    return (
      <TouchableOpacity onPress={onPress} style={[{ ...styleButton },styles.secondary, ]}>
        {disabled ? 
          <View>
            <Text style={[styles.titleBlack, { ...textStyle }]}>{title}</Text>
            <Entypo color={Colors.black} name="block" size={16}  />
          </View>
      :
          <Text style={[styles.titleBlack, { ...textStyle }]}>{title}</Text>
    }
      </TouchableOpacity>
    );
  }
    return (
      <TouchableOpacity disabled={disabled} onPress={onPress} style={[{ ...styleButton },styles.container, ]}   >
        {disabled ? 
          <View style={styles.row}>
            {/* <Text style={[styles.title, { ...textStyle }]}>{title}</Text> */}
            <Entypo color={Colors.white} name="block" size={16}  />
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
    danger: {
        alignItems     : "center",
        justifyContent : "center",
        padding        : 8,
        backgroundColor: Colors.danger,
        borderRadius   : 12,
        paddingVertical: 12
    },
    secondary: {
        alignItems     : "center",
        justifyContent : "center",
        padding        : 8,
        borderRadius   : 12,
        paddingVertical: 12,
        borderWidth    : 2,
        borderColor    : Colors.primary
    },
    title: {
        color     : Colors.white,
        fontWeight: "500"
    },
    titleBlack: {
      color: Colors.black
    },
    row: {
      flexDirection: "row",
      alignItems   : "center"
    }
});