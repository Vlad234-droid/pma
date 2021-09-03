import React, { FC, useRef, useState } from 'react';
import { useStyle, Rule, Styles } from 'styles';

import { Icon } from 'components/Icon';
import Provider from '../context/input';

export type Props = {
  label?: string;
  styles?: Styles | Rule;
};

export const Item: FC<Props> = ({ children, label }) => {
  const { css, theme } = useStyle();
  const [recordingState, setRecordingState] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputFocus = () => {
    return inputRef.current && inputRef.current?.focus();
  };

  return (
    <div
      className={css({
        boxSizing: 'border-box',
        margin: '0 0 24px',
        padding: '0',
        color: '#000000d9',
      })}
    >
      {label && (
        <div
          className={css({
            maxWidth: '100%',
            padding: '0 0 8px',
          })}
        >
          <label
            className={css({
              display: 'inline-flex',
              fontSize: '16px',
              lineHeight: '20px',
              fontWeight: 'bold',
            })}
            title={label}
          >
            {label}
          </label>
        </div>
      )}
      <div
        className={css({
          position: 'relative',
          ':focus-within svg path': {
            fill: theme.colors.tescoBlue,
          },
        } as React.CSSProperties)}
      >
        <div
          style={{
            maxWidth: '100%',
            display: 'flex',
          }}
        >
          <Provider value={inputRef}>{children}</Provider>
        </div>
        <span
          className={css({
            position: 'absolute',
            top: '10px',
            right: '4px',
            cursor: 'pointer',
          })}
          onClick={() => {
            setRecordingState(!recordingState);
            setInputFocus();
          }}
        >
          {recordingState ? <Icon graphic='roundStop' /> : <Icon graphic='microphone' fill='#A8A8A8' />}
        </span>
      </div>
    </div>
  );
};
