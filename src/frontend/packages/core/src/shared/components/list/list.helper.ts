import { Subscription } from 'rxjs';

import { EntityMonitorFactory } from '../../../../../store/src/monitors/entity-monitor.factory.service';
import { PaginationMonitor } from '../../../../../store/src/monitors/pagination-monitor';
import { PaginationMonitorFactory } from '../../../../../store/src/monitors/pagination-monitor.factory';
import { TableRowStateManager } from './list-table/table-row/table-row-state-manager';
import { EntityCatalogEntityConfig } from '../../../../../store/src/entity-catalog/entity-catalog.types';

export type ListRowStateSetUpManager = (
  paginationMonitor: PaginationMonitor<any>,
  entityMonitorFactory: EntityMonitorFactory,
  rowStateManager: TableRowStateManager
) => Subscription;

export class ListRowSateHelper<T extends { guid: string }> {
  public getRowStateManager(
    paginationMonitorFactory: PaginationMonitorFactory,
    entityMonitorFactory: EntityMonitorFactory,
    paginationKey: string,
    entityConfig: EntityCatalogEntityConfig,
    setup: ListRowStateSetUpManager
  ) {
    const rowStateManager = new TableRowStateManager();
    const paginationMonitor = paginationMonitorFactory.create<T>(
      paginationKey,
      entityConfig
    );

    const sub = setup(
      paginationMonitor,
      entityMonitorFactory,
      rowStateManager
    );
    return {
      rowStateManager,
      sub
    };
  }

}
