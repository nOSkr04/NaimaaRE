import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getBasket = async () => {
  const res = await httpRequest.get("/transactions/basket", { limit: 100, sort: "-createdAt" });
  return res.data;
};
export const postBasket = async ({ id, price, quantity }: { id: string; price: number; quantity: number }) => {
  const res = await httpRequest.post("/transactions", { good: id, price: price, quantity: quantity });
  return res.data;
};

export const deleteBasket = async (id: string) => {
  const res = await httpRequest.del(`/transactions/${id}`);
  return res;
};
export const editBasket = async ({ id, price, quantity }: { id: string; price: number; quantity: number }) => {
  const res = await httpRequest.put(`/transactions/${id}`, {
    price   : price,
    quantity: quantity,
  });
  return res;
};

export const getUserTransactions = async ({ id } : {id: string}) => {
  const res = await httpRequest.get(`/transactions/user?good=${id}&sort=-createdAt`);
  return res.data;
};

