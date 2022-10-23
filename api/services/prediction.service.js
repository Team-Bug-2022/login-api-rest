import { httpClientPrediction } from "../utils/httpClient.js";

export const needPalmarPrintLogin = async (code) => {
  const data = await httpClientPrediction
    .post(`/identificador?code=${code}`)
    .then((v) => v.data);
  return data;
};
