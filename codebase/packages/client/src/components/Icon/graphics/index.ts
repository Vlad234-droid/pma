import { Add } from './add';
import { ArrowLeft } from './arrow-left';
import { Calender } from './calender';
import { Cancel } from './cancel';
import { ChatSq } from './chat-sq';
import { Document } from './document';
import { Account } from './account';
import { Microphone } from './microphone';
import { RoundStop } from './round-stop';
import { RoundAlert } from './round-alert';
import { FCGraphicProps } from './types';
import { RoundClock } from './round-clock';
import { RoundPencil } from './round-pencil';
import { RoundTick } from './round-tick';
import { Edit } from './edit';
import { Share } from './share';
import { Print } from './print';
import { ArrowUp } from './arrow-up';
import { ArrowDown } from './arrow-down';

/**
 * Each icon we add needs to have viewbox set to "0 0 24 24".
 * Sometimes icons exported from Figma could have a different viewbox than "0 0 24 24".
 * In this situation we need to resize our icon to the proper size (24px/24px),
 * for that we can use https://products.aspose.app/imaging/image-resize/svg or https://editor.method.ac/.
 */
export type Graphics =
  | 'add'
  | 'chatSq'
  | 'document'
  | 'account'
  | 'calender'
  | 'cancel'
  | 'microphone'
  | 'arrowLeft'
  | 'roundClock'
  | 'roundPencil'
  | 'roundAlert'
  | 'roundTick'
  | 'roundStop'
  | 'edit'
  | 'share'
  | 'print'
  | 'arrowUp'
  | 'arrowDown';

export const icons: Record<Graphics, FCGraphicProps> = {
  add: Add,
  arrowLeft: ArrowLeft,
  chatSq: ChatSq,
  document: Document,
  account: Account,
  calender: Calender,
  cancel: Cancel,
  microphone: Microphone,
  roundStop: RoundStop,
  roundClock: RoundClock,
  roundPencil: RoundPencil,
  roundTick: RoundTick,
  roundAlert: RoundAlert,
  edit: Edit,
  share: Share,
  print: Print,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
};
