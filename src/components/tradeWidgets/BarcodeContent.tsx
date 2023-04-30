import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { memo, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MyButton } from "../../widgets/MyButton";
import { Colors } from "../../constants/Colors";

type Props = {
    result: string
   setResult: React.Dispatch<React.SetStateAction<string>>;
   handleSheetChanges: () => void
}

const { height } = Dimensions.get("window");

const BarcodeContent = memo(({ result,setResult,handleSheetChanges }: Props) => {
 
    const [scanned, setScanned] = useState(false);
    const handleBarCodeScanned = ({  data }: {data:string}) => {
        setScanned(true);
        setResult(data);
       
      };
      
      const refreshScanned = () => {
        setScanned(false);
        setResult("");
      };
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
              <MyButton 
             onPress={handleSheetChanges}
              styleButton={styles.button} title="Үргэлжлүүлэх"  />
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

  BarcodeContent.displayName="BarcodeContent";

export { BarcodeContent };

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
      height          : height * 0.45,
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