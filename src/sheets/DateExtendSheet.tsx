import { StyleSheet,  View } from "react-native";
import React, { memo, useState } from "react";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { SheetHeader } from "../components/header/SheetHeader";
import { MyButton } from "../widgets/MyButton";
import { PaymentApi } from "../apis";
import { IAuth } from "../interface/IAuth";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BigLoader } from "../components/loader/BigLoader";

const DateExtendSheet = memo(() => {
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const navigaiton = useNavigation();
  const [loading, setLoading] = useState(false);
  const onPress = async(amount: number) => {
    setLoading(true);
    try {
     const res =  await PaymentApi.postInvoince(user?._id || "", amount);
      navigaiton.navigate("QpaySheet", { id: res.data });
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false);
    }
  };
  if(loading){
    return <BigLoader/>;
  }
    return (
      <BottomSheetView style={styles.root}>
        <SheetHeader title="Хугацаа сонгох"  />
        <View style={styles.container}>
          <MyButton onPress={() => onPress(100)} title="1 сараар сунгах"  />
          <View style={styles.mv10} />
          <MyButton onPress={() => onPress(150)} title="2 сараар сунгах"  />
          <View style={styles.mv10} />
          <MyButton onPress={() => onPress(200)} title="3 сараар сунгах"  />
          <View style={styles.mv10} />
        </View>
      </BottomSheetView>
    );
  });

  DateExtendSheet.displayName= "DateExtendSheet";

export { DateExtendSheet };

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    marginHorizontal: 20,
    marginTop       : 20
  },
  mv10: {
    marginVertical: 10
  }
});