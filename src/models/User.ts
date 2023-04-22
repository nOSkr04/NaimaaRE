import { IUser } from "./../interface/IUser";

export class User implements IUser {
  _id: string;
  auth: string;
  name: string;
  deadline: string;
  constructor({
    _id,
    auth,
    name,
    deadline
  }: IUser) {
    this._id = _id;
    this.auth = auth;
    this.name = name;
    this.deadline = deadline;
  
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
