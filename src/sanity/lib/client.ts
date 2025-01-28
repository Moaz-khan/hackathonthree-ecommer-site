import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token:
    "skMXoUDEmWlfj9D305TAccTw3JutGljXE8E4B8pLQLiS5ypMGYjhTeYBVVW0eNlpaBt65hLnZFlRtEcBvJJe1SQ6S6YbKTB63nQXCrIwatftxHfW1T2evswDs3DCB8buHeNPZRpPFW1726ceEGDEAY77xzOCp9XpnmkzAEapmo9xoP27yoWq",
});
