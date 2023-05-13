import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getTemplates = async (userId: string) => {
  const res = await httpRequest.get("/templates", { createUser: userId });
  return res.data;
};

export const getTemplateDetail = async (id: string) => {
  const res = await httpRequest.get("/transactions/user", { template: id });
  return res.data;
};
export const templatePostIncome = async ({
  template,
  incomeType,
  loan,
}: {
  template: string;
  incomeType: string;
  loan?: { template: string; incomeType: string; loanName: string; loanPhone: string; loanSize: string; loanDate: string };
}) => {
  if (loan) {
    const res = await httpRequest.post("/bills/receipt", loan);
    return res.data;
  }
  const res = await httpRequest.post("/bills/receipt", { template: template, incomeType: incomeType });
  return res.data;
};
export const templatePostExpense = async ({
  template,
  incomeType,
  loan,
}: {
  template: string;
  incomeType: string;
  loan?: { template: string; incomeType: string; loanName: string; loanPhone: string; loanSize: string; loanDate: string };
}) => {
  if (loan) {
    const res = await httpRequest.post("/bills/drain", loan);
    return res.data;
  }
  const res = await httpRequest.post("/bills/drain", { template: template, incomeType: incomeType });
  return res.data;
};
