/**
 * @flow
 */

import moment from 'moment';

import type { Label } from '../store/types';

// TODO merge these with store/types?

// TODO use more types from store/types
export type MessageDetails = {
  id:      string,
  sender:  string,
  date:    moment,
  subject: string,
  snippet: string
}

export type MailboxDetails = {
  name: Label,
  threads: Array<MessageDetails>
};
