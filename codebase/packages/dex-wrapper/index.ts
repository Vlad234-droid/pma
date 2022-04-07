import {
  DDLProvider,
  Icon,
  IconButton,
  Rule,
  CreateRule,
  Colors,
  Theme,
  theme as baseTheme,
  useBreakpoints,
  useMedia,
  fontWeight,
  Styles,
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
  useAccessibleStyle as useStyle,
  useBreakpoints,
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
