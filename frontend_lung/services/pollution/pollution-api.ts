import { PollutionData } from "./pollution-types";

const API_KEY = import.meta.env.VITE_WAQI_API_KEY;
const BASE_URL = "https://api.waqi.info/feed";

export async function getPollutionData(
  lat: number,
  lon: number
): Promise<PollutionData> {
  const response = await fetch(
    `${BASE_URL}/geo:${lat};${lon}/?token=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pollution data");
  }

  return response.json();
}
