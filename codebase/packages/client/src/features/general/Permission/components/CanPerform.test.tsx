import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import CanPerform from './CanPerform';
import { renderWithTheme } from 'utils/test';
import { role } from '../index';

describe('<CanPerform />', () => {
  it('should not called yes when not perform', async () => {
    const yes = jest.fn();
    renderWithTheme(<CanPerform yes={yes} perform={[role.ADMIN]} />);
    expect(yes).not.toBeCalled();
  });

  it('should called no when not perform', async () => {
    const yes = jest.fn();
    const no = jest.fn(() => <div />);
    renderWithTheme(<CanPerform yes={yes} perform={[role.ADMIN]} no={no} />);
    expect(yes).not.toBeCalled();
    expect(no).toBeCalled();
  });

  it('should not called yes when not perform', async () => {
    const yes = jest.fn(() => <div />);
    renderWithTheme(<CanPerform yes={yes} perform={[]} />);
    expect(yes).not.toBeCalled();
  });
});
