import { ExcelComponent } from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
   constructor(...args) {
      super(...args);
   }

   get template() {
      console.log('1');
      return JSON.stringify(this.state);
   }

   initState(initialState = {}) {
      this.state = { ...initialState };
   }

   setState(newState) {
      this.state = { ...this.state, ...newState };
      this.$root.html(this.template);
   }
}