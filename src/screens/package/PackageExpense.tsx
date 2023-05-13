import { KeyboardAvoidingView, Platform, ScrollView,StyleSheet,Text,TouchableOpacity,View } from "react-native";
import React, { memo, useState } from "react";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ILoanProps, LoanForm } from "../../components/tradeWidgets/LoanForm";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useMutate } from "../../hooks/useMutate";
import { useHeaderHeight } from "@react-navigation/elements";
import { Colors } from "../../constants/Colors";
import { Divider } from "../../widgets/Divider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MyButton } from "../../widgets/MyButton";
import { TemplateApi } from "../../apis";
type Props = NativeStackScreenProps<RootStackParamList, "PackageExpense">;

const PackageExpense = memo(({ route }: Props) => {
  const { template, } = route.params;
  const height = useHeaderHeight();
  const mutate = useMutate();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<ILoanProps>();

  const [type, setType] = useState(1);
  const onSubmit = async (values: ILoanProps) => {
  
    if (type === 1) {
      try {
        await TemplateApi.templatePostExpense({ template: template, incomeType: "Бэлэн" });
      } catch (err) {
        console.log(err);
      } finally {
        mutate("/goods/user");
        mutate("/transactions/basket");
        mutate("/templates");
        navigation.navigate("Root");
      }
    }
    if (type === 2) {
      try {
        await TemplateApi.templatePostExpense({ template: template, incomeType: "Бэлэн бус" });
      } catch (err) {
        console.log(err);
      } finally {
        mutate("/goods/user");
        mutate("/transactions/basket");
        mutate("/templates");
        navigation.navigate("Root");
      }
    }
    if (type === 3) {
      const loan = {
        template  : template,
        incomeType: "Зээл",
        loanName  : values.loanName,
        loanPhone : values.loanPhone,
        loanSize  : values.loanSize,
        loanDate  : values.loanDate,
      };
      try {
        await TemplateApi.templatePostExpense({ loan: loan });
      } catch (err) {
        console.log(err);
      } finally {
        mutate("/goods/user");
        mutate("/transactions/basket");
        mutate("/templates");
        navigation.navigate("Root");
      }
    }
  };
    return (
      <KeyboardAvoidingView style={styles.container} {...(Platform.OS === "ios" && { behavior: "padding" })} keyboardVerticalOffset={height}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setType(1)} style={styles.checkBoxContainer}>
            <View style={styles.content}>
              <MaterialCommunityIcons color="black" name="account-cash" size={26} />
              <Text style={styles.text}>Бэлнээр</Text>
            </View>
            {type === 1 ? (
              <View style={styles.unCheckBox}>
                <View style={styles.checkBox} />
              </View>
          ) : (
            <View style={styles.unCheckBox} />
          )}
          </TouchableOpacity>
          <Divider custom={styles.divider} />
          <TouchableOpacity onPress={() => setType(2)} style={styles.checkBoxContainer}>
            <View style={styles.content}>
              <MaterialCommunityIcons color="black" name="credit-card" size={26} />
              <Text style={styles.text}>Бэлэн бусаар</Text>
            </View>
            {type === 2 ? (
              <View style={styles.unCheckBox}>
                <View style={styles.checkBox} />
              </View>
          ) : (
            <View style={styles.unCheckBox} />
          )}
          </TouchableOpacity>
          <Divider custom={styles.divider} />
          <TouchableOpacity onPress={() => setType(3)} style={styles.checkBoxContainer}>
            <View style={styles.content}>
              <MaterialCommunityIcons color="black" name="credit-card-clock" size={26} />
              <Text style={styles.text}>Зээлээр</Text>
            </View>
            {type === 3 ? (
              <View style={styles.unCheckBox}>
                <View style={styles.checkBox} />
              </View>
          ) : (
            <View style={styles.unCheckBox} />
          )}
          </TouchableOpacity>
          <Divider custom={styles.divider} />     

          {type === 3 ? (
            <>
              <Divider custom={styles.formDivider} />
              <LoanForm clearErrors={clearErrors} control={control} errors={errors} />
              <Divider custom={styles.formDivider} />
            </>
        ) : null}
        </ScrollView>
        <MyButton onPress={handleSubmit(onSubmit)} styleButton={styles.button} title="Зарлага гаргах"  type="danger"  />
      </KeyboardAvoidingView>
    );
  });

  PackageExpense.displayName="PackageExpense";

export { PackageExpense };

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop       : 16,
    flex            : 1,
  },
  checkBoxContainer: {
    flexDirection  : "row",
    alignItems     : "center",
    justifyContent : "space-between",
    paddingVertical: 4,
  },
  content: {
    flexDirection: "row",
    alignItems   : "center",
  },
  unCheckBox: {
    borderWidth : 1,
    width       : 16,
    height      : 16,
    borderRadius: 8,
    padding     : 1,
  },
  checkBox: {
    width          : 12,
    height         : 12,
    borderRadius   : 8,
    backgroundColor: Colors.secondaryPrimary,
  },
  text: {
    fontSize  : 14,
    fontWeight: "500",
    marginLeft: 16,
  },
  divider: {
    marginTop   : 4,
    marginBottom: 8,
  },
  button: {
    bottom: 10,
  },
  formDivider: {
    marginTop   : 8,
    marginBottom: 8,
  },
});