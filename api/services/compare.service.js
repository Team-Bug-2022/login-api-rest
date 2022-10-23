import { httpClientCompare } from "../utils/httpClient.js";

export const httpClientCompare = async (urlImageDto) => {
  const data = await httpClientPrediction
    .post(`/compare`, urlImageDto)
    .then((v) => v.data);
  return data;
};
