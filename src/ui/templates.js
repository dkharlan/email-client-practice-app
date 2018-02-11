import moment from 'moment'; // TODO see below
import type { MessageDetails, MessageEntry } from './types';
import { denormalizeMailbox } from './transform';

// TODO how to resolve format here? importing moment doesn't
export const detailsTemplate = (details: MessageDetails) => {
  const formattedDate = details.date.format('h:mm A M/D/YY');
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

export const sidebarTemplate = (store, mailboxName) => {
  const {threads} = denormalizeMailbox(store, mailboxName);
  const emails = threads.map(messages => messages[0]);
  const emailsTemplateFragment = emails.reduce((accum, e) => accum + '\n' + detailsTemplate(e), '');
  return `
      <h2 class="email-header">${mailboxName}</h2>
      <ul class="email-list">
        ${emailsTemplateFragment}
      </ul>
  `;
};
