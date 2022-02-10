import React, { FC, InputHTMLAttributes } from 'react';
import { Rule, Styles, useStyle } from '@dex-ddl/core';

export interface DropZoneProps extends InputHTMLAttributes<HTMLInputElement> {
  styles?: Styles | Rule;
  onUpload: (file?: File) => void;
}

export const DropZone: FC<DropZoneProps> = ({ children, onUpload, styles = {}, accept }) => {
  const { css } = useStyle();

  return (
    <div className={css({ ...styles })}>
      <label className={css(wrapperStyles)} htmlFor='DropZone'>
        <input
          className={css(buttonStyles)}
          type='file'
          id='DropZone'
          onChange={({ target }) => onUpload(target.files?.[0])}
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
