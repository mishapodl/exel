class DOM {
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

   closest(selector) {
      return this.$el.closest(selector);
   }

   findAll(selector) {
      return this.$el.querySelectorAll(selector);
   }

   css(styles = {}) {
      Object.assign(this.$el.style, styles);
   }

   get dataset() {
      return this.$el.dataset;
   }

   get coord() {
      return this.$el.getBoundingClientRect();
   }

   get text() {
      return this.$el.textContent.trim();
   }

   get style() {
      return this.$el;
   }
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
