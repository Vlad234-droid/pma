import React, { KeyboardEvent, ReactNode, FC } from 'react';
import { useStyle, Rule } from '@dex-ddl/core';

import { AccordionConsumer, SectionConsumer } from './contexts';
import { EventListener, KeyboardEventListener } from './types';
import { ENTER, SPACE } from './constans';
import { Icon } from '../Icon';

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

const Header: FC<Omit<HeaderProps, 'children'> & { title: string }> = ({ title, children, ...props }) => {
  const { css } = useStyle();

  return (
    <BaseHeader {...props}>
      {({ getHeadingProps, getElementToggleProps, expanded }) => (
        <div className={css(accordionHeaderWrapperStyles)} {...getHeadingProps()}>
          <div className={css(accordionHeaderStyles)} {...getElementToggleProps()}>
            <h3 className={css(accordionHeaderTitleStyles)}>{title}</h3>
            <Icon
              iconStyles={{
                ...accordionIconStyles,
                ...marginRightStyles,
                ...(expanded ? accordionIconExpandStyles : {}),
              }}
              graphic='arrowUp'
            />
          </div>
          {children && <div>{children}</div>}
        </div>
      )}
    </BaseHeader>
  );
};

export const ExpandButton = () => {
  return (
    <>
      <BaseHeader>
        {({ getHeadingProps, getElementToggleProps, expanded }) => {
          return (
            <div {...getHeadingProps()}>
              <div {...getElementToggleProps()}>
                <Icon
                  iconStyles={{ ...accordionIconStyles, ...(expanded ? accordionIconExpandStyles : {}) }}
                  graphic='arrowDown'
                />
              </div>
            </div>
          );
        }}
      </BaseHeader>
    </>
  );
};

const accordionHeaderWrapperStyles: Rule = {
  paddingBottom: '25px',
};

const accordionHeaderStyles: Rule = ({ theme }) => ({
  borderTop: `1px solid ${theme.colors.disabled}`,
  paddingTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const accordionHeaderTitleStyles: Rule = ({ theme }) => ({
  fontSize: '16px',
  lineHeight: '20px',
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
