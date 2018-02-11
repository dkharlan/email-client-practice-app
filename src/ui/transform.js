import moment from 'moment';
import type { Message } from '../store/types';
import { unescape } from '../utility/misc';

// TODO don't mix validation and data munging
export const messageToDetails = (email: Message) => {
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
