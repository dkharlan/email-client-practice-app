import moment from 'moment';
import _ from 'lodash';

import type { Message, Data, ThreadKey, Label } from '../store/types';
import type { MailboxDetails, MessageDetails, ThreadDetails } from "./types";
import { unescape, byTimeDescending } from '../utility/misc';

// TODO don't mix validation and data munging
export const messageToDetails = (email: Message): MessageDetails => {
  const headers = email.payload.headers;
  const fromHeader = headers.find((h) => h.name === 'From');
  const subjectHeader = headers.find((h) => h.name === 'Subject');

  if(!fromHeader) {
    throw 'Email has no "From" header';
  }

  return {
    id:      email.id,
    sender:  unescape(fromHeader.value),
    date:    moment(parseInt(email.internalDate)),
    subject: subjectHeader ? subjectHeader.value : '(No subject)',
    snippet: email.snippet
  }
};

export const denormalizeThread = ({threads, messages}: Data, threadId: ThreadKey): ThreadDetails => {
  const messageIds = threads[threadId];
  const messagesDetails = messageIds.map((messageId) => messageToDetails(messages[messageId]))
                                    .sort(byTimeDescending);
  return {
    id: threadId,
    messages: messagesDetails
  }
};

export const denormalizeMailbox = (store: Data, mailboxName: Label): MailboxDetails => {
  const {mailboxes} = store;
  const threadDenormalizer = _.partial(denormalizeThread, store);
  const threadIds = mailboxes[mailboxName];
  const threads = threadIds.map((threadId) => threads[threadId].map(threadDenormalizer));
  return {
    name: mailboxName,
    threads: threads
  }
};
