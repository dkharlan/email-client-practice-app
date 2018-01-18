/**
 * @flow
 */

import moment from 'moment';

import type { Message, MessageKey } from './store/types';
import store from './store/index';

type MessageDetails = {
  sender:  string,
  date:    moment,
  subject: string,
  snippet: string
}

type MessageEntry = {[id: MessageKey]: Message};

function messageToDetails(email: Message) {
  const headers = email.payload.headers;

  const fromHeader = headers.find((h) => h.name === 'From');
  const subjectHeader = headers.find((h) => h.name === 'Subject');

  if(!fromHeader) {
    throw 'Email has no "From" header';
  }
  if(!subjectHeader) {
    throw 'Email has no "Subject" header';
  }

  const date = moment(parseInt(email.internalDate));

  return {
    sender:  fromHeader.value,
    date:    date,
    subject: subjectHeader.value,
    snippet: email.snippet
  }
}

function detailsTemplate(details: MessageDetails) {
  const formattedDate = details.date.format('h:mm A M/D/YY');
  return `
    <li>
      <button class="email-item" type="button">
        <div class="sender-details">
          <p>${details.sender}</p>
          <span>${formattedDate}</span>
        </div>
        <p class="email-subject">${details.subject}</p>
        <p>${details.snippet}</p>
      </button>
    </li>
  `;
}

// from https://github.com/moment/moment/issues/3163
function byTimeDescending(a: MessageDetails, b: MessageDetails) {
  const theFuture = moment('10000-01-01');
  const dateA = a.date || theFuture;
  const dateB = b.date || theFuture;
  return dateB.diff(dateA);
}

function sidebarTemplate(emailEntries: MessageEntry) {
  const emails = Object.values(emailEntries).map(messageToDetails).sort(byTimeDescending);
  const emailsTemplateFragment = emails.reduce((accum, e) => accum + '\n' + detailsTemplate(e), '');
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
