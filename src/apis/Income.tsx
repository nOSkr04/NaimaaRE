import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const postTemplates = async (name: string) => {
  const res = await httpRequest.post("/users/login", { name: name });
  return res;
};

export const postIncome = async () => {
  const res = await httpRequest.post("/bills/receipt", { incomeType: "Бэлэн" });
  return res;
};
export const postDrain = async () => {
  const res = await httpRequest.post("/bills/drain", { incomeType: "Бэлэн" });
  return res;
};

export const postIncomeOnLine = async () => {
  const res = await httpRequest.post("/bills/receipt", { incomeType: "Бэлэн бус" });
  return res;
};

export const postDrainOnLine = async () => {
  const res = await httpRequest.post("/bills/drain", { incomeType: "Бэлэн бус" });
  return res;
};

export const postLoan = async (data: { incomeType: string; loanName: string; loanPhone: string; loanSize: string; loanDate: string }) => {
  const res = await httpRequest.post("/bills/receipt", data);
  return res;
};
export const postDrainLoan = async (data: { incomeType: string; loanName: string; loanPhone: string; loanSize: string; loanDate: string }) => {
  const res = await httpRequest.post("/bills/drain", data);
  return res;
};
export const saveTemplate = async (data: { name: string }) => {
  const res = await httpRequest.post("/templates", data);
  return res;
};
