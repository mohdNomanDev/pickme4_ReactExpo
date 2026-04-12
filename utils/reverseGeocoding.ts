export type ReverseGeocodingCoordinate = {
  latitude: number;
  longitude: number;
};

export type ReverseGeocodedAddress = {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  countryCode: string;
  street: string;
  buildingNumber: string;
};

type NominatimAddress = {
  house_number?: string;
  road?: string;
  pedestrian?: string;
  footway?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  district?: string;
  county?: string;
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
};

type NominatimReverseResponse = {
  lat?: string;
  lon?: string;
  display_name?: string;
  address?: NominatimAddress;
  error?: string;
};

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

function firstAvailable(...values: (string | undefined)[]) {
  return values.find((value) => value && value.trim().length > 0)?.trim() ?? "";
}

export async function reverseGeocodeCoordinate(
  coordinate: ReverseGeocodingCoordinate,
  signal?: AbortSignal,
): Promise<ReverseGeocodedAddress> {
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    zoom: "18",
    lat: coordinate.latitude.toString(),
    lon: coordinate.longitude.toString(),
    "accept-language": "en",
  });

  const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error("Unable to fetch address details for this location.");
  }

  const result = (await response.json()) as NominatimReverseResponse;

  if (result.error) {
    throw new Error(result.error);
  }

  const address = result.address ?? {};

  return {
    latitude: Number(result.lat ?? coordinate.latitude),
    longitude: Number(result.lon ?? coordinate.longitude),
    formattedAddress: result.display_name ?? "",
    city: firstAvailable(address.city, address.town, address.village, address.municipality),
    district: firstAvailable(
      address.neighbourhood,
      address.suburb,
      address.city_district,
      address.district,
      address.county,
    ),
    state: firstAvailable(address.state),
    postalCode: firstAvailable(address.postcode),
    country: firstAvailable(address.country),
    countryCode: firstAvailable(address.country_code).toUpperCase(),
    street: firstAvailable(address.road, address.pedestrian, address.footway),
    buildingNumber: firstAvailable(address.house_number),
  };
}
