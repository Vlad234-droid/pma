import {
  DDLProvider,
  Icon,
  IconButton,
  Rule,
  CreateRule,
  Colors,
  Theme,
  theme as baseTheme,
  useMedia,
  fontWeight,
  Styles,
  useStyle, // todo remove when use acc tool
} from '@dex-ddl/core';
import { AccessibilityProvider, useAccessibleStyle } from '@accessibility-toolbar/core';
import merge from 'lodash.merge';
import secondaryTheme from './src/theme';

const theme = merge(baseTheme, secondaryTheme);
const colors = theme.colors;
const fontSettings = secondaryTheme.fontSettings;

import { Button } from './src/components/Button';
import { Modal } from './src/components/Modal';
import { ModalWithHeader } from './src/components/ModalWithHeader';

export type { Rule, CreateRule, Theme, Styles, Colors };
export {
  theme,
  DDLProvider,
  AccessibilityProvider,
  // useAccessibleStyle as useStyle, // todo uncomment when use acc tool
  useStyle, // todo remove when use acc tool
  useMedia,
  colors,
  fontWeight,
  fontSettings,
  Icon,
  Button,
  IconButton,
  ModalWithHeader,
  Modal,
};
