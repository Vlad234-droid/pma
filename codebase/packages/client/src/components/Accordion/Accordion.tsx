import React, { FC, KeyboardEvent, ReactNode, useState, useEffect } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { ARROW_DOWN, ARROW_UP, HOME, END } from './constans';
import { AccordionProvider } from './contexts';

type RenderProps = {
  expandAllSections: () => void;
  collapseAllSections: () => void;
};

export type AccordionProps = {
  id: string;
  wrapHeaderNavigation?: boolean;
  children: (renderProps: RenderProps) => ReactNode;
};

type Section = {
  id: string;
  expand: () => void;
  collapse: () => void;
};

let domHeaders: HTMLElement[] = [];
let nextSectionId = 1;

export const BaseAccordion: FC<AccordionProps> = ({ id, wrapHeaderNavigation, children }) => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    setDomHeaders();
  });

  const getNextSectionId = () => {
    const next = nextSectionId;

    nextSectionId++;

    return next;
  };

  const setDomHeaders = () => {
    const elementList = document.querySelectorAll(`[data-accordion-id-type="${id}-header"]`) as NodeListOf<HTMLElement>;

    domHeaders = [].slice.call(elementList);
  };

  const focusFirstHeader = () => {
    return domHeaders[0].focus();
  };

  const focusLastHeader = () => {
    return domHeaders[domHeaders.length - 1].focus();
  };

  const focusNextHeader = (currentIndex: number) => {
    if (currentIndex === domHeaders.length - 1) {
      if (wrapHeaderNavigation) {
        focusFirstHeader();
      }

      return;
    }

    domHeaders[currentIndex + 1].focus();
  };

  const focusPreviousHeader = (currentIndex: number) => {
    if (currentIndex === 0) {
      if (wrapHeaderNavigation) {
        focusLastHeader();
      }

      return;
    }

    domHeaders[currentIndex - 1].focus();
  };

  const expandAllSections = () => {
    sections.forEach(({ expand }) => expand());
  };

  const collapseAllSections = () => {
    sections.forEach(({ collapse }) => collapse());
  };

  const addSection = (sectionId: string, expand: () => void, collapse: () => void) => {
    setSections((prevSections) => [...prevSections, { id: sectionId, expand, collapse }]);
  };

  const removeSection = (sectionId: string) => {
    setSections((prevSections) => prevSections.filter(({ id }) => id !== sectionId));
  };

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const { key, currentTarget: domHeader } = event;

    switch (key) {
      case ARROW_DOWN: {
        // Prevents ARROW_DOWN from scrolling the page
        event.preventDefault();
        const currentIndex = domHeaders.indexOf(domHeader);
        focusNextHeader(currentIndex);
        break;
      }
      case ARROW_UP: {
        // Prevents ARROW_UP from scrolling the page
        event.preventDefault();
        const currentIndex = domHeaders.indexOf(domHeader);
        focusPreviousHeader(currentIndex);
        break;
      }
      case HOME: {
        focusFirstHeader();
        break;
      }
      case END: {
        focusLastHeader();
        break;
      }
    }
  };

  return (
    <AccordionProvider
      value={{
        accordionId: id,
        disableRegions: sections.length > 6,
        onHeaderKeyDown: handleHeaderKeyDown,
        addSection,
        removeSection,
        getNextSectionId,
      }}
    >
      {children({
        collapseAllSections,
        expandAllSections,
      })}
    </AccordionProvider>
  );
};

const Accordion: FC<Omit<AccordionProps, 'children'>> = ({ children, ...props }) => {
  const { css } = useStyle();

  return <BaseAccordion {...props}>{() => <div className={css(wrapperStyles)}>{children}</div>}</BaseAccordion>;
};

const wrapperStyles: Rule = ({ theme }) => ({
  position: 'relative',
  borderBottom: `2px solid ${theme.colors.backgroundDarkest}`,
  marginTop: '25px',
});

export default Accordion;
