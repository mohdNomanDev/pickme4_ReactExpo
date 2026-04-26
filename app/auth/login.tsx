import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { Link, router } from "expo-router";
import React, { useState } from "react";
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

export default function LoginScreen() {
  const [hasAddress, setHasAddress] = useState(true);

  const handleSubmit = async (
    values: AuthIdentityForm,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    await wait();
    router.push({
      pathname: "/auth/otp",
      params: {
        flow: "login",
        hasAddress: hasAddress ? "true" : "false",
        name: values.name.trim(),
        phone: values.phone.trim(),
      },
    });
    setSubmitting(false);
  };

  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Login locally with your name and phone number. No backend, Firebase, or external service is used."
      footer={
        <View className="flex-row items-center gap-2">
          <Text className="font-semibold text-gray-600 dark:text-gray-300">
            New to Pickme4?
          </Text>
          <Link href="/auth/signup" asChild>
            <Pressable>
              <Text className="font-extrabold text-orange-600">
                Create account
              </Text>
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

            <Pressable
              onPress={() => setHasAddress((current) => !current)}
              className="flex-row items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-orange-50/80 p-4 dark:border-orange-900/40 dark:bg-orange-950/30"
            >
              <View className="flex-1 gap-1">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="location-outline" size={18} color="#f97316" />
                  <Text className="font-extrabold text-gray-950 dark:text-white">
                    Mock saved address
                  </Text>
                </View>
                <Text className="text-sm font-medium leading-5 text-gray-600 dark:text-gray-300">
                  Toggle this to test login users with or without an address.
                </Text>
              </View>
              <View
                className={`h-8 w-14 rounded-full p-1 ${
                  hasAddress ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <View
                  className={`h-6 w-6 rounded-full bg-white ${
                    hasAddress ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </View>
            </Pressable>

            <Button
              loading={isSubmitting}
              onPress={() => submitForm()}
              title="Send OTP"
            />
          </View>
        )}
      </Formik>
    </AuthScreen>
  );
}
