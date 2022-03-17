import { Add } from './add';
import { ArrowLeft } from './arrow-left';
import { ArrowRight } from './arrow-right';
import { Calender } from './calender';
import { Cancel } from './cancel';
import { Check } from './check';
import { ChatSq } from './chat-sq';
import { Document } from './document';
import { Decline } from './decline';
import { Account } from './account';
import { Microphone } from './microphone';
import { RoundStop } from './round-stop';
import { RoundCircle } from './round-circle';
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
import { Settings } from './settings';
import { SettingsGear } from './settings-gear';
import { Question } from './question';
import { SignOut } from './sign-out';
import { Search } from './search';
import { Download } from './download';
import { Alert } from './alert';
import { Information } from './information';
import { Delete } from './delete';
import { Folder } from './folder';
import { Archive } from './archive';
// import { ArrowRight } from './arrowRight';
import { NotiBellCirlceOut } from './notiBellCirlceOut';
import { Support } from './support';
import { Home } from './home';
import { Hamburger } from './hamburger';
import { Aim } from './aim';
import { List } from './list';
import { Performance } from './performance';
import { Team } from './team';
import { Calibration } from './calibration';
import { Tool } from './tool';
import { CreateCycle } from './createCycle';
import { StrategicDriver } from './strategicDriver';
import { Configuration } from './configuration';
import { Tip } from './tip';
import { MultiLanguage } from './multiLanguage';
import { Close } from './close';
import { Attention } from './attention';

/**
 * Each icon we add needs to have viewbox set to "0 0 24 24".
 * Sometimes icons exported from Figma could have a different viewbox than "0 0 24 24".
 * In this situation we need to resize our icon to the proper size (24px/24px),
 * for that we can use https://products.aspose.app/imaging/image-resize/svg or https://editor.method.ac/.
 */
export type Graphics =
  | 'account'
  | 'add'
  | 'aim'
  | 'alert'
  | 'archive'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUp'
  | 'calender'
  | 'calibration'
  | 'cancel'
  | 'chatSq'
  | 'check'
  | 'close'
  | 'configuration'
  | 'createCycle'
  | 'decline'
  | 'delete'
  | 'document'
  | 'download'
  | 'edit'
  | 'folder'
  | 'home'
  | 'hamburger'
  | 'information'
  | 'multiLanguage'
  | 'list'
  | 'microphone'
  | 'notiBellCircleOut'
  | 'performance'
  | 'print'
  | 'question'
  | 'roundAlert'
  | 'roundCircle'
  | 'roundClock'
  | 'roundPencil'
  | 'roundStop'
  | 'roundTick'
  | 'search'
  | 'settings'
  | 'settingsGear'
  | 'share'
  | 'signOut'
  | 'strategicDriver'
  | 'support'
  | 'team'
  | 'tip'
  | 'tool'
  | 'attention';

export const icons: Record<Graphics, FCGraphicProps> = {
  attention: Attention,
  add: Add,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chatSq: ChatSq,
  document: Document,
  account: Account,
  calender: Calender,
  cancel: Cancel,
  close: Close,
  decline: Decline,
  check: Check,
  microphone: Microphone,
  roundStop: RoundStop,
  roundCircle: RoundCircle,
  roundClock: RoundClock,
  roundPencil: RoundPencil,
  roundTick: RoundTick,
  roundAlert: RoundAlert,
  edit: Edit,
  share: Share,
  print: Print,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  search: Search,
  settings: Settings,
  settingsGear: SettingsGear,
  question: Question,
  signOut: SignOut,
  download: Download,
  alert: Alert,
  information: Information,
  delete: Delete,
  folder: Folder,
  archive: Archive,
  // arrowRight: ArrowRight,
  notiBellCircleOut: NotiBellCirlceOut,
  support: Support,
  home: Home,
  hamburger: Hamburger,
  aim: Aim,
  list: List,
  performance: Performance,
  team: Team,
  calibration: Calibration,
  tool: Tool,
  createCycle: CreateCycle,
  strategicDriver: StrategicDriver,
  configuration: Configuration,
  tip: Tip,
  multiLanguage: MultiLanguage,
};

export { Chat } from './chat';
