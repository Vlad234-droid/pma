import React, { FC, InputHTMLAttributes, useRef } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';

export interface DropZoneProps extends InputHTMLAttributes<HTMLInputElement> {
  styles?: Styles | Rule;
  onUpload: (file: File) => void;
}

export const DropZone: FC<DropZoneProps> = ({ children, onUpload, styles = {}, accept }) => {
  const { css } = useStyle();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target?.files?.[0];
    const current = inputRef.current;
    if (file) {
      onUpload(file);
    }
    if (current) {
      current.value = '';
    }
  };

  return (
    <div className={css({ ...styles })}>
      <label className={css(wrapperStyles)} htmlFor='DropZone'>
        <input
          className={css(buttonStyles)}
          type='file'
          id='DropZone'
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
        />
        {children}
      </label>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  height: '100px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px dashed #00539F',
};

const buttonStyles: Rule = {
  position: 'absolute',
  inset: 0,
  opacity: 0,
  width: '100%',
  cursor: 'pointer',
};

DropZone.displayName = 'DropZone';
