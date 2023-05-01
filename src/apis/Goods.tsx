import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getGoods = async ({ barcode,category }: {barcode?: string,category?: string}) => {
  if(category){
    const res = await httpRequest.get("/goods/user", { limit: 100, category: category });
    return res.data;
  }
  if(barcode){
    const res = await httpRequest.get("/goods/user", { limit: 100, barCode: barcode });
    return res.data;
  }
  const res = await httpRequest.get("/goods/user", { limit: 100 });
  return res.data;
};
export const createGood = async (data: {
  name       : string,
  category   : string,
  price      : number,
  barCode?    : string,
  unit       : string,
}) => {
  const res = await httpRequest.post("/goods", data);
  return res.data;
};

export const goodImage = async (data: FormData, id: string) => {
  const res = await httpRequest.uploadImage(`/goods/${id}/upload-photo`, data as unknown as { file: Blob });
  return res;
};

export const goodDetail = async ({ id } : {id: string}) => {
  const res = await httpRequest.get(`/goods/${id}`);
  return res.data;
};

