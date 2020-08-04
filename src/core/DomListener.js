import { capitalize } from '@core/utils';

export class DomListener {
   constructor($root, listeners = []) {
      if (!$root) {
         throw new Error('No $root!');
      }
      this.$root = $root || '';
      this.listeners = listeners;
      this.events = [];
   }

   initDOMListeners() {
      this.listeners.forEach(listener => {
         const method = getTypeName(listener);
         const event = this[method].bind(this);

         if (!listener) {
            throw new Error(`Listener ${listener} not exist in '${this.name}`);
         }

         this.$root.on(listener, event);
         this.events.push(event);
      });
   }

   removeDOMListeners() {
      this.listeners.forEach((listener, index) => {
         this.$root.off(listener, this.events[index]);
      });
   }
}

function getTypeName(listener) {
   return 'on' + capitalize(listener);
}
