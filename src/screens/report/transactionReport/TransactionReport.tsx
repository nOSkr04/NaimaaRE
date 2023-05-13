import { ScrollView,  Text, TouchableOpacity,View } from "react-native";
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
import { TableStyle } from "../TableStyle";
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
    <View style={TableStyle.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={TableStyle.table}>
            <Row
              data={[
                `${format(new Date(date1), "yyyy-MM-dd")} наас ${format(new Date(date2), "yyyy-MM-dd")} гүйлгээ`,
                // `${moment(startDate).format("YYYY-MM-DD")} наас ${moment(
                //   endDate
                // ).format("YYYY-MM-DD")} гүйлгээ`,
              ]}
              style={TableStyle.header1}
              textStyle={TableStyle.text}
              widthArr={[480]}
            />
            <Row data={["", "Орлогын гүйлгээ", "Зарлагын гүйлгээ"]} style={TableStyle.header1} textStyle={TableStyle.text} widthArr={[100, 180, 200]} />
            <Row data={header.tableHead} style={TableStyle.header} textStyle={TableStyle.text} widthArr={header.widthArr} />
          </Table>
          <ScrollView style={TableStyle.dataWrapper}>
            <Table borderStyle={TableStyle.table}>
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
                    style={[TableStyle.row, index % 2 && { backgroundColor: Colors.white }]}
                    textStyle={TableStyle.text}
                    widthArr={header.widthArr}
                  />
                </TouchableOpacity>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
      <MyButton  onPress={printToFile} styleButton={TableStyle.mh20} title="PDF лүү хөрвүүлэх"  />
      <View style={TableStyle.mt5} />
      <MyButton  onPress={generateExcel} styleButton={TableStyle.mh20} title="Excel лүү хөрвүүлэх"  type="secondary" />
      <View style={TableStyle.mt5} />
      <View style={TableStyle.mt5} />
    </View>
  );
});

TransactionReport.displayName = "TransactionReport";

export { TransactionReport };


