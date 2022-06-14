import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';

import StatusBadge from './StatusBadge';
import { Status } from 'config/enum';

describe('<StatusBadge/>', () => {
  it('render DRAFT', async () => {
    render(<StatusBadge status={Status.DRAFT} styles={{}} />);
    expect(screen.getAllByText('Draft')).toHaveLength(2);
  });
  it('render WAITING_FOR_APPROVAL', async () => {
    render(<StatusBadge status={Status.WAITING_FOR_APPROVAL} styles={{}} />);
    expect(screen.getAllByText('Waiting for approval')).toHaveLength(2);
  });
  it('render APPROVED', async () => {
    render(<StatusBadge status={Status.APPROVED} styles={{}} />);
    expect(screen.getAllByText('Approved')).toHaveLength(2);
  });
  it('render DECLINED', async () => {
    render(<StatusBadge status={Status.DECLINED} styles={{}} />);
    expect(screen.getAllByText('Declined')).toHaveLength(2);
  });
});
