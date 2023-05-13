import { StyleSheet, Text, View } from "react-native";
import React,{ memo } from "react";
import { Colors } from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { MyButton } from "../widgets/MyButton";
import { useNavigation } from "@react-navigation/native";
type Props ={
   title:string;
   addGood?: boolean;
}

const EmptyContainer = memo(({ title,addGood }: Props) => {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <FontAwesome color={Colors.primary} name="inbox" size={40} />
        <Text style={styles.title}>{title}</Text>
        {addGood && 
          <MyButton onPress={() => navigation.navigate("AddProductScreen")}  title="Бараа бүртгэх"   />
        }
      </View>
    );
  });

  EmptyContainer.displayName="EmptyContainer";

export  { EmptyContainer };

const styles = StyleSheet.create({
    container: {
        flex            : 1,
        marginHorizontal: 20,
        marginVertical  : 20,
        alignItems      : "center",
    },
    title: {
        fontWeight    : "bold",
        textAlign     : "center",
        color         : Colors.primary,
        marginVertical: 20
    }
});