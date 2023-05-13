import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const postInvoince = async (id:  string, amount: number) => {
  const res = await httpRequest.post(`/users/invoice/${id}`,{ amount: amount });
  return res;
};

export const getWallet = async (id:  string) => {
  const res = await httpRequest.get(`/wallets/${id}`);
  return res.data;
};


