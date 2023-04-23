import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { Colors } from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { Divider } from "../../widgets/Divider";
import { useNavigation } from "@react-navigation/native";
import { IGoods } from "../../interface/IGoods";
import { TransactionsApi } from "../../apis";
import { useMutate } from "../../hooks/useMutate";

type Props = {
  name: string;
  price: number;
  quantity: number;
  unit?: string;
  item: IGoods;
  edit?: boolean;
  basketId?: string;
};

const ProductList = memo(({ name, price, quantity, unit, item, edit, basketId }: Props) => {
  const mutate = useMutate();
  const navigation = useNavigation();
  const onDelete = async (basketId?: string) => {
    try {
      await TransactionsApi.deleteBasket(basketId || "");
    } catch (err: any) {
      console.log(err);
    }
     finally {
      mutate("/transactions/basket");
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.nameContainer}>{name}</Text>
        <Text style={styles.priceContainer}>{price}</Text>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeContent}>{quantity}</Text>
          <Text style={styles.sizeUnit}> {unit}</Text>
        </View>
        {edit ? (
          <View style={styles.rowIconContainer}>
            <TouchableOpacity onPress={() => onDelete(basketId)} style={styles.rowIcon}>
              <AntDesign color={Colors.white} name="minus" size={16} style={styles.deleteIcon} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate("PriceEditSheet", { id: basketId, backPrice: price, backQuantity: quantity  })} style={styles.rowIcon}    >
              <AntDesign color={Colors.white} name="edit" size={16} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("PriceSheet", { data: item })} style={styles.iconContainer}>
            <AntDesign color={Colors.white} name="plus" size={16} style={styles.icon} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Divider custom={styles.divider} />
    </>
  );
});

ProductList.displayName = "ProductList";

export { ProductList };

const styles = StyleSheet.create({
  container: {
    flexDirection    : "row",
    backgroundColor  : Colors.white,
    paddingHorizontal: 20,
    alignItems       : "center",
    marginBottom     : 8,
  },
  border: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  nameContainer: {
    fontSize: 14,
    width   : "40%",
  },
  priceContainer: {
    fontSize: 14,
    width   : "20%",
  },
  sizeContainer: {
    width        : "20%",
    flexDirection: "row",
    alignItems   : "center",
  },
  sizeContent: {
    fontSize: 14,
  },
  sizeUnit: {
    fontSize  : 10,
    fontWeight: "400",
    color     : Colors.greyText,
  },
  divider: {
    marginHorizontal: 20,
    borderWidth     : 0.5,
    marginBottom    : 8,
    marginTop       : 4,
  },
  iconContainer: {
    alignItems    : "center",
    width         : "20%",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: Colors.primary,
    padding        : 4,
    borderRadius   : 8,
  },
  deleteIcon: {
    backgroundColor: Colors.danger,
    padding        : 4,
    borderRadius   : 8,
  },
  editIcon: {
    backgroundColor: Colors.warning,
    padding        : 4,
    borderRadius   : 8,
  },
  rowIconContainer: {
    width         : "20%",
    justifyContent: "center",
    flexDirection : "row",
  },
  rowIcon: {
    alignItems: "center",
    marginLeft: 8,
  },
});
