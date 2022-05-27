import React, { FC, useEffect, useLayoutEffect } from 'react';

import { SorryPage, SorryPageProps } from '@dex-ddl/core';

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const canUseDOM: boolean = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
);

React.useLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

export const SorryPageWrapper: FC<SorryPageProps> = (props: SorryPageProps) => {
  return (
    <SorryPage { ...props } />
  );
};
