import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getCategory = async () => {
  const res = await httpRequest.get("/categories");
  return res.data;
};



