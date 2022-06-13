import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import ToastItem, { TEST_ID } from './ToastItem';
import { ToastPayload, Variant } from '../../config/types';

describe('ToastItem', () => {
  const testProps = {
    id: 'test-id',
    title: 'Test title',
    description: 'Test description',
    variant: Variant.INFO,
  } as ToastPayload;

  it('should render ToastItem', async () => {
    renderWithTheme(<ToastItem {...testProps} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
