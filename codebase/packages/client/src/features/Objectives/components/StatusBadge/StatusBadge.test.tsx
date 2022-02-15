import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';

import StatusBadge from './StatusBadge';
import { Status } from 'config/enum';

describe('<StatusBadge/>', () => {
  it('render DRAFT', async () => {
    render(<StatusBadge status={Status.DRAFT} styles={{}} />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Round Pencil')).toBeInTheDocument();
  });
  it('render WAITING_FOR_APPROVAL', async () => {
    render(<StatusBadge status={Status.WAITING_FOR_APPROVAL} styles={{}} />);
    expect(screen.getByText('Waiting for approval')).toBeInTheDocument();
    expect(screen.getByText('Round Clock')).toBeInTheDocument();
  });
  it('render APPROVED', async () => {
    render(<StatusBadge status={Status.APPROVED} styles={{}} />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Round Tick')).toBeInTheDocument();
  });
  it('render DECLINED', async () => {
    render(<StatusBadge status={Status.DECLINED} styles={{}} />);
    expect(screen.getByText('Declined')).toBeInTheDocument();
    expect(screen.getByText('Round Alert')).toBeInTheDocument();
  });
});
