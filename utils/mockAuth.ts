import { User, UserAddress } from "@/store/userSlice";

export const DEFAULT_OTP = "1234";

export type AuthFlow = "login" | "signup";

interface CreateMockUserParams {
  hasAddress: boolean;
  name: string;
  phone: string;
}

const mockSavedAddress: UserAddress = {
  id: "mock_saved_home",
  type: "home",
  title: "Home",
  state: "Riyadh",
  city: "Riyadh",
  street: "King Fahd Road",
  buildingNumber: "1234",
  floor: "",
  apartment: "",
  postalCode: "12211",
  address: "Building 1234, King Fahd Road, Riyadh 12211",
  country: "Saudi Arabia",
  countryCode: "SA",
  formattedAddress: "Building 1234, King Fahd Road, Riyadh 12211",
  coordinates: {
    lat: 24.7136,
    lng: 46.6753,
  },
  notes: "Mock saved address for local auth flow.",
  isDefault: true,
};

export function getBooleanParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] === "true" : value === "true";
}

export function getStringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] || "" : value || "";
}

export function createMockUser({
  hasAddress,
  name,
  phone,
}: CreateMockUserParams): User {
  const normalizedName = name.trim() || "Pickme User";
  const [firstName = normalizedName, ...rest] = normalizedName.split(" ");
  const lastName = rest.join(" ");
  const digits = phone.replace(/\D/g, "");

  return {
    id: `mock_user_${digits || "local"}`,
    name: {
      first: firstName,
      last: lastName,
      full: normalizedName,
      ar: normalizedName,
    },
    email: "",
    phone,
    avatar: "",
    gender: "",
    language: "en",
    walletBalance: 0,
    loyaltyPoints: 0,
    addresses: hasAddress ? [mockSavedAddress] : [],
    paymentMethods: [],
    preferences: {
      favoriteCuisines: [],
      allergies: [],
      notifications: {
        push: true,
        sms: true,
        email: false,
        whatsapp: false,
      },
    },
    cart: [],
    orderHistory: [],
    createdAt: new Date().toISOString(),
  };
}
