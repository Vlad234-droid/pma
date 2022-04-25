import { createContext } from 'react';

import { KeyboardEventListener } from './types';

type AccordionContext = {
  accordionId: string;
  disableRegions: boolean;
  onHeaderKeyDown: KeyboardEventListener;
  addSection: (sectionId: string, expandSection: () => void, collapseSection: () => void) => void;
  removeSection: (sectionId: string) => void;
  getNextSectionId: () => number;
};
const defaultEmpty = () => {
  // This is intentional
};

const { Provider: AccordionProvider, Consumer: AccordionConsumer } = createContext<AccordionContext>({
  accordionId: '',
  disableRegions: false,
  onHeaderKeyDown: defaultEmpty,
  addSection: defaultEmpty,
  removeSection: defaultEmpty,
  getNextSectionId: () => 0,
});

type SectionContext = {
  sectionId: string;
  expanded: boolean;
  onToggle: (nextExpanded: boolean) => void;
};

const { Provider: SectionProvider, Consumer: SectionConsumer } = createContext<SectionContext>({
  sectionId: '',
  expanded: false,
  onToggle: defaultEmpty,
});

export { AccordionProvider, AccordionConsumer, SectionProvider, SectionConsumer };
