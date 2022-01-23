import React, { FC } from 'react';

import type { AriaButtonProps } from '@react-types/button';

import { Rule, Styles, useStyle } from '@dex-ddl/core';

type Mode = 'default' | 'inverse';

export type DropZoneProps = {
  mode?: Mode;
  styles?: Styles | Rule;
  onUpload: (file: any) => void;
} & AriaButtonProps;

export const DropZone: FC<DropZoneProps> = ({ children, onUpload }) => {
  const { css } = useStyle();

  return (
    <label className={css(wrapperStyles)} htmlFor='DropZone'>
      <input
        className={css(buttonStyles)}
        type='file'
        id='DropZone'
        onChange={({ target }) => onUpload(target.files?.[0])}
      />
      {children}
    </label>
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
};

DropZone.displayName = 'DropZone';
