import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import DraftList, { WRAPPER } from './DraftList';

jest.mock('@pma/pdf-renderer', () => {
  return {
    __esModule: true,
    usePDF: () => {
      return ['mock', () => true];
    },
  };
});

describe('DraftList component', () => {
  const onChange = jest.fn();
  const props = {
    items: [
      {
        colleagueProfile: {
          colleague: {
            colleagueUUID: 'fce3a700-3575-4510-a6e4-8198a961aae9',
            profile: {
              dateOfBirth: null,
              firstName: 'Mykhailo',
              gender: null,
              lastName: 'Bespalko',
              middleName: null,
              title: null,
            },
          },
          profileAttributes: null,
        },
        colleagueUuid: 'fce3a700-3575-4510-a6e4-8198a961aae9',
        createdTime: '2022-03-24T12:42:16.926Z',
        departmentName: 'Technology - Service IN',
        feedbackItems: [
          {
            code: 'Question 1',
            content: 'feedback',
            feedbackUuid: '3efbfb04-bd2c-406d-b2cd-81fe8d2d59c0',
            question:
              "Looking back at what you've seen recently, what would you like to say to this colleague about what they've delivered or how they've gone about it?",
            uuid: 'fef33c06-fc48-4eed-b99d-8e1250416eea',
          },
          {
            code: 'Question 2',
            content: 'feedback',
            feedbackUuid: '3efbfb04-bd2c-406d-b2cd-81fe8d2d59c0',
            question: 'Looking forward, what should this colleague do more (or less) of in order to be at their best?',
            uuid: 'ef427ee0-4b59-42c5-b6fd-d411e5f1137d',
          },
          {
            code: 'Anything else?',
            content: '',
            feedbackUuid: '3efbfb04-bd2c-406d-b2cd-81fe8d2d59c0',
            question: 'Add any other comments you would like to share with your colleague.',
            uuid: '921413bf-e0f2-4aed-8321-18dfdd063c9d',
          },
        ],
        firstName: 'Mykhailo',
        jobName: 'Manager',
        lastName: 'Bespalko',
        read: false,
        status: 'SUBMITTED',
        targetColleagueUuid: '15818570-cd6b-4957-8a82-3d34dcb0b077',
        targetId: null,
        targetType: null,
        updatedTime: '3 days ago',
        uuid: '3efbfb04-bd2c-406d-b2cd-81fe8d2d59c0',
        targetColleagueProfile: {
          profileAttributes: null,
          colleague: {
            colleagueUUID: '15818570-cd6b-4957-8a82-3d34dcb0b077',
            profile: {
              dateOfBirth: null,
              firstName: 'Vladyslav',
              gender: null,
              lastName: 'Baryshpolets',
              middleName: null,
              title: null,
            },
          },
        },
      },
    ],
    selectable: true,
    downloadable: true,
    uniqueSelect: false,
    uncheck: false,
    onChange,
  };
  it('it should render list wrapper', async () => {
    const { getAllByTestId } = render(<DraftList {...props} />);
    const wrapper = getAllByTestId(WRAPPER);
    expect(wrapper[0]).toBeInTheDocument();
  });
  it('it should render checkboxes', async () => {
    const { getByTestId } = render(<DraftList {...props} />);
    const checkboxes = getByTestId('checkboxes');
    expect(checkboxes).toBeInTheDocument();
  });
  it('it should call onChange handler', async () => {
    render(<DraftList {...props} />);
    expect(onChange).toHaveBeenCalled();
  });
  it('it should render loader', async () => {
    const { getByTestId } = render(<DraftList {...props} />, { feedback: { feedbacks: { meta: { loaded: false } } } });
    const empty = getByTestId('empty');
    expect(empty).toBeInTheDocument();
  });
});
