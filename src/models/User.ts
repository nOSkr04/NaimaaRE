import { IUser } from "./../interface/IUser";

export class User implements IUser {
  _id: string;
  auth: string;
  phone: string;
  billNumber: number;
  deadline:  string
  role: string
  constructor({
    _id,
    auth,
    phone,
    deadline,
    billNumber,
    role
  }: IUser) {
    this._id = _id;
    this.auth = auth;
    this.phone = phone;
    this.deadline = deadline;
    this.billNumber = billNumber;
    this.role = role;
  
  }

  static fromJson(json: IUser) {
    return new User(json);
  }
}
