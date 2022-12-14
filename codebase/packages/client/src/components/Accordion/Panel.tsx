import React, { ReactNode, useRef, FC, useState, useEffect } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import useEventListener from 'hooks/useEventListener';
import { AccordionConsumer, SectionConsumer } from './contexts';

type PanelProps = {
  id: string;
  role: 'region' | undefined;
  'aria-labelledby': string;
  'aria-hidden': true | undefined;
};

type RenderProps = {
  expanded: boolean;
  getPanelProps: (props?: { [key: string]: any }) => PanelProps;
};

export type Props = {
  children: (renderProps: RenderProps) => ReactNode;
};

export const BasePanel: FC<Props> = ({ children, ...baseRest }) => {
  return (
    <AccordionConsumer>
      {({ disableRegions }) => (
        <SectionConsumer>
          {({ sectionId, expanded }) => {
            return children({
              expanded,
              getPanelProps: (props = {}) => ({
                ...baseRest,
                ...props,
                id: `${sectionId}-panel`,
                role: disableRegions ? undefined : 'region',
                'aria-labelledby': `${sectionId}-header`,
                'aria-hidden': expanded ? undefined : true,
              }),
            });
          }}
        </SectionConsumer>
      )}
    </AccordionConsumer>
  );
};

const Panel: FC = ({ children, ...props }) => {
  const { css } = useStyle();
  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    const { scrollHeight } = content.current || {};
    if (scrollHeight !== height) setHeight(scrollHeight || 0);
  };

  useEventListener('resize', updateHeight);

  useEffect(() => {
    updateHeight();
  });

  return (
    <BasePanel {...props}>
      {({ getPanelProps, expanded }) => {
        return (
          <div
            className={css(accordionPanelStyles)}
            {...getPanelProps()}
            style={{ maxHeight: expanded ? `${height}px` : '0px' }}
            ref={content}
          >
            <div>{children}</div>
          </div>
        );
      }}
    </BasePanel>
  );
};

const accordionPanelStyles: Rule = {
  overflow: 'hidden',
  transition: 'max-height 0.6s ease',
};

export default Panel;
