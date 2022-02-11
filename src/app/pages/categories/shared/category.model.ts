import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Category extends BaseResourceModel {
  constructor(
    public override id?: number,
    public name?: string,
    public description?: string
  ) {
    super(); // sempre chamar super quando está extends uma class
  }

  static fromJson(jsonData: any): Category {
    return Object.assign(new Category(), jsonData);
  }
}
