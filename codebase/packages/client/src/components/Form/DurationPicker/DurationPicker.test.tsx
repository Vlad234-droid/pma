import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';

import { renderWithTheme as render } from 'utils/test';

import { DurationPicker, TEST_ID } from './DurationPicker';

describe('<DurationPicker />', () => {
  describe('#render', () => {
    it('should render input correctly', () => {
      const handleChange = jest.fn();

      const { getByTestId } = render(<DurationPicker value={'2'} name='mocked_name' onChange={handleChange} />);

      expect(getByTestId(TEST_ID)).toBeInTheDocument();
    });

    it('should render value', () => {
      const handleChange = jest.fn();
      const { getByDisplayValue } = render(<DurationPicker name='mocked_name' onChange={handleChange} value={'P2W'} />);

      fireEvent.focus(getByDisplayValue('2 weeks'));

      expect(getByDisplayValue('2')).toBeInTheDocument();
    });

    it('should not render dialog by default', () => {
      const handleChange = jest.fn();

      const { queryByTestId } = render(<DurationPicker name='mocked_name' onChange={handleChange} value={''} />);

      expect(queryByTestId('duration-dialog')).not.toBeInTheDocument();
    });

    it('should display dialog on input focus', () => {
      const handleChange = jest.fn();

      const { getByTestId, getByText, getByDisplayValue } = render(
        <DurationPicker name='mocked_name' onChange={handleChange} value={'P2W'} />,
      );

      fireEvent.focus(getByDisplayValue('2 weeks'));

      expect(getByTestId('duration-dialog')).toBeInTheDocument();
      expect(getByTestId('input-weeks')).toBeInTheDocument();
      expect(getByTestId('input-days')).toBeInTheDocument();
      expect(getByText('days')).toBeInTheDocument();
      expect(getByText('weeks')).toBeInTheDocument();
      expect(getByText(/done/i)).toBeInTheDocument();
    });

    it('should hide dialog on Done press', () => {
      const handleChange = jest.fn();
      const { getByDisplayValue, getByTestId, getByText, queryByTestId } = render(
        <DurationPicker name='mocked_name' onChange={handleChange} value={'P2W'} />,
      );

      fireEvent.focus(getByDisplayValue('2 weeks'));

      expect(getByTestId('duration-dialog')).toBeInTheDocument();

      fireEvent.click(getByText(/done/i));

      expect(queryByTestId('duration-dialog')).not.toBeInTheDocument();
    });

    it('should update weeks on change', async () => {
      const handleChange = jest.fn();
      const { getByDisplayValue, getByTestId } = render(
        <DurationPicker value={'P2W'} name='mocked_name' onChange={handleChange} />,
      );

      fireEvent.focus(getByDisplayValue('2 weeks'));

      fireEvent.change(getByTestId('input-weeks'), { target: { value: '3' } });
      fireEvent.change(getByTestId('input-days'), { target: { value: '4' } });
      fireEvent.click(getByTestId('button'));
      expect(handleChange).toBeCalled();
      await waitFor(() => expect(getByDisplayValue('3 weeks 4 days')).toBeInTheDocument());
    });
  });
});
