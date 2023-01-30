import React, { FC, ReactNode, useState } from 'react';
import debounce from 'lodash.debounce';

import { Rule, useStyle } from '@pma/dex-wrapper';

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
  const [content, setContent] = useState<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  useEventListener(
    'resize',
    debounce(() => content?.scrollHeight && setHeight(content.scrollHeight || 0), 300),
  );

  const onSetRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      if (ref.scrollHeight === 0) {
        // Wait until all components are rendered to set correct height
        setTimeout(() => onSetRef(ref), 100);
      } else if (ref.scrollHeight !== height) {
        setHeight(ref.scrollHeight);
        setContent(ref);
      }
    }
  };

  return (
    <BasePanel {...props}>
      {({ getPanelProps, expanded }) => {
        return (
          <div
            className={css(accordionPanelStyles)}
            {...getPanelProps()}
            style={{ maxHeight: expanded ? `${height}px` : '0px' }}
            ref={onSetRef}
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
