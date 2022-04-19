import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'utils/test';
import TipsForm, {
  TIPS_FORM,
  TIPS_FORM_SUBMIT_BTN,
  TIPS_FORM_DISCARD_BTN,
  TIPS_FORM_MODAL_PLACEHOLDER,
} from './TipsForm';
import { TIPS_FORM_MODAL, TIPS_FORM_MODAL_SUBMIT_BTN } from './TipsFormModal';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Tips form', () => {
  const props = {
    configEntries: {
      data: [
        {
          uuid: '10000000-0000-0000-0001-000000000002',
          name: 'UK',
          type: {
            id: 1,
            code: 'l1',
            description: 'Level 1',
          },
          version: 1,
          root: true,
          compositeKey: 'l1/uk/#v1',
          children: [
            {
              uuid: '10000000-0000-0000-0002-000000000002',
              name: 'Head Office',
              type: {
                id: 2,
                code: 'l2',
                description: 'Level 2',
              },
              version: 1,
              root: false,
              compositeKey: 'l1/uk/l2/ho/#v1',
              children: [
                {
                  uuid: '10000000-0000-0000-0003-000000000002',
                  name: 'Salaried',
                  type: {
                    id: 3,
                    code: 'l3',
                    description: 'Level 3',
                  },
                  version: 1,
                  root: false,
                  compositeKey: 'l1/uk/l2/ho/l3/salaried/#v1',
                  children: [
                    {
                      uuid: '10000000-0000-0000-0004-000000000004',
                      name: 'WL1',
                      type: {
                        id: 4,
                        code: 'l4',
                        description: 'Level 4',
                      },
                      version: 1,
                      root: false,
                      compositeKey: 'l1/uk/l2/ho/l3/salaried/l4/wl1/#v1',
                      children: [],
                    },
                    {
                      uuid: '10000000-0000-0000-0004-000000000005',
                      name: 'WL2',
                      type: {
                        id: 4,
                        code: 'l4',
                        description: 'Level 4',
                      },
                      version: 1,
                      root: false,
                      compositeKey: 'l1/uk/l2/ho/l3/salaried/l4/wl2/#v1',
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      success: true,
    },
    tips: {
      tipsList: [],
      viewHistory: [],
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      currentTip: {},
    },
  };
  it('should render create form', async () => {
    const { getByTestId, getByText } = renderWithTheme(<TipsForm mode={'create'} />, { ...props });
    const tipsForm = getByTestId(TIPS_FORM);
    const buttonText = 'Create new tip';

    expect(tipsForm).toBeInTheDocument();
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('should render edit form', async () => {
    const newProps = {
      ...props,
      tips: {
        ...props.tips,
        currentTip: {
          uuid: 'fb947807-64f8-42d8-8a58-6d3587d9e4eb',
          version: 6,
          key: '/0.30518',
          title: 'Do you know?',
          description: 'Some description 2',
          targetOrganisation: {
            uuid: '10000000-0000-0000-0004-000000000004',
            name: 'WL1',
            type: null,
            version: 0,
            parentUuid: null,
            compositeKey: 'l1/uk/l2/ho/l3/salaried/l4/wl1/#v1',
          },
          imageLink: 'https://cdn-icons-png.flaticon.com/512/189/189667.png',
          published: false,
          createdTime: '2022-01-04T14:03:29.660Z',
          updatedTime: '2022-01-19T15:27:13.325Z',
        },
      },
    };
    const { getByTestId, getByText } = renderWithTheme(<TipsForm mode={'edit'} />, { ...newProps });
    const tipsForm = getByTestId(TIPS_FORM);
    const buttonText = 'Confirm changes';

    expect(tipsForm).toBeInTheDocument();
    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('should render discard modal', async () => {
    const { getByTestId, queryByTestId } = renderWithTheme(<TipsForm mode={'create'} />, { ...props });
    const tipsForm = getByTestId(TIPS_FORM);
    const input = getByTestId('tipTitle');
    const tipsFormModal = queryByTestId(TIPS_FORM_MODAL);

    expect(tipsForm).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(tipsFormModal).toBeNull();
    expect(input['value']).toBe('');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'Test' } });
    });

    expect(input['value']).toBe('Test');

    const discardBtn = getByTestId(TIPS_FORM_DISCARD_BTN);

    await act(async () => {
      fireEvent.click(discardBtn);
    });

    expect(getByTestId(TIPS_FORM_MODAL)).toBeInTheDocument();
  });

  it('should create new tip', async () => {
    const { getByTestId, queryByTestId, findByTestId, findByText } = renderWithTheme(<TipsForm mode={'create'} />, {
      ...props,
    });
    const tipsForm = getByTestId(TIPS_FORM);
    const submitBtn = getByTestId(TIPS_FORM_SUBMIT_BTN);

    expect(tipsForm).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('aria-disabled', 'true');
    expect(queryByTestId(TIPS_FORM_MODAL_PLACEHOLDER)).toBeNull();
    expect(getByTestId('tipTitle')).toBeInTheDocument();
    expect(getByTestId('tipDescription')).toBeInTheDocument();
    expect(getByTestId('tipTargetLevel1')).toBeInTheDocument();
    expect(getByTestId('tipTitle')['value']).toBe('');
    expect(getByTestId('tipDescription')['value']).toBe('');
    expect(getByTestId('tipTargetLevel1')['value']).toBe('');

    await act(async () => {
      fireEvent.change(getByTestId('tipTitle'), { target: { value: 'Tips test title' } });
      fireEvent.change(getByTestId('tipDescription'), { target: { value: 'Test tip description' } });
    });

    fireEvent.click(getByTestId('tipTargetLevel1'));
    expect(await findByTestId('tipTargetLevel1-list')).not.toBeNull();
    fireEvent.click(await findByText('UK'));

    expect(getByTestId('tipTitle')['value']).toBe('Tips test title');
    expect(getByTestId('tipDescription')['value']).toBe('Test tip description');
    expect(await findByTestId(TIPS_FORM_SUBMIT_BTN)).not.toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(await findByTestId(TIPS_FORM_SUBMIT_BTN));

    expect(await findByTestId(TIPS_FORM_MODAL_PLACEHOLDER)).toBeInTheDocument();
  });

  it('should edit tip', async () => {
    const newProps = {
      ...props,
      tips: {
        ...props.tips,
        currentTip: {
          uuid: '01a9c6b9-4973-48a4-9ec1-8275fd5834ad',
          version: 7,
          key: '/0.30518',
          title: 'Do you know?',
          description: 'Some description 2',
          targetOrganisation: {
            uuid: '10000000-0000-0000-0001-000000000002',
            name: 'UK',
            type: null,
            version: 0,
            parentUuid: null,
            compositeKey: 'l1/uk/#v1',
          },
          imageLink: 'https://cdn-icons-png.flaticon.com/512/189/189667.png',
          published: false,
          createdTime: '2022-01-04T14:03:29.660Z',
          updatedTime: '2022-04-12T15:53:56.542Z',
        },
      },
    };
    const { getByTestId, queryByTestId, findByTestId, findByText } = renderWithTheme(<TipsForm mode={'edit'} />, {
      ...newProps,
    });
    const tipsForm = getByTestId(TIPS_FORM);
    const submitBtn = getByTestId(TIPS_FORM_SUBMIT_BTN);
    const tipTitle = getByTestId('tipTitle');
    const tipDescription = getByTestId('tipDescription');
    const tipTargetLevel1 = getByTestId('tipTargetLevel1');

    expect(tipsForm).toBeInTheDocument();
    expect(submitBtn).toHaveAttribute('aria-disabled', 'true');
    expect(queryByTestId(TIPS_FORM_MODAL_PLACEHOLDER)).toBeNull();
    expect(tipTitle).toBeInTheDocument();
    expect(tipDescription).toBeInTheDocument();
    expect(tipTargetLevel1).toBeInTheDocument();

    expect(await findByTestId('tipTitle')).toHaveDisplayValue('Do you know?');
    expect(await findByTestId('tipDescription')).toHaveDisplayValue('Some description 2');
    expect(await findByText('UK')).toBeInTheDocument();

    fireEvent.change(getByTestId('tipTitle'), { target: { value: 'Tips test title' } });
    expect(await findByTestId('tipTitle')).toHaveDisplayValue('Tips test title');

    expect(await findByTestId(TIPS_FORM_SUBMIT_BTN)).not.toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(await findByTestId(TIPS_FORM_SUBMIT_BTN));

    expect(await findByTestId(TIPS_FORM_MODAL_PLACEHOLDER)).toBeInTheDocument();
  });

  it('should delete tip', async () => {
    const newProps = {
      ...props,
      tips: {
        ...props.tips,
        currentTip: {
          uuid: '01a9c6b9-4973-48a4-9ec1-8275fd5834ad',
          version: 7,
          key: '/0.30518',
          title: 'Do you know?',
          description: 'Some description 2',
          targetOrganisation: {
            uuid: '10000000-0000-0000-0001-000000000002',
            name: 'UK',
            type: null,
            version: 0,
            parentUuid: null,
            compositeKey: 'l1/uk/#v1',
          },
          imageLink: 'https://cdn-icons-png.flaticon.com/512/189/189667.png',
          published: false,
          createdTime: '2022-01-04T14:03:29.660Z',
          updatedTime: '2022-04-12T15:53:56.542Z',
        },
      },
    };
    const { getByTestId, findByTestId, findByText } = renderWithTheme(<TipsForm mode={'edit'} />, { ...newProps });
    const tipsForm = getByTestId(TIPS_FORM);

    expect(tipsForm).toBeInTheDocument();
    expect(await findByText('Delete this tip')).toBeInTheDocument();

    fireEvent.click(await findByText('Delete this tip'));

    expect(await findByTestId(TIPS_FORM_MODAL_SUBMIT_BTN)).toBeInTheDocument();

    fireEvent.click(await findByTestId(TIPS_FORM_MODAL_SUBMIT_BTN));

    expect(await findByTestId(TIPS_FORM_MODAL_PLACEHOLDER)).toBeInTheDocument();
  });
});
