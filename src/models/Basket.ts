import { IGoods } from "../interface/IGoods";
import { IBasket } from "./../interface/IBasket";
import { BaseModel } from "./BaseModel";

export class Basket extends BaseModel implements IBasket {
  _id: string;
  createUser: string;
  createdAt: string;
  good: IGoods;
  isBasket: boolean;
  price: number;
  quantity: number;
 

  constructor ({ _id,createUser, createdAt, good,isBasket, price, quantity  }: IBasket) {
    super();
    this._id = _id;
    this.createUser= createUser;
    this.createdAt = createdAt;
    this.good = good;
    this.isBasket= isBasket;
    this.price= price;
    this.quantity= quantity;
  }

  static fromJson (json: IBasket) {
    return new Basket(json);    
  }
}

