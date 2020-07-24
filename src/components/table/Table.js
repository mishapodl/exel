import { ExcelComponents } from '@core/ExcelComponents';
import { createTable } from '@/components/table/table.tmplate';

export class Table extends ExcelComponents {
   static className = 'excel__table';

   toHTML() {
      return createTable(20);
   }
}
