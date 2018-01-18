/**
 * @flow
 */

import store from './store/index';
import * as t from './ui/templates';

function render(selector, template) {
  const element = document.querySelector(selector);
  if(element) {
    element.innerHTML = template;
  }
}

document.addEventListener('DOMContentLoaded', function(_) {
  render('.email-list-container', t.sidebarTemplate(store.messages));
});
