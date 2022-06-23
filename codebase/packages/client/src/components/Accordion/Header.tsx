import React, { FC, KeyboardEvent, ReactNode } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { AccordionConsumer, SectionConsumer } from './contexts';
import { EventListener, KeyboardEventListener } from './types';
import { ENTER, SPACE } from './constans';
import { Icon } from '../Icon';
import { Status } from 'config/enum';

type HeadingProps = {
  'aria-level': number;
  role: 'heading';
};

type ToggleProps = {
  id: string;
  'aria-controls': string;
  'aria-disabled': boolean | undefined;
  'aria-expanded': boolean;
  'data-accordion-id-type': string;
  onClick: EventListener;
  onKeyDown: KeyboardEventListener;
};

type ElementToggleProps = ToggleProps & {
  onKeyPress: KeyboardEventListener;
  role: 'button';
  tabIndex: 0;
};

type ButtonToggleProps = ToggleProps & {
  disabled?: boolean;
};

type RenderProps = {
  expanded: boolean;
  getHeadingProps: (props?: { [key: string]: any }) => HeadingProps;
  getElementToggleProps: (props?: { [key: string]: any }) => ElementToggleProps;
  getButtonToggleProps: (props?: { [key: string]: any }) => ButtonToggleProps;
};

export type HeaderProps = {
  disabled?: boolean;
  headingLevel?: number;
  children: (renderProps: RenderProps) => ReactNode;
};

const isClickKey = (key: string) => [ENTER, SPACE].includes(key);

export const BaseHeader: FC<HeaderProps> = ({ children, headingLevel, disabled, ...defaultRest }) => {
  const callAll =
    (...fns: Array<Function | undefined>) =>
    (...args: any[]) =>
      fns.forEach((fn) => fn && fn(...args));

  return (
    <AccordionConsumer>
      {({ accordionId, onHeaderKeyDown }) => (
        <SectionConsumer>
          {({ sectionId, expanded, onToggle: sectionOnToggle }) => {
            const onToggle = () => {
              if (disabled) {
                return;
              }

              sectionOnToggle(!expanded);
            };

            const getToggleProps = (props: { [key: string]: any }) => {
              const { onClick, onKeyDown, ...rest } = props;

              return {
                ...rest,
                id: `${sectionId}-header`,
                'aria-controls': `${sectionId}-panel`,
                'aria-disabled': disabled == null ? undefined : disabled,
                'aria-expanded': expanded,
                'data-accordion-id-type': `${accordionId}-header`,
                onClick: callAll(onClick, onToggle),
                onKeyDown: callAll(onKeyDown, onHeaderKeyDown),
              };
            };

            return children({
              expanded,
              getHeadingProps: (props = {}) => ({
                ...defaultRest,
                ...props,
                'aria-level': headingLevel as number,
                role: 'heading',
              }),
              getElementToggleProps: (props = {}) => {
                const { onKeyPress, ...rest } = props;

                return {
                  ...getToggleProps(rest),
                  tabIndex: 0,
                  role: 'button',
                  onKeyPress: callAll(onKeyPress, (event: KeyboardEvent<HTMLElement>) => {
                    if (!isClickKey(event.key)) {
                      return;
                    }

                    onToggle();
                    // Prevents SPACE from scrolling the page
                    event.preventDefault();
                  }),
                };
              },
              getButtonToggleProps: (props = {}) => {
                return {
                  ...getToggleProps(props),
                  disabled: disabled == null ? undefined : disabled,
                };
              },
            });
          }}
        </SectionConsumer>
      )}
    </AccordionConsumer>
  );
};

const Header: FC<
  Omit<HeaderProps, 'children'> & { title: string; status?: Status; component?: React.ReactNode | null }
> = ({ title, component, children, ...props }) => {
  const { css } = useStyle();

  return (
    <BaseHeader {...props}>
      {({ getHeadingProps, getElementToggleProps }) => (
        <div className={css(accordionHeaderWrapperStyles)} {...getHeadingProps()}>
          <div className={css(accordionHeaderStyles)} {...getElementToggleProps()}>
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              })}
            >
              <h3 className={css(accordionHeaderTitleStyles)}>{title}</h3>
              {component}
            </div>
            <ExpandButton extraStyles={marginRightStyles} />
          </div>
          {children && <div>{children}</div>}
        </div>
      )}
    </BaseHeader>
  );
};

type ExpandButtonProps = {
  onClick?: (expanded: boolean) => void;
  extraStyles?: Rule;
};

export const ExpandButton: FC<ExpandButtonProps> = ({ onClick, extraStyles }) => (
  <>
    <BaseHeader>
      {({ getHeadingProps, getElementToggleProps, expanded }) => (
        <div
          data-test-id='expand-button'
          style={{ cursor: 'pointer' }}
          {...getHeadingProps()}
          onClick={() => onClick && onClick(!expanded)}
        >
          <div {...getElementToggleProps()}>
            <Icon
              iconStyles={{ ...accordionIconStyles, ...(expanded ? accordionIconExpandStyles : {}), ...extraStyles }}
              graphic='arrowDown'
            />
          </div>
        </div>
      )}
    </BaseHeader>
  </>
);

const accordionHeaderWrapperStyles: Rule = {
  paddingBottom: '25px',
};

const accordionHeaderStyles: Rule = ({ theme }) => ({
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
});

const accordionHeaderTitleStyles: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
});

const accordionIconStyles: Rule = {
  transition: 'transform 0.6s ease',
};

const marginRightStyles: Rule = {
  marginRight: '18px',
};

const accordionIconExpandStyles: Rule = {
  transform: 'rotate(180deg)',
};

export default Header;
