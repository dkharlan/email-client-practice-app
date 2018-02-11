import moment from 'moment';
import type { Message, MessageKey, ThreadKey, Label } from '../store/types';

// TODO merge these with store/types?

// TODO use more types from store/types
export type MessageDetails = {
  id:      string,
  sender:  string,
  date:    moment,
  subject: string,
  snippet: string
}

export type MessageEntry = {[id: MessageKey]: Message};

export type ThreadDetails = {
  id: ThreadKey,
  messages: Array<MessageDetails>
};

export type MailboxDetails = {
  name: Label,
  threads: Array<ThreadDetails>
};
