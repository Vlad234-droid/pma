import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import TriggerModal from './TriggerModal';
import { renderWithTheme as render, screen } from 'utils/test';

describe('<TriggerModal />', () => {
  it('TriggerModal submit', async () => {
    const childClick = jest.fn();
    const title = 'title trigger modal';
    render(
      <TriggerModal title={title} triggerComponent={<div data-test-id='triggerComponent'>triggerComponent</div>}>
        <button data-test-id='submit' onClick={childClick}>
          submit
        </button>
      </TriggerModal>,
    );
    expect(screen.getByTestId('triggerComponent')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('triggerComponent'));

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByTestId('submit')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submit'));

    expect(childClick).toBeCalled();
  });
});
