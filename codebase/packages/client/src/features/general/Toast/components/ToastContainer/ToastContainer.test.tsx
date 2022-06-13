import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import ToastContainer, { TEST_ID } from './ToastContainer';
import { ToastPayload, Variant } from '../../config/types';

describe('ToastContainer', () => {
  const items: ToastPayload[] = [
    {
      id: 'test-id-1',
      title: 'Test title 1',
      description: 'Test description 1',
      variant: Variant.INFO,
    },
    {
      id: 'test-id-2',
      title: 'Test title 2',
      description: 'Test description 2',
      variant: Variant.INFO,
    },
  ];

  it('should render ToastContainer', async () => {
    renderWithTheme(<ToastContainer items={items} />);
    const widget = screen.queryByTestId(TEST_ID);

    expect(widget).toBeInTheDocument();
  });
});
