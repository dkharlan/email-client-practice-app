/**
 * @flow
 */

import type { Message, MessageKey } from './store/types';
import store from './store/index';

type EmailDetails = {
  sender: string,
  timestamp: string, // TODO for now
  subject: string,
  snippet: string
}

type MessageEntry = {[id: MessageKey]: Message};

function emailToDetails(email: Message) {
  const headers = email.payload.headers;

  const fromHeader = headers.find((h) => h.name === 'From');
  const subjectHeader = headers.find((h) => h.name === 'Subject');

  if(!fromHeader) {
    throw 'Email has no "From" header';
  }
  if(!subjectHeader) {
    throw 'Email has no "Subject" header';
  }

  return {
    sender: fromHeader.value,
    timestamp: email.internalDate,
    subject: subjectHeader.value,
    snippet: email.snippet
  }
}

function emailDetailsTemplate(details: EmailDetails) {
  return `
    <li>
      <button class="email-item" type="button">
        <div class="sender-details">
          <p>${details.sender}</p>
          <span>${details.timestamp}</span>
        </div>
        <p class="email-subject">${details.subject}</p>
        <p>${details.snippet}</p>
      </button>
    </li>
  `;
}

// TODO needs types. better yet, replace with 'compose' from some lib
const emailToTemplate = (e) => emailDetailsTemplate(emailToDetails(e));

// TODO needs some types, see if this can be replaced by something from a lib
function byTime(a, b) {
  if(a > b) {
    return -1;
  }
  else if (a < b) {
    return 1;
  }
  else {
    return 0;
  }
}

function sidebarTemplate(emailEntries: MessageEntry) {
  const emails = Object.values(emailEntries).sort(byTime);
  const emailsTemplateFragment = emails.reduce((accum, e) => accum + '\n' + emailToTemplate(e), '');
  return `
      <h2 class="email-header">Inbox</h2>
      <ul class="email-list">
        ${emailsTemplateFragment}
      </ul>
  `;
}

function render(selector, template) {
  const element = document.querySelector(selector);
  if(element) {
    element.innerHTML = template;
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  render('.email-list-container', sidebarTemplate(store.messages));
});
