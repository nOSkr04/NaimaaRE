import { ITemplate } from "../interface/ITemplate";
import { BaseModel } from "./BaseModel";

export class Template extends BaseModel implements ITemplate {
  _id: string;
  createdAt: string;
  name: string;
  constructor ({ _id, createdAt, name,  }: ITemplate) {
    super();
    this._id = _id;
    this.createdAt = createdAt;
    this.name = name;
  }

  static fromJson (json: ITemplate) {
    return new Template(json);    
  }
}

