import { Formik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

import AuthScreen from "@/components/auth/AuthScreen";
import Button from "@/components/auth/Button";
import InputField from "@/components/auth/InputField";
import { AppDispatch } from "@/store/store";
import { showMessage } from "@/store/messageSlice";
import { setUser } from "@/store/userSlice";
import {
  AuthFlow,
  createMockUser,
  DEFAULT_OTP,
  getBooleanParam,
  getStringParam,
} from "@/utils/mockAuth";
import { otpVerificationSchema } from "@/utils/validations";

interface OtpForm {
  otp: string;
}

const initialValues: OtpForm = {
  otp: "",
};

const wait = (duration = 450) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export default function OtpScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useLocalSearchParams();
  const otpRef = useRef<TextInput>(null);

  const flow: AuthFlow =
    getStringParam(params.flow) === "signup" ? "signup" : "login";
  const name = getStringParam(params.name);
  const phone = getStringParam(params.phone);
  const hasAddress = flow === "login" && getBooleanParam(params.hasAddress);

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      otpRef.current?.focus();
    }, 200);

    return () => clearTimeout(focusTimer);
  }, []);

  const handleSubmit = async (
    values: OtpForm,
    setFieldError: (field: string, message: string) => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    if (values.otp !== DEFAULT_OTP) {
      setFieldError("otp", "Incorrect OTP. Use 1234 for this mock flow.");
      dispatch(
        showMessage({
          message: "Incorrect OTP. Use 1234.",
          type: "error",
        }),
      );
      setSubmitting(false);
      return;
    }

    await wait();

    dispatch(
      setUser(
        createMockUser({
          hasAddress,
          name,
          phone,
        }),
      ),
    );
    dispatch(
      showMessage({
        message: "OTP verified successfully.",
        type: "success",
      }),
    );

    if (hasAddress) {
      router.replace("/(tabs)/home");
      return;
    }

    router.replace({
      pathname: "/Food/addnewaddresspage",
      params: {
        fromAuth: "true",
      },
    });
  };

  return (
    <AuthScreen
      title="Verify OTP"
      subtitle={`Enter the 4 digit OTP sent to ${phone || "your phone"}. This mock flow always uses 1234.`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={otpVerificationSchema}
        onSubmit={(values, { setFieldError, setSubmitting }) =>
          void handleSubmit(values, setFieldError, setSubmitting)
        }
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit: submitForm,
          isSubmitting,
          touched,
          values,
        }) => (
          <View className="gap-5">
            <View className="gap-2 rounded-2xl border border-orange-100 bg-orange-50/80 p-4 dark:border-orange-900/40 dark:bg-orange-950/30">
              <Text className="text-sm font-bold text-gray-950 dark:text-white">
                {flow === "signup" ? "Signup verification" : "Login verification"}
              </Text>
              <Text className="text-sm font-medium leading-5 text-gray-600 dark:text-gray-300">
                {hasAddress
                  ? "This login will redirect directly to home after OTP."
                  : "This flow will ask for an address after OTP."}
              </Text>
            </View>

            <InputField
              ref={otpRef}
              autoFocus
              error={touched.otp ? errors.otp : undefined}
              icon="keypad-outline"
              keyboardType="number-pad"
              label="OTP"
              maxLength={4}
              onBlur={handleBlur("otp")}
              onChangeText={(value) =>
                handleChange("otp")(value.replace(/\D/g, ""))
              }
              onSubmitEditing={() => submitForm()}
              placeholder="1234"
              returnKeyType="done"
              textContentType="oneTimeCode"
              value={values.otp}
            />

            <Button
              loading={isSubmitting}
              onPress={() => submitForm()}
              title="Verify and continue"
            />
          </View>
        )}
      </Formik>
    </AuthScreen>
  );
}
