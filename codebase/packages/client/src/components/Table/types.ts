import { CSSProperties } from 'react';
import { Rule, Styles } from '@pma/dex-wrapper';

export type TableProps = {
  currentItems: Array<Record<string, string | number | null>>;
  tableTitles: Array<string>;
  tableStyles?: Styles | Rule | CSSProperties | {};
  titleCustomStyles?: Styles | Rule | CSSProperties | {};
  descriptionCustomStyle?: Styles | Rule | CSSProperties | {};
  trCustomStyle?: Styles | Rule | CSSProperties | {};
  breakTd?: boolean;
};
