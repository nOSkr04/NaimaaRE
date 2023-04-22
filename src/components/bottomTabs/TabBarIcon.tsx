import React, { ComponentProps } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function TabBarIcon(props: {
    name: ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={30} style={styles.container} {...props} />;
}

const styles = StyleSheet.create({
    container:
    {
        marginBottom: -3
    }

});