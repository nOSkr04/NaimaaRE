import React, { memo,  useState } from "react";
import {  KeyboardAvoidingView, ScrollView, StyleSheet, Text,  TouchableOpacity,View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { AntDesign } from "@expo/vector-icons";
import OtpField from "../../components/authWidget/OtpField";
import { Colors } from "../../constants/Colors";

type Props = NativeStackScreenProps<RootStackParamList, "OtpVerifyScreen">;

const OtpVerifyScreen = memo(({ route }: Props) => {
  const { data } = route.params;
  const [timer, setTimer] = useState(30);
  const [error,setError] = useState(null);
//   const navigation = useNavigation();
  const onSubmit = async (e: string[]) => {
    const otp = e.join("");
    console.log(otp);
    // try {
    //  await AuthApi.checkOtp(phone,otp );
    //   navigation.navigate("SetPasswordScreen", { phone: phone });
    //   Keyboard.dismiss();
    // } catch (err:any) {
    //   Keyboard.dismiss();
    //   setError(err.error.message);
    // }
  };
//   const onRetryOtp = async () => {
//     setTimer(30);
//     try{
//       await AuthApi.otpVerify(phone);
//     } catch (err){
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//    const intervalId = setInterval(() => {
//     if (timer > 0) {
//         setTimer(timer - 1);
//       }
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [timer]);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.inputTitle}>Баталгаажуулах</Text>
        <View style={styles.rowTexts}>
          <Text style={styles.darkText}>Таны </Text>
          <Text style={styles.primaryText}>(+976 {data.phone}) </Text>
          <Text style={styles.darkText}>дугаарт ирсэн </Text>
          <Text style={styles.darkText}>тан код-г бичиж өгнө үү.</Text>
        </View>
        <OtpField onComplete={onSubmit} />
        {error && 
          <Text style={styles.error}>{error}</Text>
        }
        {timer < 0 ? 
          <TouchableOpacity
        //    onPress={onRetryOtp} 
           style={styles.retryButton}>
            <AntDesign color={Colors.black} name="API" />
            <Text style={styles.retryText}> Дахин код авах</Text>
          </TouchableOpacity>
        :
          <Text style={styles.countTime}>00:{timer}</Text>
        }
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

OtpVerifyScreen.displayName = "OtpVerifyScreen";

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    backgroundColor: Colors.white,
  },
  inputTitle: {
    fontSize        : 24,
    fontFamily      : "Mon700",
    marginTop       : 48,
    marginVertical  : 24,
    marginHorizontal: 24,
  },
  rowTexts: {
    flexDirection   : "row",
    marginHorizontal: 24,
    flexWrap        : "wrap",
    marginBottom    : 50,
  },
  darkText: {
    fontSize  : 15,
    fontFamily: "Mon700",
    color     : Colors.black,
    opacity   : 0.64,
  },
  primaryText: {
    fontSize  : 15,
    fontFamily: "Mon700",
    color     : Colors.primary,
  },
  retryText: {
    opacity   : 0.64,
    color     : Colors.black,
    fontFamily: "Mon600",
  },
  countTime: {
    opacity         : 0.64,
    color           : Colors.black,
    fontFamily      : "Mon600",
    marginHorizontal: 30
  },
  retryButton: {
    flexDirection   : "row",
    marginHorizontal: 30,
    marginTop       : 16,
    alignItems      : "center",
  },
  error: {
    fontSize        : 11,
    lineHeight      : 16,
    letterSpacing   : 0.15,
    marginHorizontal: 30,
    color           : Colors.danger,
    marginVertical  : 15
  }
});

export default OtpVerifyScreen;
