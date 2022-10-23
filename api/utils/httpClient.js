import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const httpClientPrediction = axios.create({
  baseURL: `${process.env.PREDICTION_MODEL_URL}`,
});

export const httpClientCompare = axios.create({
  baseURL: `${process.env.COMPARE_MODEL_URL}`,
});
