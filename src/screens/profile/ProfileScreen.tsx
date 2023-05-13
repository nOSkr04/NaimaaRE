import {  ScrollView, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { IAuth } from "../../interface/IAuth";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "expo-image";
import { Colors } from "../../constants/Colors";
import { formatDistanceToNowStrict } from "date-fns";
import { mn } from "date-fns/locale";
import { RowButton } from "../../widgets/RowButton";
import { Entypo,  FontAwesome5,  MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthApi } from "../../apis";
import { authLogout } from "../../store/authSlice";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = memo(() => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state: { auth: IAuth }) => state.auth);
  const logout = async () => {
    try {
      await AuthApi.logout();
      dispatch(authLogout());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false} style={styles.root}>
      <Image contentFit="cover" source={require("../../assets/splash.png")} style={styles.image} />
      <Text style={styles.text}>{user?.phone}</Text>
      <View style={styles.permissionRow}>
        <Text style={styles.permissionTitle}>Үйлчилгээний эрх: </Text>
        <Text style={styles.permissionContent}>{formatDistanceToNowStrict(new Date(user?.deadline ? user.deadline : 0), { locale: mn })}</Text>
      </View>
      <View style={styles.buttonContainers}>
        <RowButton
          icon={<Entypo color={Colors.black} name="old-phone" size={24} />}
          onPress={() => Linking.openURL("tel://+976 96660971 ")}
          title="Холбоо барих"
        />
        <View style={styles.mt8} />
        {/* <RowButton icon={<FontAwesome5 color={Colors.black} name="user-edit" size={20} />} title="Нууц үг солих" />
        <View style={styles.mt8} />
        <RowButton icon={<MaterialCommunityIcons color={Colors.black} name="bank-outline" size={24} />} title="Хугацаа сунгах" />
        <View style={styles.mt8} /> */}
        <RowButton icon={<MaterialCommunityIcons color={Colors.black} name="logout" size={24} />} onPress={logout} title="Бүртгэлээс гарах" />
        <View style={styles.mt8} />
        <RowButton icon={<FontAwesome5 color={Colors.danger} name="user-alt-slash" size={20} />} onPress={() => navigation.navigate("DeleteAccountSheet", { id: user?._id || "" })} title="Бүртгэл устгах" />
      </View>
    </ScrollView>
  );
});

ProfileScreen.displayName = "ProfileScreen";

export { ProfileScreen };

const styles = StyleSheet.create({
  root: {
    flex           : 1,
    backgroundColor: Colors.white,
    borderRadius   : 20,
    marginTop      : 4,
  },
  text: {
    textAlign : "center",
    color     : Colors.primary,
    fontWeight: "bold",
    fontSize  : 20,
    marginTop : 10,
  },
  image: {
    width       : 100,
    height      : 100,
    borderRadius: 100,
    alignSelf   : "center",
    marginTop   : 20,
  },
  permissionRow: {
    flexDirection: "row",
    alignItems   : "center",
    alignSelf    : "center",
    marginTop    : 5,
    marginBottom : 8,
  },
  permissionTitle: {
    fontSize  : 15,
    fontWeight: "400",
  },
  permissionContent: {
    fontSize  : 18,
    color     : Colors.primary,
    fontWeight: "500",
  },
  buttonContainers: {
    marginHorizontal: 20,
  },
  mt8: {
    marginTop: 8,
  },
});
