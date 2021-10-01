import React, { FC, useRef, useState } from 'react';
import { useStyle, Rule, Styles, colors } from '@dex-ddl/core';

import { Icon } from 'components/Icon';
import Provider from '../context/input';

export type Props = {
  label?: string;
  withIcon?: boolean;
  styles?: Styles | Rule;
  errormessage?: string;
};

export const Item: FC<Props> = ({ children, label, withIcon = true, errormessage = '' }) => {
  const { css } = useStyle();
  const [recordingState, setRecordingState] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputFocus = () => {
    return inputRef.current && inputRef.current?.focus();
  };

  return (
    <div className={css(wrapperItem)}>
      {label && (
        <div className={css(labelWrapperStyle)}>
          <label className={css(labelStyle)} title={label}>
            {label}
          </label>
        </div>
      )}
      <div className={css(childrenWrapper)}>
        <div>
          <Provider value={inputRef}>{children}</Provider>
          {errormessage && (
            <span
              className={css({
                position: 'absolute',
                left: 0,
                bottom: '-20px',
                fontSize: '14px',
                lineHeight: '18px',
                color: colors.error,
              })}
            >
              {errormessage}
            </span>
          )}
        </div>
        {withIcon && (
          <span
            className={css(IconStyle)}
            onClick={() => {
              setRecordingState(!recordingState);
              setInputFocus();
            }}
          >
            {recordingState ? <Icon graphic='roundStop' /> : <Icon graphic='microphone' fill={colors.dustyGray} />}
          </span>
        )}
      </div>
    </div>
  );
};

const wrapperItem: Rule = {
  boxSizing: 'border-box',
  margin: '0 0 24px',
  padding: '0',
  color: colors.black,
};

const labelStyle: Rule = {
  display: 'inline-flex',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 'bold',
};
const labelWrapperStyle: Rule = {
  maxWidth: '100%',
  padding: '0 0 8px',
};
const childrenWrapper: Rule = {
  position: 'relative',
  ':focus-within svg path': {
    fill: colors.tescoBlue,
  },
} as Styles;

const IconStyle: Rule = {
  position: 'absolute',
  top: '10px',
  right: '4px',
  cursor: 'pointer',
};
