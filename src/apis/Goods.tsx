import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getGoods = async () => {
  const res = await httpRequest.get("/goods/user", { limit: 100 });
  return res.data;
};



