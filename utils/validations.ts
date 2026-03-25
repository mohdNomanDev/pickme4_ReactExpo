import * as Yup from 'yup';

const phoneRegExp = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

export const addressSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  district: Yup.string().required('District is required'),
  street: Yup.string().required('Street name is required'),
  buildingNumber: Yup.string().required('Building number is required'),
  floorApt: Yup.string(),
  additionalDirections: Yup.string(),
  label: Yup.string().oneOf(['Home', 'Work', 'Other']).required('Label is required'),
});

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Phone number must start with 05 or 5 and have 9 digits').required('Phone number is required'),
});
