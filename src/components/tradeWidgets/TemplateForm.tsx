import {  StyleSheet, View } from "react-native";
import React, { memo,  } from "react";
import { Control, Controller, FieldErrors, UseFormClearErrors } from "react-hook-form";
import { ErrorText } from "../ErrorText";
import { MyTextInput } from "../../widgets/MyTextInput";
import { ILoanProps } from "./LoanForm";

type Props = {
  control: Control<ILoanProps>;
  errors: FieldErrors<ILoanProps>;
  clearErrors: UseFormClearErrors<ILoanProps>;
};


const TemplateForm = memo(({ control, errors,clearErrors }: Props) => {


  return (
    <View>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <MyTextInput
            clearErrors={clearErrors}
            error={errors.name?.message}
            name="name"
            onBlur={onBlur}
            onChange={onChange}
            placeholder="Загварын нэр"
            title="Загварын нэр"
            value={value}
          />
        )}
        rules={{
          required: { value: true, message: "Загварын нэр заавал оруулна" },
        }}
      />
      {errors.name && <ErrorText title={errors.name.message} />}
      <View style={styles.mv4} />
   

    </View>
  );
});

TemplateForm.displayName = "TemplateForm";

export { TemplateForm };

const styles = StyleSheet.create({
  mv4: {
    marginVertical: 4,
  },
 
});
