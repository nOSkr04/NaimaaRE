import { StyleSheet, Text, TouchableOpacity,View } from "react-native";
import React,{ memo } from "react";
import { BottomSheetParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { AuthApi } from "../apis";
import { Colors } from "../constants/Colors";
import { useDispatch } from "react-redux";
import { authLogout } from "../store/authSlice";

type Props = NativeStackScreenProps<BottomSheetParamList, "DeleteAccountSheet">;

const DeleteAccountSheet = memo(({ route }: Props) => {
    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onSubmit = async (id: string) => {
      try {
        await AuthApi.deleteUser(id);
        dispatch(authLogout());
        navigation.goBack();
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <View>
        <Text style={styles.title}>Та өөрийн бүртгэлийг устгахдаа итгэлтэй байна уу?</Text>
        <Text style={styles.description}>Таны бүртгүүлсэн бүх бараа болон тайлан бүгд цуг устахыг анхаарна уу!</Text>
        <View style={styles.rowButton}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.noButton}>
            <Text style={styles.noTitle}>Үгүй</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSubmit(id)} style={styles.yesButton}>
            <Text style={styles.yesTitle}>Тийм</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  DeleteAccountSheet.displayName="DeleteAccountSheet";

export { DeleteAccountSheet };


const styles = StyleSheet.create({
    title: {
      fontSize        : 16,
      fontWeight      : "500",
      color           : Colors.danger,
      textAlign       : "center",
      marginHorizontal: 80,
      marginTop       : 20
    },
    rowButton: {
      flexDirection   : "row",
      justifyContent  : "space-between",
      marginHorizontal: 20,
      marginTop       : 20
    },
    noButton: {
      borderWidth    : 2,
      borderColor    : Colors.primary,
      justifyContent : "center",
      alignItems     : "center",
      width          : "45%",
      borderRadius   : 12,
      paddingVertical: 12
    },
    noTitle: {
      fontSize  : 16,
      fontWeight: "bold",
      color     : Colors.black
    },
    yesTitle: {
      fontSize  : 16,
      fontWeight: "bold",
      color     : Colors.white
    },
    yesButton: {
      borderWidth    : 2,
      borderColor    : Colors.danger,
      backgroundColor: Colors.danger,
      justifyContent : "center",
      alignItems     : "center",
      width          : "45%",
      borderRadius   : 12,
      paddingVertical: 12
    },
    description: {
        fontSize        : 14,
        fontWeight      : "400",
        textAlign       : "center",
        marginHorizontal: 40,
        color           : Colors.grey300,
        marginVertical  : 20
    }
  });