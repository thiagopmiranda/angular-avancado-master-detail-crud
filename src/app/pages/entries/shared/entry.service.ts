import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { BaseResourceService } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends BaseResourceService<Entry> {
  constructor(
    protected override injector: Injector,
    private categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson);
  }

  override create(entry: Entry): Observable<Entry> {
    // entry.categoryId // 1 => moradia
    // entry.category = category // null

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;
        return super.create(entry);
      })
    );
  }

  override update(entry: Entry): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap((category) => {
        entry.category = category;
        return super.update(entry);
      })
    );
  }
}

/*
Relacionamento API externa - ruby on rails

class Entry
  belongs_to:category

  category_id

class Category
  has_many: entries

  entryService.getById(2)

  {
    id: 2,
    name: "Aluguel",
    date: '08/11/2018',
    paid: false,

    categoryId: 1 => Moradia,
    category: {
      id: 1,
      name: "Moradia",
      description: "qualquer descricao da categoria"
    }
  }

  Object.assign(new Entry(), jsonData);
*/
