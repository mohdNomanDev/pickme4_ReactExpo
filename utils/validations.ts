import * as Yup from "yup";

const phoneRegExp = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
const authPhoneRegExp = /^\+?[0-9][0-9\s-]{7,18}$/;

export const addressSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  street: Yup.string().required("Street name is required"),
  buildingNumber: Yup.string().required("Building number is required"),
  postalCode: Yup.string(),
  country: Yup.string(),
  floorApt: Yup.string(),
  additionalDirections: Yup.string(),
  label: Yup.string()
    .oneOf(["Home", "Work", "Other"])
    .required("Label is required"),
});

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      phoneRegExp,
      "Phone number must start with 05 or 5 and have 9 digits",
    )
    .required("Phone number is required"),
});

export const authIdentitySchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  phone: Yup.string()
    .trim()
    .matches(authPhoneRegExp, "Enter a valid phone number")
    .required("Phone number is required"),
});

export const otpVerificationSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{4}$/, "Enter the 4 digit OTP"),
});
