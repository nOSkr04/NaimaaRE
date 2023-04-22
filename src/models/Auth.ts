import { IUser } from "./../interface/IUser";
import { IAuth } from "./../interface/IAuth";
import { BaseModel } from "./BaseModel";

export class Auth extends BaseModel implements IAuth {
  _id?: string;
  name?: string | null;
  password?: string | null;
  token: string | null;
  user: IUser | null;
  deadline:  string | null;

  constructor ({ name, password, token, user,deadline,_id }: IAuth) {
    super();
    this.name = name;
    this.password = password;
    this.token = token;
    this.user = user;
    this.deadline = deadline;
    this._id = _id;
  }

  static fromJson (json: IAuth) {
    return new Auth(json);    
  }
}