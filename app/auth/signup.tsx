import { Formik } from "formik";
import { Link, router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

import AuthScreen from "@/components/auth/AuthScreen";
import Button from "@/components/auth/Button";
import InputField from "@/components/auth/InputField";
import { authIdentitySchema } from "@/utils/validations";

interface AuthIdentityForm {
  name: string;
  phone: string;
}

const initialValues: AuthIdentityForm = {
  name: "",
  phone: "",
};

const wait = (duration = 500) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export default function SignupScreen() {
  const handleSubmit = async (
    values: AuthIdentityForm,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    await wait();
    router.push({
      pathname: "/auth/otp",
      params: {
        flow: "signup",
        hasAddress: "false",
        name: values.name.trim(),
        phone: values.phone.trim(),
      },
    });
    setSubmitting(false);
  };

  return (
    <AuthScreen
      title="Create account"
      subtitle="Start with a local mock signup. After OTP verification you will add your delivery address."
      footer={
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-gray-600 dark:text-gray-300">
            Already have an account?
          </Text>
          <Link href="/auth/login" asChild>
            <Pressable>
              <Text className="font-extrabold text-orange-600">Login</Text>
            </Pressable>
          </Link>
        </View>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={authIdentitySchema}
        onSubmit={(values, { setSubmitting }) =>
          void handleSubmit(values, setSubmitting)
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
            <InputField
              autoCapitalize="words"
              error={touched.name ? errors.name : undefined}
              icon="person-outline"
              label="Full name"
              onBlur={handleBlur("name")}
              onChangeText={handleChange("name")}
              placeholder="Enter your name"
              returnKeyType="next"
              value={values.name}
            />

            <InputField
              autoCapitalize="none"
              error={touched.phone ? errors.phone : undefined}
              icon="call-outline"
              keyboardType="phone-pad"
              label="Phone number"
              onBlur={handleBlur("phone")}
              onChangeText={handleChange("phone")}
              placeholder="+966 50 123 4567"
              textContentType="telephoneNumber"
              value={values.phone}
            />

            <View className="rounded-2xl border border-orange-100 bg-orange-50/80 p-4 dark:border-orange-900/40 dark:bg-orange-950/30">
              <Text className="text-sm font-bold leading-5 text-orange-800 dark:text-orange-200">
                Signup users always continue to address setup after entering OTP
                1234.
              </Text>
            </View>

            <Button
              loading={isSubmitting}
              onPress={() => submitForm()}
              title="Create account"
            />
          </View>
        )}
      </Formik>
    </AuthScreen>
  );
}
