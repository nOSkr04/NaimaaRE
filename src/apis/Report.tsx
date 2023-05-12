import { ReportDateFormProps } from "../components/report/ReportDateForm";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const getIncomeStatic = async () => {
  const res = await httpRequest.get("/bills/user", {
    limit: 1000,
    sort : "-createdAt",
    type : "Орлого"
  });
  return res.data;
};
export const getOutcomeStatic = async () => {
  const res = await httpRequest.get("/bills/user", {
    limit: 1000,
    sort : "-createdAt",
    type : "Зарлага"
  });
  return res.data;
};

export const getIncomeStaticDetail = async ({ id }: {id?: string}) => {
  if(id){
    const res = await httpRequest.get("/transactions/user", { bill: id });
    return res.data;
  }
  return null;
};
export const getTimeReport = async (data: ReportDateFormProps) => {
    const res = await httpRequest.get("/transactions/profit", data);
    return res;
};

