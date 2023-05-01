import { ITransactions } from "../interface/ITransactions";
import { BaseModel } from "./BaseModel";

export class Transactions extends BaseModel implements ITransactions {
  _id: string;
  type: string;
  createdAt: string;
  incomeType: string;
  quantity: string;
  balanceGoodNumber: string;
 

  constructor ({ _id, type, createdAt, incomeType,quantity,balanceGoodNumber }: ITransactions) {
    super();
    this._id = _id;
    this.type = type;
    this.createdAt = createdAt;
    this.incomeType= incomeType;
    this.quantity= quantity;
    this.balanceGoodNumber= balanceGoodNumber;
  }

  static fromJson (json: ITransactions) {
    return new Transactions(json);    
  }
}

