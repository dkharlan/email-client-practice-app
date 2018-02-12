import moment from 'moment';
import _ from 'lodash';

import type { Message, Data, ThreadKey, Label } from '../store/types';
import type { MailboxDetails, MessageDetails } from "./types";
import { unescape, byTimeDescending } from '../utility/misc';

// TODO don't mix validation and data munging
const messageToDetails = (email: Message): MessageDetails => {
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

const denormalizeThread = ({threads, messages}: Data, threadId: ThreadKey): Array<MessageDetails> => {
  return threads[threadId].messages
    .map(message => messages[message.id])
    .map(messageToDetails)
    .sort(byTimeDescending);
};

export const denormalizeMailbox = (store: Data, mailboxName: Label): MailboxDetails => {
  const {mailboxes} = store;
  const threadIds = mailboxes[mailboxName].threadIds;
  return {
    name: mailboxName,
    threads: threadIds.map(_.partial(denormalizeThread, store))
  }
};
