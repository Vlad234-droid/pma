import React, { FC, ReactNode, useEffect, useState } from 'react';

import { AccordionConsumer, SectionProvider } from './contexts';

type RenderProps = {
  getSectionProps: (props?: { [key: string]: any }) => {
    'data-accordion-id-type': string;
  };
  expanded: boolean;
};

export type SectionProps = {
  defaultExpanded?: boolean;
  onToggle?: (nextExpanded: boolean) => void;
  children: (renderProps: RenderProps) => ReactNode;
};

export const BaseSection: FC<SectionProps> = ({ defaultExpanded, onToggle, children }) => {
  return (
    <AccordionConsumer>
      {({ accordionId, addSection, removeSection, getNextSectionId }) => (
        <InternalSection
          accordionId={accordionId}
          onToggle={onToggle}
          defaultExpanded={defaultExpanded}
          addSection={addSection}
          removeSection={removeSection}
          getNextSectionId={getNextSectionId}
        >
          {children}
        </InternalSection>
      )}
    </AccordionConsumer>
  );
};

type InternalSectionProps = SectionProps & {
  accordionId: string;
  addSection: (sectionId: string, expandSection: () => void, collapseSection: () => void) => void;
  removeSection: (sectionId: string) => void;
  getNextSectionId: () => number;
};

const InternalSection: FC<InternalSectionProps> = ({
  accordionId,
  addSection,
  removeSection,
  getNextSectionId,
  onToggle,
  children,
  defaultExpanded = false,
}) => {
  const [id] = useState<string>(`${accordionId}-section-${getNextSectionId()}`);
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  useEffect(() => {
    addSection(id, expandSection, collapseSection);

    // TODO: It is never called. Remove this
    () => {
      removeSection(id);
    };
  }, []);

  const expandSection = () => {
    handleToggle(true);
  };

  const collapseSection = () => {
    handleToggle(false);
  };

  const handleToggle = (nextExpanded: boolean) => {
    onToggle && onToggle(nextExpanded);

    setExpanded(nextExpanded);
  };

  return (
    <SectionProvider
      value={{
        sectionId: id,
        expanded,
        onToggle: handleToggle,
      }}
    >
      {children({
        getSectionProps: (props = {}) => {
          return {
            ...props,
            'data-accordion-id-type': `${accordionId}-section`,
          };
        },
        expanded,
      })}
    </SectionProvider>
  );
};

const Section: FC<Omit<SectionProps, 'children'>> = ({ children, ...props }) => (
  <BaseSection {...props}>{({ getSectionProps }) => <div {...getSectionProps()}>{children}</div>}</BaseSection>
);

export default Section;
