import { storage } from '@core/utils';

function toHtml(key) {
   const state = storage(key);

   return `
      <li class="db__record">
         <a href="#${key.replace(':', '/')}">${state.title}</a>
         <strong>
            ${new Date(state.openedDate).toLocaleDateString()}
            ${new Date(state.openedDate).toLocaleTimeString()}
         </strong>
      </li>
   `;
}

function getAllKeys() {
   const keys = [];

   for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.includes('excel')) {
         continue;
      }
      keys.push(localStorage.key(i));
   }
   return keys;
}

export function createDashboard() {
   const keys = getAllKeys();

   if (!keys.length) {
      return `<p>Ноль записей</p>`;
   }

   return `
      <div class="db__list-header">
         <span>Название</span>
         <span>Дата открытия</span>
      </div>

      <ul class="db__list">
         ${keys.map(toHtml).join('')}
      </ul>
   `;
}