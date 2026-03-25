import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useField } from 'formik';

interface FormFieldProps extends TextInputProps {
  label: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;

  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </Text>
      <TextInput
        className={`px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
          hasError
            ? 'border-red-500'
            : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900'
        } ${props.multiline ? 'min-h-[100px] text-top' : ''}`}
        value={field.value}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        placeholderTextColor="#9ca3af"
        textAlignVertical={props.multiline ? 'top' : 'center'}
        {...props}
      />
      {hasError && (
        <Text className="text-red-500 text-xs mt-1">{meta.error}</Text>
      )}
    </View>
  );
};

export default FormField;
