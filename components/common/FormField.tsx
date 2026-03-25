import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { useField } from 'formik';

interface FormFieldProps extends TextInputProps {
  label: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        value={field.value}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error && (
        <Text>{meta.error}</Text>
      )}
    </View>
  );
};

export default FormField;
