import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import Form, { SUBMIT_TEST_ID, TEST_ID } from './CreatePDPForm';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('PDP Form', () => {
  enum METHODS {
    SAVE = 'save',
    UPDATE = 'update',
    CREATE = 'create',
  }

  const props = {
    pdpGoals: [],
    pdpList: [],
    currentTab: 0,
    currentGoal: {},
    formElements: [],
    confirmSaveModal: false,
    maxGoals: 5,
    goalNum: 5,
    currentUUID: 'currentUUID',
    colleagueUuid: 'colleagueUuid',
    requestMethods: METHODS.SAVE,
    setConfirmModal: jest.fn(),
    setCurrentTab: jest.fn(),
    setCurrentGoal: jest.fn(),
    onSubmit: jest.fn(),
  };

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

  it('should receive goalNum', async () => {
    render(<Form {...props} />);
    expect(props.goalNum).toBe(5);
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

  it('check call setCurrentGoal', async () => {
    render(<Form {...props} />);
    props.setCurrentGoal({});
    expect(await props.setCurrentGoal).toBeCalled();
  });

  it('check call empty form onSubmit', async () => {
    const { queryByTestId } = render(<Form {...props} />);
    const submitBtn = queryByTestId(SUBMIT_TEST_ID);
    expect(submitBtn).toBeNull();
  });
});
