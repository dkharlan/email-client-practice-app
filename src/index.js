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

// TODO there's a pattern here, but i'm holding off on pulling it out for now
const mountEmailListContainer = mailboxName => {
  render('.email-list-container', t.sidebarTemplate(store, mailboxName));
  const mailboxPicker = document.querySelector('#mailbox-picker');
  if(mailboxPicker) {
    mailboxPicker.addEventListener('change', selectMailbox);
  }
};

// see https://github.com/facebook/flow/issues/2099
const selectMailbox = ({target}) => {
  if(!(target instanceof window.HTMLInputElement)) {
    throw 'selectMailbox event target is not an HTMLInputElement';
  }
  const mailboxIndex = target.selectedIndex;
  const mailboxName = target.options[mailboxIndex].value;
  mountEmailListContainer(mailboxName);
};

document.addEventListener('DOMContentLoaded', function() {
  mountEmailListContainer('INBOX');
});
