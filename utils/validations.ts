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
  contactName: Yup.string().required('Contact name is required'),
  contactPhone: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid (e.g., 05X XXX XXXX)')
    .required('Phone number is required'),
});
