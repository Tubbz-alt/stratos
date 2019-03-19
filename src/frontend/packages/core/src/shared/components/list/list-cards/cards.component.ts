import { Component, Input } from '@angular/core';

import { MultiActionListEntity } from '../../../monitors/pagination-monitor';
import { IListDataSource } from '../data-sources-controllers/list-data-source-types';
import { CardCell } from '../list.types';
import { CardMultiActionComponents } from './card.component.types';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent<T> {
  public columns = CardCell.columns;
  @Input() dataSource: IListDataSource<T>;
  private pComponent: CardCell<T> | CardMultiActionComponents;
  @Input()
  get component() { return this.pComponent; }
  set component(cardCell: CardCell<T> | CardMultiActionComponents) {
    this.pComponent = cardCell;
  }

  public multiActionTrackBy(index: number, item: any | MultiActionListEntity) {
    if (!this.dataSource) {
      return null;
    }
    if (this.isMultiActionItem(item)) {
      return this.dataSource.trackBy(index, item.entity);
    }
    return this.dataSource.trackBy(index, item);
  }

  public isMultiActionItem(component: any | MultiActionListEntity) {
    return component instanceof MultiActionListEntity;
  }
}