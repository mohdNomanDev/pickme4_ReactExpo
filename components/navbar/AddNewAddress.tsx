import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import React from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addUserAddress, UserAddress } from "../../store/userSlice";
import { addressSchema } from "../../utils/validations";
import AppMap from "../common/app-map";
import FormField from "../common/FormField";

interface AddNewAddressProps {
  onCancel?: () => void;
  onSaveSuccess?: () => void;
}

const AddNewAddress = ({ onCancel, onSaveSuccess }: AddNewAddressProps) => {
  const dispatch = useDispatch();
  const defaultCoordinates = {
    lat: 24.7136,
    lng: 46.6753,
  };

  const initialValues = {
    city: "",
    district: "",
    street: "",
    buildingNumber: "",
    floorApt: "",
    additionalDirections: "",
    label: "Home",
    latitude: defaultCoordinates.lat,
    longitude: defaultCoordinates.lng,
  };

  const handleSave = (values: typeof initialValues) => {
    // Note: In a real app, you would make an API call to a backend here.
    // We cannot reliably write back to a local JSON file directly from an Expo device bundle.
    // Instead, we dispatch the new address to the Redux state so the UI updates immediately!

    const newAddress: UserAddress = {
      id: `addr_${Date.now()}`, // Temporary unique ID
      type: values.label.toLowerCase(),
      title: values.label,
      city: values.city,
      district: values.district,
      street: values.street,
      buildingNumber: values.buildingNumber,
      floor: values.floorApt,
      apartment: "",
      postalCode: "", // Would normally be collected or mapped
      coordinates: {
        lat: values.latitude,
        lng: values.longitude,
      },
      notes: values.additionalDirections,
      isDefault: false,
    };

    dispatch(addUserAddress(newAddress));
    console.log("Address saved to Redux State:", newAddress);

    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <View className="flex-1 bg-white dark:bg-card-dark w-full md:rounded-3xl md:my-8 md:border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm dark:shadow-none">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-card-dark z-10">
        <View className="flex-row items-center gap-3">
          {Platform.OS !== "web" && onCancel && (
            <TouchableOpacity onPress={onCancel} className="mr-2">
              <Ionicons name="arrow-back" size={24} color="#f97316" />
            </TouchableOpacity>
          )}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Add New Address
          </Text>
        </View>
        {Platform.OS === "web" && onCancel && (
          <TouchableOpacity
            onPress={onCancel}
            className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Ionicons name="close" size={24} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={addressSchema}
          onSubmit={handleSave}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <View className="gap-8 max-w-3xl mx-auto w-full">
              <View className="gap-3">
                <View className="flex-row items-center justify-between gap-4">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">
                      Pin Location
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {Platform.OS === "web"
                        ? "Tap the map to adjust delivery location"
                        : "Tap the map or drag the pin to adjust delivery location"}
                    </Text>
                  </View>
                  <View className="h-11 w-11 rounded-full bg-orange-50 dark:bg-orange-900/20 items-center justify-center">
                    <Ionicons name="location" size={22} color="#f97316" />
                  </View>
                </View>

                <View className="h-72 md:h-96 rounded-2xl overflow-hidden border border-orange-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <AppMap
                    latitude={values.latitude}
                    longitude={values.longitude}
                    latitudeDelta={0.018}
                    longitudeDelta={0.018}
                    draggableMarker
                    selectedMarkerTitle="Delivery location"
                    onLocationChange={(coordinate) => {
                      setFieldValue("latitude", coordinate.latitude);
                      setFieldValue("longitude", coordinate.longitude);
                    }}
                  />
                </View>

                <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {`Lat ${values.latitude.toFixed(5)} / Lng ${values.longitude.toFixed(5)}`}
                </Text>
              </View>

              {/* Location Details Form */}
              <View>
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-5">
                  Location Details
                </Text>

                <View className="flex-col md:flex-row gap-0 md:gap-4">
                  <View className="flex-1">
                    <FormField
                      name="city"
                      label="City"
                      placeholder="Enter City"
                    />
                  </View>
                  <View className="flex-1">
                    <FormField
                      name="district"
                      label="District (Hayy)"
                      placeholder="Enter District"
                    />
                  </View>
                </View>

                <FormField
                  name="street"
                  label="Street Name"
                  placeholder="Enter Street Name"
                />

                <View className="flex-col md:flex-row gap-0 md:gap-4">
                  <View className="flex-1">
                    <FormField
                      name="buildingNumber"
                      label="Building No."
                      placeholder="e.g. 12"
                    />
                  </View>
                  <View className="flex-1">
                    <FormField
                      name="floorApt"
                      label="Floor / Apt"
                      placeholder="Optional"
                    />
                  </View>
                </View>

                <FormField
                  name="additionalDirections"
                  label="Additional Directions"
                  placeholder="Landmarks or extra directions"
                  multiline
                />
              </View>

              {/* Address Label Selection */}
              <View>
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Save As
                </Text>
                <View className="flex-row gap-3">
                  {["Home", "Work", "Other"].map((lbl) => {
                    const isSelected = values.label === lbl;
                    let iconName: keyof typeof Ionicons.glyphMap =
                      "location-outline";
                    if (lbl === "Home") iconName = "home";
                    else if (lbl === "Work") iconName = "briefcase";
                    else if (lbl === "Other") iconName = "location";

                    return (
                      <TouchableOpacity
                        key={lbl}
                        onPress={() => setFieldValue("label", lbl)}
                        className={`flex-1 py-4 px-2 rounded-2xl flex-row items-center justify-center gap-2 border-2 transition-all ${
                          isSelected
                            ? "bg-orange-50 border-orange-500 dark:bg-orange-900/20 dark:border-orange-500"
                            : "bg-white border-gray-100 dark:bg-card-dark dark:border-gray-800"
                        }`}
                      >
                        <Ionicons
                          name={iconName}
                          size={20}
                          color={isSelected ? "#f97316" : "#9ca3af"}
                        />
                        <Text
                          className={`font-bold text-base ${isSelected ? "text-orange-600 dark:text-orange-500" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {lbl}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-orange-500 rounded-2xl py-4 mt-4 items-center shadow-lg shadow-orange-500/30 dark:shadow-none"
              >
                <Text className="text-white font-bold text-lg">
                  Save Address
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AddNewAddress;
