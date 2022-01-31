// @ts-ignore
import React from 'react';
import { fireEvent } from '@testing-library/react';
// @ts-ignore
import { renderWithTheme as render, generateEmployeeReview } from 'utils/test';

import Calibration from './Calibration';

jest.mock('../Colleagues', () => {
  return {
    __esModule: true,
    default: ({ onSave }) => {
      return <div onClick={onSave}>mocked_colleagues</div>;
    },
  };
});

describe('<Calibration />', () => {
  const filterOptions = [{
    options: ['11', '12', '13'],
    title: 'mocked_option_title_1',
    multi: true,
    id: 'mocked_id_1',
  }, {
    options: ['21', '22', '23'],
    title: 'mocked_option_title_2',
    multi: false,
    id: 'mocked_id_2',
  }];
  const props = {
    colleagueUuid: 'mocked_uuid',
    loadData: jest.fn(),
    loadFilterOptions: jest.fn(),
    colleagues: [],
    filterOptions: filterOptions,
  };

  describe('#render', () => {
    it('should render filters', () => {
      const { getByTestId, getByText } = render(<Calibration {...props} />);

      expect(getByTestId('filters')).toBeInTheDocument();
      expect(getByTestId('filtering-wrapper')).toBeInTheDocument();
      expect(getByTestId('search-wrapper')).toBeInTheDocument();
      expect(getByText('11')).toBeInTheDocument();
      expect(getByText('12')).toBeInTheDocument();
      expect(getByText('13')).toBeInTheDocument();
      expect(getByText('21')).toBeInTheDocument();
      expect(getByText('22')).toBeInTheDocument();
      expect(getByText('23')).toBeInTheDocument();
    });

    it('should render graph', () => {
      const { getByTestId } = render(<Calibration {...props} />);

      expect(getByTestId('calibration-graph')).toBeInTheDocument();
    });

    it('should render no results, if no items in props.colleagues', () => {
      const { getByText } = render(<Calibration {...props} />);

      expect(getByText('No results')).toBeInTheDocument();
    });

    it('should render colleagues, if they are provided in props.colleagues', () => {
      const newProps = {
        ...props,
        colleagues: [generateEmployeeReview()]
      };

      const { getByText } = render(<Calibration {...newProps} />);
      expect(getByText('mocked_colleagues')).toBeInTheDocument();
    });

    it('should render widgets', () => {
      const { getByText } = render(<Calibration {...props} />);

      expect(getByText('Edit calibration ratings')).toBeInTheDocument();
      expect(getByText('Enter your team`s ratings to see live updates')).toBeInTheDocument();
      expect(getByText('Compare to expected distribution or previous years')).toBeInTheDocument();
      expect(getByText('Save calibration ratings to your device')).toBeInTheDocument();
    });
  });

  describe('#handlers', () => {
    it('should call props.loadData, if props.colleagueUuid', () => {
      render(<Calibration {...props} />);

      expect(props.loadData).toHaveBeenCalled();
    });

    it('should not call props.loadData, if !props.colleagueUuid', () => {
      const newProps = {
        ...props,
        colleagueUuid: undefined,
      };

      render(<Calibration {...newProps} />);

      expect(props.loadData).not.toHaveBeenCalled();
    });

    it('should call loadFilterOptions', () => {
      render(<Calibration {...props} />);

      expect(props.loadFilterOptions).toHaveBeenCalled();
    });

    it('call props.loadData with applied filters on filter changes', () => {
      const { getByTestId, getByText } = render(<Calibration {...props} />);

      fireEvent.click(getByText('11'));
      fireEvent.click(getByText('12'));
      fireEvent.click(getByText('23'));
      fireEvent.click(getByTestId('filter'));

      expect(props.loadData).toHaveBeenCalledWith({ mocked_id_1: { 11: true, 12: true }, mocked_id_2: '23' });
    });

    it('should handle click on edit calibration widget', () => {
      const newProps = {
        ...props,
        colleagues: [generateEmployeeReview()]
      };

      const { getByText, getByTestId } = render(<Calibration {...newProps} />);

      fireEvent.click(getByText('Edit calibration ratings'));

      expect(getByText('Exit calibration ratings')).toBeInTheDocument();

      fireEvent.click(getByText('mocked_colleagues'));

      expect(getByTestId('success-modal')).toBeInTheDocument();
    });

    it('should handle click on compare calibration widget', () => {
      const newProps = {
        ...props,
        colleagues: [generateEmployeeReview()]
      };
      const { getByText, getByTestId, queryByTestId, queryByText } = render(<Calibration {...newProps} />);

      fireEvent.click(getByText('Compare to expected distribution or previous years'));

      expect(getByTestId('compare-modal')).toBeInTheDocument();

      fireEvent.click(getByText('Expected distribution'));
      fireEvent.click(getByText('Compare'));

      expect(queryByTestId('compare-modal')).not.toBeInTheDocument();
      expect(queryByText('mocked_colleagues')).not.toBeInTheDocument();
      expect(queryByText('No results')).not.toBeInTheDocument();
      expect(queryByText('Edit calibration ratings')).not.toBeInTheDocument();
      expect(queryByText('Enter your team`s ratings to see live updates')).not.toBeInTheDocument();
    });
  });
});
