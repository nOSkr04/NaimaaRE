import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

export const TableStyle = StyleSheet.create({
    container  : { flex: 1,  paddingTop: 30, backgroundColor: Colors.white },
    header     : { height: 50, backgroundColor: Colors.fbColor },
    text       : { textAlign: "center" },
    text1      : { textAlign: "center", fontWeight: "800" },
    dataWrapper: { marginTop: -1 },
    row        : { height: 40, backgroundColor: Colors.smokeWhite },
    header1    : { height: 50, backgroundColor: Colors.border },
    table      : { borderWidth: 1, borderColor: Colors.smokeWhite },
    mt5        : { marginVertical: 5 },
    mh20       : {
      marginHorizontal: 20
    }
  });