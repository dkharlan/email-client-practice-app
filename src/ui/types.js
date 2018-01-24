import moment from 'moment';
import type { Message, MessageKey } from '../store/types';

export type MessageDetails = {
  id:      string,
  sender:  string,
  date:    moment,
  subject: string,
  snippet: string
}

export type MessageEntry = {[id: MessageKey]: Message};
