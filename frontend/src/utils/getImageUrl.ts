import { BASE_URL } from "../const/baseUrl";

export const getImageUrl = (filename: string) =>
  BASE_URL + "/file-upload/" + filename;
