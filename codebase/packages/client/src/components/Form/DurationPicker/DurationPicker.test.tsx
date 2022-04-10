import React from 'react';
import { useForm } from 'react-hook-form';
import { fireEvent } from '@testing-library/react';

import { renderWithTheme as render } from 'utils/test';

import { DurationPicker } from './DurationPicker';

describe('<DurationPicker />', () => {
  describe('#render', () => {
    it('should render input correctly', () => {
      const Component = () => {
        const { control } = useForm({ defaultValues: { mocked_name: '2' }});

        return <DurationPicker control={control} name='mocked_name' />;
      };

      const { getByTestId } = render(<Component />);

      expect(getByTestId('duration-test-id')).toBeInTheDocument();
    });

    it('should render value', () => {
      const Component = () => {
        const { control } = useForm({ defaultValues: { mocked_name: '2' }});

        return <DurationPicker control={control} name='mocked_name' />;
      };

      const { getByDisplayValue } = render(<Component />);

      expect(getByDisplayValue('2')).toBeInTheDocument();
    });

    it('should not render dialog by default', () => {
      const Component = () => {
        const { control } = useForm({ defaultValues: { mocked_name: '2' }});

        return <DurationPicker control={control} name='mocked_name' />;
      };

      const { queryByTestId } = render(<Component />);

      expect(queryByTestId('duration-dialog')).not.toBeInTheDocument();
    });

    it('should display dialog on input focus', () => {
      const Component = () => {
        const { control } = useForm({ defaultValues: { mocked_name: '2' }});

        return <DurationPicker control={control} name='mocked_name' />;
      };

      const { getByTestId , getByText, getByDisplayValue } = render(<Component />);

      fireEvent.focus(getByDisplayValue('2'));

      expect(getByTestId('duration-dialog')).toBeInTheDocument();
      expect(getByTestId('input-weeks')).toBeInTheDocument();
      expect(getByTestId('input-days')).toBeInTheDocument();
      expect(getByText('days')).toBeInTheDocument();
      expect(getByText('weeks')).toBeInTheDocument();
      expect(getByText('Done')).toBeInTheDocument();
    });

    it('should hide dialog on Done press', () => {
      const Component = () => {
        const { control } = useForm({ defaultValues: { mocked_name: '2' }});

        return <DurationPicker control={control} name='mocked_name' />;
      };

      const { getByDisplayValue, getByTestId, getByText, queryByTestId } = render(<Component />);

      fireEvent.focus(getByDisplayValue('2'));

      expect(getByTestId('duration-dialog')).toBeInTheDocument();

      fireEvent.click(getByText('Done'));

      expect(queryByTestId('duration-dialog')).not.toBeInTheDocument();
    });

    it('should update weeks on change', () => {
      const Component = () => {
        const { control } = useForm({ defaultValues: { mocked_name: '2' }});

        return <DurationPicker control={control} name='mocked_name' />;
      };

      const { getByDisplayValue, getByTestId } = render(<Component />);

      fireEvent.focus(getByDisplayValue('2'));

      fireEvent.change(getByTestId('input-weeks'), { target: { value: '3' } });
      fireEvent.change(getByTestId('input-days'), { target: { value: '4' } });

      expect(getByDisplayValue('3 weeks 4 days')).toBeInTheDocument();
    });
  });
});

