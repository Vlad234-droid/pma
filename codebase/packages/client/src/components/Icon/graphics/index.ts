import { Add } from './add';
import { ArrowLeft } from './arrow-left';
import { ArrowRight } from './arrow-right';
import { Calender } from './calender';
import { CalenderFilled } from './calenderFilled';
import { Cancel } from './cancel';
import { Check } from './check';
import { ChatSq } from './chat-sq';
import { Document } from './document';
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
import { Trash } from './trash';
import { Folder } from './folder';
import { Archive } from './archive';
import { Full } from './full';
import { Less } from './less';
import { Rating } from './rating';
import { Goal } from './goal';
import { View } from './view';
import { Play } from './play';
import { Bell } from './bell';
import { NotificationBell } from './notificationBell';
import { Support } from './support';
import { Home } from './home';
import { Hamburger } from './hamburger';
import { List } from './list';
import { Team } from './team';
import { Tool } from './tool';
import { CreateCycle } from './createCycle';
import { Bank } from './bank';
import { Configuration } from './configuration';
import { Lamp } from './lamp';
import { Globe } from './globe';
import { Attention } from './attention';
import { More } from './more';
import { ArrowRightPaginator } from './arrowRightPaginator';
import { ArrowLeftPaginator } from './arrowLeftPaginator';
import { Performance } from './performance';
import { People } from './people';
import { Person } from './person';
import { Link } from './link';
import { FileAttached } from './fileAttached';
import { Upload } from './upload';
import { Chart } from './chart';

/**
 * Each icon we add needs to have viewbox set to "0 0 24 24".
 * Sometimes icons exported from Figma could have a different viewbox than "0 0 24 24".
 * In this situation we should get icon on design system page,
 */

export type Graphics =
  | 'account'
  | 'add'
  | 'alert'
  | 'archive'
  | 'arrowDown'
  | 'arrowLeft'
  | 'arrowRight'
  | 'arrowUp'
  | 'calender'
  | 'calenderFilled'
  | 'cancel'
  | 'chat'
  | 'check'
  | 'configuration'
  | 'createCycle'
  | 'delete'
  | 'trash'
  | 'document'
  | 'download'
  | 'edit'
  | 'folder'
  | 'home'
  | 'hamburger'
  | 'information'
  | 'globe'
  | 'list'
  | 'microphone'
  | 'bell'
  | 'notificationBell'
  | 'people'
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
  | 'bank'
  | 'support'
  | 'team'
  | 'lamp'
  | 'tool'
  | 'attention'
  | 'more'
  | 'arrowRightPaginator'
  | 'arrowLeftPaginator'
  | 'full'
  | 'less'
  | 'goal'
  | 'rating'
  | 'view'
  | 'play'
  | 'person'
  | 'link'
  | 'fileAttached'
  | 'chart'
  | 'upload';

export const icons: Record<Graphics, FCGraphicProps> = {
  attention: Attention,
  add: Add,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  chat: ChatSq,
  document: Document,
  account: Account,
  calender: Calender,
  calenderFilled: CalenderFilled,
  cancel: Cancel,
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
  trash: Trash,
  folder: Folder,
  archive: Archive,
  // arrowRight: ArrowRight,
  bell: Bell,
  notificationBell: NotificationBell,
  people: People,
  support: Support,
  home: Home,
  hamburger: Hamburger,
  list: List,
  performance: Performance,
  team: Team,
  tool: Tool,
  createCycle: CreateCycle,
  bank: Bank,
  configuration: Configuration,
  lamp: Lamp,
  globe: Globe,
  more: More,
  arrowRightPaginator: ArrowRightPaginator,
  arrowLeftPaginator: ArrowLeftPaginator,
  full: Full,
  less: Less,
  rating: Rating,
  goal: Goal,
  view: View,
  play: Play,
  person: Person,
  link: Link,
  fileAttached: FileAttached,
  upload: Upload,
  chart: Chart,
};
