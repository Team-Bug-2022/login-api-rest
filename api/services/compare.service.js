import { httpClientCompare } from "../utils/httpClient.js";

export const comparePalmarPrint = async (urlImageDto) => {
  const data = await httpClientCompare
    .post(`/checkImgages`, urlImageDto)
    .then((v) => v.data);
  return data;
};
