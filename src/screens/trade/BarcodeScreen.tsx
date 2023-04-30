import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Colors } from "../../constants/Colors";
import { MyButton } from "../../widgets/MyButton";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const BarcodeScreen = memo(() => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState<boolean | string | null>(null);
  const [result,setResult] = useState("");
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = ({  data }: {data:any}) => {
    setScanned(true);
    setResult(data);
  };
  const refreshScanned = () => {
    setScanned(false);
    setResult("");
  };
  if (hasPermission === null) {
    return <Text style={styles.unpermission}>Та камера ийн эрх нээгээгүй байна</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.unpermission}>Та камера ийн эрх нээгээгүй байна</Text>;
  }
  return (
    <View>
      <View style={styles.barcodeContainer}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.barcode} />
      </View>
      <View style={styles.buttonRow}>
        {result ?
          <>
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>
                Илэрц: 
              </Text>
              <Text style={styles.resultText}>{result}</Text>
            </View>
            <MyButton  onPress={() => navigation.navigate("ImageBasketScreen", { barcode: result })} styleButton={styles.button} title="Үргэлжлүүлэх"  />
            <MyButton onPress={refreshScanned} styleButton={styles.button} title="Дахин уншуулах"  />
          </>
          :
          <Text style={styles.detailText}>
            Та утасныхаа камераар барааны баркод уншуулна уу
          </Text>
        }
      </View>
    </View>
  );
});

BarcodeScreen.displayName = "BarcodeScreen";

export { BarcodeScreen };

const styles = StyleSheet.create({
  unpermission: {
    textAlign: "center",
    marginTop: 200,
  },
  container: {
    flex           : 1,
    backgroundColor: Colors.primary,
  },
  barcodeContainer: {
    marginHorizontal: 16,
    height          : height * 0.65,
    marginTop       : 10
  },
  barcode: {
    width : "100%",
    height: "100%",
  },
  buttonRow: {
    marginHorizontal: 16,
  },
  button: {
    marginTop: 12
  },
  detailText: {
    textAlign       : "center",
    fontSize        : 16,
    fontWeight      : "500",
    marginHorizontal: 20,
    marginTop       : 24
  },
  resultContainer: {
    flexDirection   : "row",
    alignItems      : "center",
    marginTop       : 12,
    marginHorizontal: 20
  },
  resultTitle: {
    fontSize  : 16,
    fontWeight: "600",
  },
  resultText: {
    fontSize  : 14,
    fontWeight: "400",
    marginLeft: 24

  }


});
