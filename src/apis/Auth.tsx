import { ILoginData } from "../components/authWidget/LoginForm";
import { HttpRequest } from "../utils";

const httpRequest = new HttpRequest();

export const me = async () => {
  const res = await httpRequest.get("/users/me");
  return res.data;
};

export const otpVerify = async (phone:  string) => {
  const res = await httpRequest.post("/users/send",{ phone: phone });
  return res;
};
export const login = async (value:  ILoginData) => {
  const res = await httpRequest.post("/users/login",value);
  return res;
};
export const deleteUser = async (id: string) => {
  const res = await httpRequest.del(`/users/${id}`);
  return res;
};
export const signUp = async (data: {
  phone    : string,
  email    : string,
  firstName: string,
  password : string,
}) => {
  const res = await httpRequest.post("/users/register",data);
  return res;
};
 
export const logout = async () => {
  const res = await httpRequest.get("/users/logout");
  return res;
};

