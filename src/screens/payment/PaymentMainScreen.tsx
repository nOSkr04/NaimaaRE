import { StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import useSwr from "swr";
import { AuthApi } from "../../apis";
import { IAuth } from "../../interface/IAuth";
import { format } from "date-fns";
import { MyButton } from "../../widgets/MyButton";
import { useDispatch } from "react-redux";
import { authLogout } from "../../store/authSlice";
import { useNavigation } from "@react-navigation/native";
const PaymentMainScreen = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data } = useSwr<IAuth>("auth/me", async () => {
    return await AuthApi.me();
  });

  const logout = async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.root}>
      <MaterialCommunityIcons color={Colors.black} name="bank-off-outline" size={80} />
      {data?.deadline &&
        <>
          <Text>Үйлчилгээний дууссан хугацаа: </Text>
          <Text style={styles.deadline}>{format(new Date(data?.deadline), "yyyy-MM-dd HH:mm")}</Text>
        </>
      }
      <MyButton  onPress={() => navigation.navigate("DateExtendSheet")} styleButton={styles.button} title="Үйлчилгээ сунгах"  />
      <View style={styles.mv20} />
      <MyButton onPress={logout} styleButton={styles.button}  title="Бүртгэлээс гарах" type="secondary" />
    </View>
  );
});

PaymentMainScreen.displayName = "PaymentMainScreen";

export { PaymentMainScreen };

const styles = StyleSheet.create({
  root: {
    flex          : 1,
    justifyContent: "center",
    alignItems    : "center",
  },
  deadline: {
    color       : Colors.danger,
    fontSize    : 20,
    textAlign   : "center",
    marginBottom: 20,
    marginTop   : 8,
    fontWeight  : "500"
  },
  mv20: {
    marginVertical: 10
  },
  button: {
    width: "90%"
  }
});
