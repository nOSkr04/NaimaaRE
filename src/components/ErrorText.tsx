import { StyleSheet, Text } from "react-native";
import React, { memo } from "react";
import { Colors } from "../constants/Colors";

const ErrorText = memo(({ title } : {title?: string}) => {
    return (
      <Text style={styles.title}>{title}</Text>
    );
  });

  ErrorText.displayName="ErrorText";

export { ErrorText };

const styles = StyleSheet.create({
    title: {
        textAlign     : "right",
        color         : Colors.danger,
        fontSize      : 12,
        fontWeight    : "600",
        marginVertical: 6,
        marginRight   : 20
        
    }
});