import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import DraftItem, { TEST_QUESTION_ITEM } from './DraftItem';

jest.mock('@pma/pdf-renderer', () => {
  return {
    __esModule: true,
    usePDF: () => {
      return ['mock', () => true];
    },
  };
});

describe('DraftItem component', () => {
  const props = {
    item: {
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
      ],
      firstName: 'Mykhailo',
      jobName: 'Manager',
      lastName: 'Bespalko',
      read: false,
      targetId: 'target-id',
      targetType: 'target-type',
      updatedTime: '3 days ago',
      uuid: '3efbfb04-bd2c-406d-b2cd-81fe8d2d59c0',
    },
  };

  it('it should render draft wrapper', async () => {
    const { getAllByTestId } = render(<DraftItem {...props} />);
    const wrapper = getAllByTestId('tile-wrapper');
    expect(wrapper[0]).toBeInTheDocument();
  });

  it('it should render propper feedback length', async () => {
    const { getAllByTestId } = render(<DraftItem {...props} />);
    const feedbacks = getAllByTestId('tile-wrapper');
    expect(feedbacks.length).toEqual(2);
  });

  it('it should render question', async () => {
    const { queryAllByText } = render(<DraftItem {...props} />);

    const question = queryAllByText(props.item.feedbackItems[0].question)[0];
    expect(question).toBeInTheDocument();
  });

  it('it should render content', async () => {
    const { queryAllByText } = render(<DraftItem {...props} />);

    const content = queryAllByText(props.item.feedbackItems[0].content)[0];
    expect(content).toBeInTheDocument();
  });

  it('it should render feedbackItem', async () => {
    const { queryAllByTestId } = render(<DraftItem {...props} />);

    const feedbackItem = queryAllByTestId(TEST_QUESTION_ITEM)[0];
    expect(feedbackItem).toBeInTheDocument();
  });
});
