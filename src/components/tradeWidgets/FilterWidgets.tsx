import { StyleSheet,  View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { BarcodeButton } from "./BarcodeButton";
import { TripleFilter } from "./TripleFilter";
import { MyButton } from "../../widgets/MyButton";
import { useNavigation } from "@react-navigation/native";

const FilterWidgets = memo(() => {
  const navigation = useNavigation();
    return (
      <View style={styles.root}>
        <BarcodeButton/>
        <TripleFilter/>
        <MyButton onPress={() => navigation.navigate("AddProductScreen")} title="Бараа бүртгэх"  />
      </View>
    );
  });

  FilterWidgets.displayName="FilterWidgets";

export{ FilterWidgets };

const styles = StyleSheet.create({
    root: {
        backgroundColor  : Colors.white,
        marginTop        : 8,
        borderRadius     : 20,
        paddingHorizontal: 20,
        paddingVertical  : 16,
    }
});