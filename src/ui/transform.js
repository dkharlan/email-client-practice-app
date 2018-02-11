import moment from 'moment';
import type { Message, Data, ThreadKey, Label } from '../store/types';
import type { MailboxDetails, MessageDetails, ThreadDetails } from "./types";
import { unescape } from '../utility/misc';

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

export const denormalizeThread = ({messages, threads}: Data, threadId: ThreadKey): ThreadDetails => {
  // TODO implement me
};

// TODO only need the most recent message of a thread, and only the snippet
export const denormalizeMailbox = ({mailboxes, messages, threads}: Data, mailboxName: Label): MailboxDetails => {
  // TODO implement me
};
