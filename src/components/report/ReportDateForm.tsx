import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";
import { Colors } from "../../constants/Colors";
import { format } from "date-fns";
import { MyButton } from "../../widgets/MyButton";

export type ReportDateFormProps = {
  date1: string;
  date2: string;
};

type Props = {
  control: Control<ReportDateFormProps>;
  errors: FieldErrors<ReportDateFormProps>;
  clearErrors: UseFormClearErrors<ReportDateFormProps>;
};

const { width } = Dimensions.get("window");

const ReportDateForm = memo(({ clearErrors, control, errors }: Props) => {
  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  };
  const [isPickerShow1, setIsPickerShow1] = useState(false);

  const showPicker1 = () => {
    setIsPickerShow1(true);
  };
  return (
    <>
      <Controller
        control={control}
        name="date1"
        render={({ field: { onChange, value } }) => (
          <>
            {!isPickerShow && (
              <>
                <Text style={[styles.loanTitle, errors.date1?.message ? styles.error : null]}>Эхлэх хугацаа</Text>
                <TouchableOpacity onPress={showPicker} style={styles.loanContainer}>
                  {!value && <Text style={styles.timeTitle}>Эхлэх хугацаа</Text>}
                  {value && <Text style={styles.timeTitle1}>{format(new Date(value), "yyyy-MM-dd")}</Text>}
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
                  value={value ? new Date(value) : new Date()}
                />
                {Platform.OS === "ios" ? (
                  <View style={styles.datePickerRow}>
                    <MyButton
                      onPress={() => setIsPickerShow(!isPickerShow)}
                      styleButton={styles.dangerDatePickerButton}
                      title="Цуцлах"
                      type="danger"
                    />
                    <MyButton
                      onPress={() => {
                        setIsPickerShow(!isPickerShow);
                        clearErrors("date1");
                      }}
                      styleButton={styles.datePickerButton}
                      title="Болсон"
                    />
                  </View>
                ) : null}
              </View>
            )}
          </>
        )}
        rules={{
          required: { value: true, message: "Эхлэх хугацааг заавал сонгоно" },
        }}
      />
      <View style={styles.mv} />
      <Controller
        control={control}
        name="date2"
        render={({ field: { onChange, value } }) => (
          <>
            {!isPickerShow1 && (
              <>
                <Text style={[styles.loanTitle, errors.date2?.message ? styles.error : null]}>Дуусах хугацаа</Text>
                <TouchableOpacity onPress={showPicker1} style={styles.loanContainer}>
                  {!value && <Text style={styles.timeTitle}>Дуусах хугацаа</Text>}
                  {value && <Text style={styles.timeTitle1}>{format(new Date(value), "yyyy-MM-dd")}</Text>}
                </TouchableOpacity>
              </>
            )}
            {isPickerShow1 && (
              <View style={styles.datePicker}>
                <DateTimePicker
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  is24Hour={true}
                  mode={"date"}
                  onChange={(e, value) => {
                    onChange(value);
                    if (Platform.OS === "android") {
                      setIsPickerShow1(false);
                    }
                  }}
                  value={value ? new Date(value) : new Date()}
                />
                {Platform.OS === "ios" ? (
                  <View style={styles.datePickerRow}>
                    <MyButton
                      onPress={() => setIsPickerShow1(!isPickerShow1)}
                      styleButton={styles.dangerDatePickerButton}
                      title="Цуцлах"
                      type="danger"
                    />
                    <MyButton
                      onPress={() => {
                        setIsPickerShow1(!isPickerShow1);
                        clearErrors("date2");
                      }}
                      styleButton={styles.datePickerButton}
                      title="Болсон"
                    />
                  </View>
                ) : null}
              </View>
            )}
          </>
        )}
        rules={{
          required: { value: true, message: "Дуусах хугацааг заавал сонгоно" },
        }}
      />
    </>
  );
});

ReportDateForm.displayName = "ReportDateForm";

export { ReportDateForm };

const styles = StyleSheet.create({
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
  mv: {
    marginVertical: 10
  }
});
