import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getTemplates = async (userId: string) => {
  const res = await httpRequest.get("/templates", { createUser: userId });
  return res.data;
};




