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

// TODO this thread has some suggestions for keeping flow happy
// https://github.com/facebook/flow/issues/2099
const selectMailbox = event => {
  const mailboxPicker = event.target;
  const mailboxIndex = mailboxPicker.selectedIndex;
  const mailboxName = mailboxPicker.options[mailboxIndex].value;
  mountEmailListContainer(mailboxName);
};

document.addEventListener('DOMContentLoaded', function() {
  mountEmailListContainer('INBOX');
});
