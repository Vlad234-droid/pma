import React, { FC, ReactNode, useRef, useState, CSSProperties } from 'react';
import { colors, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';
import MarkdownRenderer from 'components/MarkdownRenderer';
import Provider from '../context/input';

export type ItemProps = {
  label?: string;
  withIcon?: boolean;
  labelCustomStyle?: Styles | Rule | CSSProperties | {};
  errormessage?: string;
  marginBot?: boolean;
  customIcon?: ReactNode;
  onFocus?: () => void;
  focus?: boolean;
  onKeyDown?: (e: KeyboardEvent) => void;
  testId?: string;
  iconCustomStyles?: Styles | Rule | CSSProperties | {};
  onHover?: boolean;
};

export const Item: FC<ItemProps> = ({
  children,
  label,
  labelCustomStyle = {},
  withIcon = true,
  errormessage = '',
  marginBot = true,
  customIcon,
  focus,
  onFocus,
  onKeyDown,
  testId = 'item',
  iconCustomStyles = {},
  onHover = false,
}) => {
  const { css } = useStyle(['lineHeight'], 'remove');
  const [recordingState, setRecordingState] = useState(false);
  const [hover, setHover] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasFocus, setFocus] = useState(false);

  const setInputFocus = () => {
    if (focus) {
      onFocus && onFocus();
      return;
    }

    return inputRef.current && inputRef.current?.focus();
  };

  const icon = (
    <div
      className={css(IconStyle, iconCustomStyles)}
      onClick={() => {
        setInputFocus();
        onFocus && onFocus();
      }}
    >
      {customIcon}
    </div>
  );

  const renderIcon = () => {
    if (onHover && hover && customIcon) return icon;
    if (!onHover && !hover && customIcon) return icon;
  };

  return (
    <div
      data-test-id={testId}
      className={css(wrapperItem({ marginBot }))}
      // @ts-ignore
      onKeyDown={onKeyDown}
      onMouseEnter={() => onHover && setHover(() => true)}
      onMouseLeave={() => onHover && setHover(() => false)}
    >
      {label && (
        <div className={css({ ...labelWrapperStyle, ...labelCustomStyle })}>
          <label className={css(labelStyle)} title={label}>
            <MarkdownRenderer source={label} />
          </label>
        </div>
      )}
      <div className={css(childrenWrapper)}>
        <div>
          <Provider value={{ inputRef, hasFocus, setFocus }}>{children}</Provider>
          {errormessage && !hasFocus && <span className={css(errorMessageStyle)}>{errormessage}</span>}
        </div>
        {withIcon && (
          <div
            //TODO: remove this when Accessibility will be integrated
            className={css(IconStyle, { display: 'none' })}
            onClick={() => {
              setRecordingState(!recordingState);
              setInputFocus();
            }}
          >
            {recordingState ? <Icon graphic='roundStop' /> : <Icon graphic='microphone' fill={colors.dustyGray} />}
          </div>
        )}

        {renderIcon()}
      </div>
    </div>
  );
};

const wrapperItem: CreateRule<{ marginBot: boolean }> = ({ marginBot }) => ({
  boxSizing: 'border-box',
  padding: marginBot ? '0 0 24px' : '0px',
  margin: '0',
  color: colors.black,
  width: '100%',
});

const labelStyle: Rule = ({ theme }) => {
  return {
    display: 'inline-flex',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
  };
};
const labelWrapperStyle: Rule = {
  maxWidth: '100%',
  padding: '0 0 8px',
};
const childrenWrapper: Rule = {
  position: 'relative',
  //width: '40px',

  ':focus-within svg path': {
    fill: colors.tescoBlue,
  },
} as Styles;

const errorMessageStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  position: 'absolute',
  left: 0,
  top: '100%',
  color: theme.colors.error,
});

const IconStyle: Rule = {
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
  cursor: 'pointer',
};
