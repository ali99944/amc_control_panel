import axios from "axios";
import { api_url } from "../constants/app_constants";

export const useAxios = (
  contentType?: "aplication/json" | "multipart/form-data"
) => {

  return axios.create({
    baseURL: api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      authorization: localStorage.getItem("token"),
      "Access-Control-Allow-Origin": "*",
    },
  });
};
