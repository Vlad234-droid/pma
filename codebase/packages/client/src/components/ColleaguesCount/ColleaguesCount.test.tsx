import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render } from 'utils/test';
import { ColleaguesCount, TEST_ID } from './ColleaguesCount';

describe('Colleagues count component', () => {
  const props = {
    countStyles: {},
    count: 10,
    title: 'title',
  };
  it('it should display a plug wrapper', async () => {
    const { getByTestId } = render(<ColleaguesCount {...props} />);
    const wrapper = getByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should display colleagues amount', async () => {
    const { getByText } = render(<ColleaguesCount {...props} />);
    const amount = getByText(props.count);
    expect(amount.textContent).toEqual(props.count.toString());
  });
  it('it should display Colleagues title', async () => {
    const { getByText } = render(<ColleaguesCount {...props} />);
    const title = getByText(props.title);
    expect(title).toBeInTheDocument();
  });
});
