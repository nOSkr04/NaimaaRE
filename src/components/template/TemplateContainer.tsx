import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { ITemplate } from "../../interface/ITemplate";
import { Colors } from "../../constants/Colors";
import { ExpoImage } from "../../widgets/ExpoImage";

type Props = {
  data: ITemplate
}

const TemplateContainer = memo(({ data }: Props) => {
    return (
      <View style={styles.container}>
        <ExpoImage borderRadius={100} height={50} width={50}  />
        <Text style={styles.title}>{data.name}</Text>
      </View>
    );
  });

  TemplateContainer.displayName="TemplateContainer";

export { TemplateContainer };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderWidth     : 1,
    borderColor     : Colors.border,
    flexDirection   : "row",
    justifyContent  : "space-between",
    paddingVertical : 4,
    alignItems      : "center"
  },
  title: {
    fontSize  : 18,
    fontWeight: "bold",

  }
});