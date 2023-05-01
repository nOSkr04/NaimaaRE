import { ICategory } from "../interface/ICategory";
import { BaseModel } from "./BaseModel";

export class Category extends BaseModel implements ICategory {
  _id: string;
  createdAt: string;
  name: string;
 

  constructor ({ _id, createdAt, name,  }: ICategory) {
    super();
    this._id = _id;
    this.createdAt = createdAt;
    this.name = name;
  }

  static fromJson (json: ICategory) {
    return new Category(json);    
  }
}

