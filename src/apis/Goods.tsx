import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getGoods = async ({ category, barcode }: { barcode?: string; category?: string }) => {
  if (category) {
    const res = await httpRequest.get("/goods/user", { limit: 100, page: 1, category: category });
    return res.data;
  }

  if (barcode) {
    const res = await httpRequest.get("/goods/user", { limit: 100, page: 1, barCode: barcode });
    return res.data;
  }
  const res = await httpRequest.get("/goods/user", { limit: 100, page: 1 });
  return res.data;
};

export const createGood = async (data: { name: string; category: string; price: number; barCode?: string; unit: string }) => {
  const res = await httpRequest.post("/goods", data);
  return res.data;
};

export const deleteGood = async (id: string) => {
  const res = await httpRequest.del(`/goods/${id}`);
  return res;
};

export const editGood = async ({
  id,
  data,
}: {
  id: string;
  data: {
    name: string;
    category: string;
    price: number;
    barCode?: string;
    unit: string;
  };
}) => {
  const res = await httpRequest.put(`/goods/${id}`, data);
  return res.data;
};

export const goodImage = async ( id: string,data: FormData,) => {
  const res = await httpRequest.uploadImage(`/goods/${id}/upload-photo`, data as unknown as { file: Blob });
  return res;
};

export const goodDetail = async ({ id }: { id: string }) => {
  const res = await httpRequest.get(`/goods/${id}`);
  return res.data;
};
