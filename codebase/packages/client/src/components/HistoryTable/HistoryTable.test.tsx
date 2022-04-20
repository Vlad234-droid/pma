import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import HistoryTable, { TEST_ID } from './HistoryTable';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('PDP Form', () => {
  const props = {
    headers: ['Header 1', 'Header 2', 'Header 3'],
    items: ['Item 1', 'Item 2', 'Item 3'],
    isVisible: true,
  };

  window.HTMLElement.prototype.scrollTo = function () {};

  it('should render Form', async () => {
    const { queryByTestId } = render(<Form {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should receive currentTab', async () => {
    render(<Form {...props} />);
    expect(props.currentTab).toBe(0);
  });

  it('should receive maxGoals', async () => {
    render(<Form {...props} />);
    expect(props.maxGoals).toBe(5);
  });

  it('should receive currentUUID', async () => {
    render(<Form {...props} />);
    expect(props.currentUUID).toBe('currentUUID');
  });

  it('should receive colleagueUuid', async () => {
    render(<Form {...props} />);
    expect(props.colleagueUuid).toBe('colleagueUuid');
  });

  it('check call setCurrentTab', async () => {
    render(<Form {...props} />);
    props.setCurrentTab(1);
    expect(await props.setCurrentTab).toBeCalled();
  });

  it('check call setConfirmModal', async () => {
    render(<Form {...props} />);
    props.setConfirmModal(true);
    expect(await props.setConfirmModal).toBeCalled();
  });

  it('check call empty form onSubmit', async () => {
    const { queryByTestId } = render(<Form {...props} />);
    const submitBtn = queryByTestId(SUBMIT_TEST_ID);
    expect(submitBtn).toBeNull();
  });
});
