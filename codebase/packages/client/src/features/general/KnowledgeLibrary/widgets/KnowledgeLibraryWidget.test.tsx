import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme } from 'utils/test';
import KnowledgeLibraryWidget from './KnowledgeLibraryWidget';
import { TEST_ID } from '../components/List/List';

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe('Widget', () => {
  const state = {
    knowledgeLibrary: {
      data: {
        'mastering-feedback': '',
        'strategic-objectives':
          'https://colleague-help.ourtesco.com/hc/en-us/articles/4417164321428-Strategic-objectives',
        'system-guidance-and-faqs':
          'https://colleague-help.ourtesco.com/hc/en-us/articles/4417358220820-System-guides-learning-and-help',
        'everyones-welcome': 'https://www.ourtesco.com/diversity-and-inclusion/',
        'your-contribution':
          'https://colleague-help.ourtesco.com/hc/en-us/articles/4410479364500-Introducing-Your-Contribution',
        'opportunities-to-get-on':
          'https://colleague-help.ourtesco.com/hc/en-us/sections/4405652305812-Opportunities-to-Get-On-UK-Colleagues-',
        'feedback-at-tesco': 'https://colleague-help.ourtesco.com/hc/en-us/articles/4417160813844-Everyday-feedback',
        'being-an-inclusive-manager': 'https://learningattesco.learningpool.com/course/view.php?id=1622',
        'performance-reviews':
          'https://colleague-help.ourtesco.com/hc/en-us/articles/4417350679956-Performance-reviews',
        'our-purpose-and-strategic-pillars': 'https://www.ourtesco.com/colleague/our-purpose',
        'our-win-together-behaviours':
          'https://colleague-help.ourtesco.com/hc/en-us/articles/4417164337812-Our-Win-Together-behaviours',
        'creating-a-winning-performance-culture': '',
        'managing-a-team-at-tesco': 'https://learningattesco.learningpool.com/course/view.php?id=1212',
        'everyday-conversations':
          'https://colleague-help.ourtesco.com/hc/en-us/articles/4417350618900-Everyday-conversations',
        'managing-underperformance': '',
        'mastering-conversations': 'https://learningattesco.learningpool.com/course/view.php?id=1529',
        'further-learning-for-managers': 'https://learningattesco.learningpool.com/course/view.php?id=1252',
      },
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      success: true,
    },
  };
  it('#render', async () => {
    const { getByTestId } = renderWithTheme(<KnowledgeLibraryWidget />, { ...state });
    const wrapper = getByTestId(TEST_ID);

    expect(wrapper).toBeInTheDocument();
  });
});
