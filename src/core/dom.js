export class DOM {
   constructor(selector) {
      this.$el =
         typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
   }

   html(html) {
      if (typeof html === 'string') {
         this.$el.innerHTML = html;
         return this;
      }
      return this.$el.outerHTML.trim();
   }

   clear() {
      this.html('');
      return this;
   }

   append(node) {
      if (node instanceof DOM) {
         node = node.$el;
      }

      if (Element.prototype.append) {
         this.$el.append(node);
      } else {
         this.$el.append(node);
      }
      return this;
   }

   on(eventType, callback) {
      this.$el.addEventListener(eventType, callback);
   }

   off(eventType, callback) {
      this.$el.removeEventListener(eventType, callback);
   }

   get data() {
      return this.$el.dataset;
   }

   id(parse) {
      if (parse) {
         const parsed = this.id().split(':');
         return {
            row: +parsed[0],
            col: +parsed[1]
         };
      }
      return this.data.id;
   }

   closest(selector) {
      return $(this.$el.closest(selector));
   }

   getCoords() {
      return this.$el.getBoundingClientRect();
   }

   findAll(selector) {
      return this.$el.querySelectorAll(selector);
   }

   find(selector) {
      return $(this.$el.querySelector(selector));
   }

   addClass(classes) {
      this.$el.classList.add(classes);
      return this;
   }

   removeClass(className) {
      this.$el.classList.remove(className);
      return this;
   }

   toggleClass(className) {
      this.$el.classList.toggle(className);
   }

   css(styles = {}) {
      Object
         .keys(styles)
         .forEach(key => {
            this.$el.style[key] = styles[key];
         });
   }

   focus() {
      this.$el.focus();
      return this;
   }

   text(text) {
      if (typeof text === 'string') {
         this.$el.textContent = text;
         return this;
      }
      return this.$el.textContent;
   }

   fn() {}
}

export function $(selector) {
   return new DOM(selector);
}

$.create = (tagName, classes = '') => {
   const $el = document.createElement(tagName);
   if (classes) {
      $el.classList.add(classes);
   }
   return $($el);
};
