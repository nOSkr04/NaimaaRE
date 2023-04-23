import { useSelector } from "react-redux";
import { IAuth } from "../interface/IAuth";

const useToken = (): string | null => {
  const { token } = useSelector((state: { auth: IAuth }) => state.auth);

  return token;
};

export { useToken };
