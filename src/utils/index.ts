import { store } from "../store";
import { HttpRequest as BaseHttpRequest,HttpHandler } from "../helper";
import { authLogout } from "../store/authSlice";

export class HttpRequest extends BaseHttpRequest {
  uri = "http://206.189.46.13/api/v1";
  store = store;
  errorHandler = (statusCode: number, error: HttpHandler): void => {
    if(statusCode === 401){
      store.dispatch(authLogout());
    }
    throw error;
  };
}

export const delay = async (ms=400): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve,ms));
};