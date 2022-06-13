import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { renderWithTheme as render } from 'utils/test';
import FeedbackInfo, { INFO_WRAPPER, TONE_VOICE } from './FeedbackInfo';
import { fireEvent } from '@testing-library/react';

describe('Feedback info', () => {
  const onClickMore = jest.fn();
  const props = {
    selectedPerson: {
      colleague: {
        colleagueUUID: 'f12a6a7c-f227-412c-a797-68d48e378b63',
        profile: {
          firstName: 'Vitalii',
          lastName: 'Huz',
        },
      },
      profileAttributes: null,
    },
    onClickMore,
  };
  it('it should render feedback info wrapper', async () => {
    const { getByTestId } = render(<FeedbackInfo {...props} />);
    const wrapper = getByTestId(INFO_WRAPPER);
    expect(wrapper).toBeInTheDocument();
  });
  it('it should render propper tone of voice', async () => {
    const { getByTestId } = render(<FeedbackInfo {...props} />);
    const voice = getByTestId(TONE_VOICE);
    expect(voice.textContent).toEqual('I prefer feedback that is: Direct and simple');
  });
  it('it should call onClickMore handler', async () => {
    const { getByRole } = render(<FeedbackInfo {...props} />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClickMore).toHaveBeenCalledTimes(1);
  });
});
