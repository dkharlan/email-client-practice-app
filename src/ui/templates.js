import _ from 'lodash';
import type Moment from 'moment';

import type { MessageDetails } from './types';
import { denormalizeMailbox } from './transform';
import { capitalize } from '../utility/misc';

// TODO how to resolve format here?
const detailsTemplate = (details: MessageDetails) => {
  const date: Moment = details.date;
  const formattedDate = date.format('h:mm A M/D/YY');
  return `
    <li>
      <button data-message-id="${details.id}" class="email-item" type="button">
        <div class="sender-details">
          <p>${details.sender}</p>
          <span>${formattedDate}</span>
        </div>
        <p class="email-subject">${details.subject}</p>
        <p>${details.snippet}</p>
      </button>
    </li>
  `;
};

const mailboxOption = (selectedMailbox, mailbox) => {
  return `
    <option value="${mailbox}" ${selectedMailbox === mailbox ? 'selected' : ''}>
      ${capitalize(mailbox)}
    </option>
  `;
};

const mailboxSelector = (mailboxes, selectedMailbox) => {
  const makeMailboxOption = _.partial(mailboxOption, selectedMailbox);
  return `<select id="mailbox-picker">${mailboxes.map(makeMailboxOption)}</select>`;
};

export const sidebarTemplate = (store, selectedMailboxName) => {
  const mailboxNames = Object.keys(store.mailboxes);
  const {threads} = denormalizeMailbox(store, selectedMailboxName);
  const emails = threads.map(messages => messages[0]);
  const emailsTemplateFragment = emails.reduce((accum, e) => accum + '\n' + detailsTemplate(e), '');
  return `
    ${mailboxSelector(mailboxNames, selectedMailboxName)}
    <ul class="email-list">
      ${emailsTemplateFragment}
    </ul>
  `;
};
