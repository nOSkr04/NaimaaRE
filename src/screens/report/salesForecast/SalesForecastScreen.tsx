import { ScrollView,  Text,TouchableOpacity,View } from "react-native";
import React, { memo } from "react";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import * as XLSX from "xlsx";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { Row, Table } from "react-native-table-component";
import { format } from "date-fns";
import { Colors } from "../../../constants/Colors";
import { MyButton } from "../../../widgets/MyButton";
import { TableStyle } from "../TableStyle";
import { SalesForecastHtml } from "./SalesForecastHtml";
type Props = NativeStackScreenProps<RootStackParamList, "SalesForecastScreen">;

const SalesForecastScreen = memo(({ route }: Props) => {
  const { data, date1, date2 } = route.params;
  const navigation = useNavigation();

  const header = {
    tableHead: [
      "Бараа бүтээгдэхүүний нэр төрөл",
      "Тоо ширхэг",
      "Нэгжийн дундаж өртөг",
      "Нийт үнэ",
      "Борлуулсан барааны дундаж үнэ",
      "Төсөөллийн борлуулалт /дундаж үнээр/",
      "Төсөөллийн ашиг",
    ],
    widthArr: [150, 90, 120, 120, 120, 120, 120],
  };
  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html: SalesForecastHtml({ data: data, date1: date1, date2: date2 }),
    });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  const generateExcel = () => {
    data?.map((e: string[]) => {
      e.pop();
    });
    data.unshift([
      "Бараа бүтээгдэхүүний нэр төрөл",
      "Нэгжийн дундаж өртөг",
      "Тоо ширхэг",
      "Нэгжийн дундаж үнэ",
      "Нийт үнэ",
      "Нийт ашиг",
    ]);
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "MyFirstSheet", true);
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "ProfitReport.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      shareAsync(filename);
    });
  };
  if(!data){
    return <Text>Дата олдсонгүй</Text>;
  }
    return (
      <View style={TableStyle.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={TableStyle.table}>
              <Row
               data={[
                `${format(new Date(date1), "yyyy-MM-dd")} наас ${format(new Date(date2), "yyyy-MM-dd")} борлуулалт үр ашгийн тайлан`,
               ]}
              style={TableStyle.header1}
              textStyle={TableStyle.text1}
              // widthArr={[780]}
            />
              <Row
              data={["", "Бараа бүтээгдэхүүн", ""]}
              style={TableStyle.header1}
              textStyle={TableStyle.text}
              widthArr={[150, 330, 360]}
            />
              <Row
              data={header.tableHead}
              style={TableStyle.header}
              textStyle={TableStyle.text}
              widthArr={header.widthArr}
            />
            </Table>
            <ScrollView style={TableStyle.dataWrapper}>
              <Table borderStyle={TableStyle.table}>
                {data.map((rowData, index) => (
                  <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("GoodDetailScreen", {
                      id: rowData[8],
                    })
                  }
                >
                    <Row
                    data={rowData}
                    style={[
                      TableStyle.row,
                      index % 2 && { backgroundColor: Colors.smokeWhite },
                    ]}
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

  SalesForecastScreen.displayName="SalesForecastScreen";
  
export { SalesForecastScreen };
