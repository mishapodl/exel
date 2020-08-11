import { Page } from '@core/Page';
import { $ } from '@core/dom';
import { createDashboard } from '@/pages/dashboard.template';

export class DashboardPage extends Page {
   getRoot() {
      return $.create('div', 'db').html(`
        <div class="db">
            <div class="db__header">
               <h1>Excel Dashboard</h1>
            </div>

            <div class="db__new">
               <div class="db__view">
                  <a href="#excel" class="db__create">
                     Новая <br />
                     Таблица
                  </a>
               </div>
            </div>

            <div class="db__table db__view">
               ${createDashboard()}
            </div>
         </div>
      `);
   }
}