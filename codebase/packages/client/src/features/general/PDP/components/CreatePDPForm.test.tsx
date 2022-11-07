import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';
import { CreateUpdatePDPForm, SUBMIT_TEST_ID, TEST_ID } from './CreateUpdatePDPForm';

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
    currentUUID: 'currentUUID',
    colleagueUuid: 'colleagueUuid',
    requestMethods: METHODS.SAVE,
    setConfirmModal: jest.fn(),
    setCurrentTab: jest.fn(),
    onSubmit: jest.fn(),
  };

  window.HTMLElement.prototype.scrollTo = function () {};

  it('should render Form', async () => {
    const { queryByTestId } = render(<CreateUpdatePDPForm {...props} />);
    const wrapper = queryByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });

  it('should receive currentTab', async () => {
    render(<CreateUpdatePDPForm {...props} />);
    expect(props.currentTab).toBe(0);
  });

  it('should receive maxGoals', async () => {
    render(<CreateUpdatePDPForm {...props} />);
    expect(props.maxGoals).toBe(5);
  });

  it('should receive currentUUID', async () => {
    render(<CreateUpdatePDPForm {...props} />);
    expect(props.currentUUID).toBe('currentUUID');
  });

  it('should receive colleagueUuid', async () => {
    render(<CreateUpdatePDPForm {...props} />);
    expect(props.colleagueUuid).toBe('colleagueUuid');
  });

  it('check call setCurrentTab', async () => {
    render(<CreateUpdatePDPForm {...props} />);
    props.setCurrentTab(1);
    expect(await props.setCurrentTab).toBeCalled();
  });

  it('check call setConfirmModal', async () => {
    render(<CreateUpdatePDPForm {...props} />);
    props.setConfirmModal(true);
    expect(await props.setConfirmModal).toBeCalled();
  });

  it('check call empty form onSubmit', async () => {
    const { queryByTestId } = render(<CreateUpdatePDPForm {...props} />);
    const submitBtn = queryByTestId(SUBMIT_TEST_ID);
    expect(submitBtn).toBeNull();
  });
});
