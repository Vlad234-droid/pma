import React, { ReactNode, useRef, RefObject, CSSProperties, FC } from 'react';
import { useStyle, Rule } from 'styles';

import { AccordionConsumer, SectionConsumer } from './contexts';

type PanelProps = {
  id: string;
  role: 'region' | undefined;
  'aria-labelledby': string;
  'aria-hidden': true | undefined;
  style: CSSProperties;
};

type RenderProps = {
  expanded: boolean;
  content: RefObject<any>;
  getPanelProps: (props?: { [key: string]: any }) => PanelProps;
};

export type Props = {
  children: (renderProps: RenderProps) => ReactNode;
};

export const BasePanel = ({ children, ...baseRest }: Props) => {
  const content = useRef<HTMLElement>(null);

  return (
    <AccordionConsumer>
      {({ disableRegions }) => (
        <SectionConsumer>
          {({ sectionId, expanded }) =>
            children({
              expanded,
              content,
              getPanelProps: (props = {}) => ({
                ...baseRest,
                ...props,
                id: `${sectionId}-panel`,
                role: disableRegions ? undefined : 'region',
                'aria-labelledby': `${sectionId}-header`,
                'aria-hidden': expanded ? undefined : true,
                style: { maxHeight: expanded && content.current ? `${content.current.scrollHeight}px` : '0px' },
              }),
            })
          }
        </SectionConsumer>
      )}
    </AccordionConsumer>
  );
};

const Panel: FC<{}> = ({ children, ...props }) => {
  const { css } = useStyle();

  return (
    <BasePanel {...props}>
      {({ getPanelProps, content }) => (
        <div className={css(accordionPanelStyles)} {...getPanelProps()} ref={content}>
          {children}
        </div>
      )}
    </BasePanel>
  );
};

const accordionPanelStyles: Rule = {
  overflow: 'hidden',
  transition: 'max-height 0.6s ease',
};

export default Panel;
