import { ScrollView, StyleSheet, Text, TouchableOpacity,View } from "react-native";
import { Row, Table } from "react-native-table-component";
import React, { memo } from "react";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { dynamicHtml } from "./TransactionHtml";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import * as XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { MyButton } from "../../../widgets/MyButton";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../constants/Colors";
type Props = NativeStackScreenProps<RootStackParamList, "TransactionReport">;

const TransactionReport = memo(({ route }: Props) => {
  const { data, date1, date2 } = route.params;
  const navigation = useNavigation();
  const header = {
    tableHead: ["Нэр", "Тоо хэмжээ", "Дүн", "Тоо хэмжээ", "Дүн"],
    widthArr : [100, 90, 90, 100, 100],
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: dynamicHtml({ data: data, date1: date1, date2: date2 }),
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  // conver excel
  const generateExcel = () => {
    data?.map((e: string[]) => {
      e.pop();
    });
    data?.unshift(["Нэр", "Тоо хэмжээ", "Дүн", "Тоо хэмжээ", "Дүн"]);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "TransactionReport.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      shareAsync(filename);
    });
  };
  if(!data){
    return <Text>Гүйлгээний тайлан олдсонгүй </Text>;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={styles.table}>
            <Row
              data={[
                `${format(new Date(date1), "yyyy-MM-dd")} наас ${format(new Date(date2), "yyyy-MM-dd")} гүйлгээ`,
                // `${moment(startDate).format("YYYY-MM-DD")} наас ${moment(
                //   endDate
                // ).format("YYYY-MM-DD")} гүйлгээ`,
              ]}
              style={styles.header1}
              textStyle={styles.text}
              widthArr={[480]}
            />
            <Row data={["", "Орлогын гүйлгээ", "Зарлагын гүйлгээ"]} style={styles.header1} textStyle={styles.text} widthArr={[100, 180, 200]} />
            <Row data={header.tableHead} style={styles.header} textStyle={styles.text} widthArr={header.widthArr} />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={styles.table}>
              {data.map((rowData, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("GoodDetailScreen", {
                      id: rowData[5],
                    })
                  }>
                  <Row
                    data={rowData}
                    style={[styles.row, index % 2 && { backgroundColor: Colors.white }]}
                    textStyle={styles.text}
                    widthArr={header.widthArr}
                  />
                </TouchableOpacity>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
      <MyButton onPress={printToFile} />
      <View style={{ marginVertical: 5 }} />
      <MyButton onPress={generateExcel} />
    </View>
  );
});

TransactionReport.displayName = "TransactionReport";

export { TransactionReport };

const styles = StyleSheet.create({
  container  : { flex: 1, padding: 16, paddingTop: 30, backgroundColor: Colors.white },
  header     : { height: 50, backgroundColor: Colors.fbColor },
  text       : { textAlign: "center" },
  text1      : { textAlign: "center", fontWeight: "800" },
  dataWrapper: { marginTop: -1 },
  row        : { height: 40, backgroundColor: Colors.smokeWhite },
  header1    : { height: 50, backgroundColor: Colors.border },
  table      : { borderWidth: 1, borderColor: "#C1C0B9" }
});
