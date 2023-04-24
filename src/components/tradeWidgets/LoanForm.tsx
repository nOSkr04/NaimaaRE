import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";
import { ErrorText } from "../ErrorText";
import { MyTextInput } from "../../widgets/MyTextInput";
import { Colors } from "../../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MyButton } from "../../widgets/MyButton";
import { format } from "date-fns";
export type ILoanProps = {
  loanName: string;
  loanPhone: string;
  loanSize: string;
  loanDate: Date;
};

type Props = {
  control: Control<ILoanProps>;
  errors: FieldErrors<ILoanProps>;
  clearErrors: UseFormClearErrors<ILoanProps>;
};

const { width } = Dimensions.get("window");

const LoanForm = memo(({ control, errors,clearErrors }: Props) => {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };

  return (
    <View>
      <Controller
        control={control}
        name="loanName"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.loanName?.message}
            name="loanName"
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Бэлтгэн нийлүүлэгчийн нэр"
            title="Бэлтгэн нийлүүлэгчийн нэр"
            value={value}
          />
        )}
        rules={{
          required: { value: true, message: "Hийлүүлэгчийн нэр заавал оруулна" },
        }}
      />
      {errors.loanName && <ErrorText title={errors.loanName.message} />}
      <View style={styles.mv4} />
      <Controller
        control={control}
        name="loanPhone"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.loanPhone?.message}
            keyboardType="numeric"
            name="loanName"
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Бэлтгэн нийлүүлэгчийн дугаар"
            title="Бэлтгэн нийлүүлэгчийн дугаар"
            value={value}
          />
        )}
        rules={{
          required : { value: true, message: "Утасны дугаар заавал оруулна" },
          minLength: { value: 6, message: "Утасны дугаар 8 оронтоо тоо байна" },
        }}
      />
      <View style={styles.mv4} />
      <Controller
        control={control}
        name="loanSize"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.loanSize?.message}
            keyboardType="numeric"
            name="loanName"
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Зээлсэн барааны тоо хэмжээ"
            title="Зээлсэн барааны тоо хэмжээ"
            value={value ? value.toString() : ""}
          />
        )}
        rules={{
          required: { value: true, message: "Зээлсэн барааны тоо хэмжээ заавал оруулна" },
        }}
      />
      <View style={styles.mv4} />
      <Controller
        control={control}
        name="loanDate"
        render={({ field: { onChange, value } }) => (
          <>
            {!isPickerShow && (
              <>
                <Text style={[styles.loanTitle, errors.loanDate?.message ? styles.error : null]}>Зээл төлөх хугацаа</Text>
                <TouchableOpacity onPress={showPicker} style={styles.loanContainer}>
                  {!value && <Text style={styles.timeTitle}>3ээл төлөх хугацаа</Text>}
                  {value && <Text style={styles.timeTitle1}>{format(value, "yyyy-MM-dd")}</Text>}
                </TouchableOpacity>
              </>
            )}
            {isPickerShow && (
              <View style={styles.datePicker}>
                <DateTimePicker
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  mode={"date"}
                  onChange={(e, value) => {
                    onChange(value);
                    if (Platform.OS === "android") {
                      setIsPickerShow(false);
                    }
                  }}
                  value={!value ? new Date() : value}
                />
                {Platform.OS === "ios" ? (
                  <View style={styles.datePickerRow}>
                    <MyButton onPress={() => setIsPickerShow(!isPickerShow)} styleButton={styles.dangerDatePickerButton} title="Цуцлах" />
                    <MyButton onPress={() => setIsPickerShow(!isPickerShow)} styleButton={styles.datePickerButton} title="Болсон" />
                  </View>
                ) : null}
              </View>
            )}
          </>
        )}
        rules={{
          required: { value: true, message: "Зээлсэн барааны тоо хэмжээ заавал оруулна" },
        }}
      />

    </View>
  );
});

LoanForm.displayName = "LoanForm";

export { LoanForm };

const styles = StyleSheet.create({
  mv4: {
    marginVertical: 4,
  },
  datePicker: {
    width         : width * 0.9,
    height        : 260,
    display       : "flex",
    justifyContent: "center",
    alignSelf     : "center",
  },
  datePickerRow: {
    flexDirection: "row",
    alignItems   : "center",
    alignSelf    : "flex-end",
  },
  dangerDatePickerButton: {
    paddingVertical: 8,
    marginRight    : 4,
    backgroundColor: Colors.danger,
  },
  datePickerButton: {
    paddingVertical: 8,
    marginRight    : 4,
  },
  error: {
    borderColor: Colors.danger,
    color      : Colors.danger,
  },
  loanContainer: {
    borderWidth    : 1,
    borderColor    : Colors.border,
    paddingLeft    : 8,
    paddingVertical: 12,
    borderRadius   : 8,
  },
  loanTitle: {
    paddingLeft : 8,
    marginBottom: 4,
    fontSize    : 14,
    fontWeight  : "500",
  },
  timeTitle: {
    color: Colors.greyText,
  },
  timeTitle1: {
    color: Colors.black,
  },
});
