import { ICategory } from "../interface/ICategory";
import { IGoods } from "../interface/IGoods";
import { BaseModel } from "./BaseModel";

export class Goods extends BaseModel implements IGoods {
  _id: string;
  barcode: string;
  bestSeller: boolean;
  category: ICategory
  createUser: string
  drain: number
  name: string;
  photo: string;
  price: number;
  quantity: number;
  receipt: number;
  unit: string;
  createdAt: string;
 
 

  constructor ({ _id,barcode,bestSeller,category,createUser,drain,name,photo,price ,quantity,receipt,unit,createdAt  }: IGoods) {
    super();
    this._id = _id;
    this.barcode= barcode;
    this.bestSeller= bestSeller;
    this.category= category;
    this.createUser= createUser;
    this.createdAt= createdAt;
    this.drain= drain;
    this.name= name;
    this.photo= photo;
    this.price= price;
    this.quantity= quantity;
    this.receipt= receipt;
    this.unit= unit;

  
  }

  static fromJson (json: IGoods) {
    return new Goods(json);    
  }
}

