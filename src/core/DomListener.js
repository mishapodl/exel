import { capitalize } from '@core/utils';

export class DomListener {
   constructor($root, listeners = []) {
      if (!$root) {
         throw new Error('No $root!');
      }

      this.$root = $root;
      this.listeners = listeners;
   }

   initDOMListeners() {
      this.listeners.forEach(listener => {
         const method = getTypeName(listener);

         if (!this[method]) {
            throw new Error(
               `Method ${method} is not implemented in ${this.name} Component`
            );
         }

         this.$root.on(listener, this[method]);
      });
   }

   removeDOMListener() {

   }
}

function getTypeName(listener) {
   return 'on' + capitalize(listener);
}
