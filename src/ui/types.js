import moment from 'moment';
import type { Message, MessageKey } from '../store/types';

export type MessageDetails = {
  sender:  string,
  date:    moment,
  subject: string,
  snippet: string
}

export type MessageEntry = {[id: MessageKey]: Message};
