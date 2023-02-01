import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

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
  const ref = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);

  const onChange = (target: HTMLDivElement) => {
    if (target.scrollHeight !== height) {
      setHeight(target.scrollHeight);
    }
  };

  useEventListener('resize', () => ref.current && onChange(ref.current));

  useEffect(() => {
    const mutationObserver = new MutationObserver(([mutation]) => onChange(mutation.target as HTMLDivElement));

    if (ref?.current) {
      onChange(ref.current);
      mutationObserver.observe(ref.current, { attributes: true, childList: true, subtree: true });
    }

    return () => mutationObserver.disconnect();
  }, [ref]);

  return (
    <BasePanel {...props}>
      {({ getPanelProps, expanded }) => {
        return (
          <div
            className={css(accordionPanelStyles)}
            {...getPanelProps()}
            style={{ maxHeight: expanded ? `${height}px` : '0px' }}
            ref={ref}
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
