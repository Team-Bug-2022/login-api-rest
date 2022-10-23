//import { writeFile } from "fs";
import fetch from "node-fetch";

export const downloadCloud = async (url) => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  //writeFile(`./image-cloud.jpg`, buffer, () => console.log("finished downloading!"));
  return buffer;
};

export const downloadNew = async (file) => {
  const buffer = file.buffer;
  //writeFile(`./image-local.jpg`, buffer, () =>
  return buffer;
};
