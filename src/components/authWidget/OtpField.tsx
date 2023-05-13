import React, { memo, useState } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TextInputKeyPressEventData, View } from "react-native";
import { Colors } from "../../constants/Colors";
type OtpFieldProps = {
  onComplete: (e: string[]) => void;
};

const OtpField = memo(({ onComplete }: OtpFieldProps) => {
  const INIT_PIN = [
    {
      value: "",
      ref  : React.useRef<TextInput>(null),
    },
    {
      value: "",
      ref  : React.useRef<TextInput>(null),
    },
    {
      value: "",
      ref  : React.useRef<TextInput>(null),
    },
    {
      value: "",
      ref  : React.useRef<TextInput>(null),
    },
  ];
  const [focused, setFocused] = useState([0]);
  const [otp, setOtp] = React.useState(INIT_PIN);

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.preventDefault();

    if (isNumeric(e.nativeEvent.text) && e.nativeEvent.text.length === 4) {
      otp.map((item: any, index: any) => {
        onChangeText(e.nativeEvent.text.split("")[index], index);
      });
    }
  };

  const onChangeText = async (text: any, index: number) => {
    if (text === "Backspace") {
      const pins = [...otp];
      pins[index].value = "";
      setOtp([...pins]);
      if (index >= 0) {
        otp[index - 1]?.ref?.current?.focus();
      }
    } else {
      const pins = [...otp];
      pins[index].value = text;
      setOtp([...pins]);
      otp[index + 1]?.ref?.current?.focus();

      const codes = [];
      for (let i = 0; i < otp.length; i++) {
        if (otp[i].value) {
          codes.push(otp[i].value);
          setFocused(focusing => {
            return [...focusing, i + 1];
          });
        }
      }
      if (codes.length === 4) {
        await onComplete(codes);
        setOtp(INIT_PIN);
      }
    }
  };

  return (
    <View style={otpStyles.container}>
      <View style={otpStyles.otpContainer}>
        {otp.map((item: any, index: number) => {
          return (
            <View key={index} style={focused.includes(index) ? otpStyles.otpBox1 : otpStyles.otpBox}>
              <TextInput
                autoFocus={index === 0 ? true : false}
                enablesReturnKeyAutomatically
                keyboardType="numeric"
                onChange={onChange}
                onKeyPress={(e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
                  onChangeText(e.nativeEvent.key, index);
                }}
                ref={item.ref}
                style={otpStyles.otpText1}
                value={item.value}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
});

const isNumeric = (str: string) => {
  if (typeof str !== "string") return false;
  return !isNaN(parseInt(str, 10)) && !isNaN(parseFloat(str));
};

const otpStyles = StyleSheet.create({
  container: {
    display       : "flex",
    flexDirection : "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  otpContainer: {
    marginBottom  : 5,
    justifyContent: "space-around",
    flexDirection : "row",
    alignItems    : "flex-start",
  },
  otpBox: {
    borderRadius: 5,
    borderWidth : 1,
    borderColor : Colors.smokeWhite,
    marginRight : 10,
  },
  otpBox1: {
    borderRadius: 5,
    borderWidth : 2,
    borderColor : Colors.primary,
    marginRight : 10,
  },
  otpText1: {
    width            : 56,
    height           : 56,
    color            : Colors.primary,
    textAlign        : "center",
    padding          : 10,
    paddingHorizontal: 20,
    justifyContent   : "center",
    alignItems       : "center",
    fontSize         : 16,
    fontFamily       : "Mon700",
  },
});

OtpField.displayName = "OtpField";

export default OtpField;
