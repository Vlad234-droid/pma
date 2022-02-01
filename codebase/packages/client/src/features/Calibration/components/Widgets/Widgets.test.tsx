// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render } from 'utils/test';

import Widgets from './Widgets';

describe('<Widgets />', () => {
  const props = {
    onEditClick: jest.fn(),
    onCompareClick: jest.fn(),
    editMode: false,
    compareMode: false,
  };

  describe('#render', () => {
    it('should render expected widgets, if !props.editMode and !props.compareMode', () => {
      const { getByText } = render(<Widgets {...props} />);

      expect(getByText('Edit calibration ratings')).toBeInTheDocument();
      expect(getByText('Enter your team`s ratings to see live updates')).toBeInTheDocument();
      expect(getByText('Compare to expected distribution or previous years')).toBeInTheDocument();
      expect(getByText('Save calibration ratings to your device')).toBeInTheDocument();
    });

    it('should render expected widgets, if props.editMode and !props.compareMode', () => {
      const newProps = {
        ...props,
        editMode: true,
      };
      const { getByText } = render(<Widgets {...newProps} />);

      expect(getByText('Exit calibration ratings')).toBeInTheDocument();
      expect(getByText('Enter your team`s ratings to see live updates')).toBeInTheDocument();
      expect(getByText('Compare to expected distribution or previous years')).toBeInTheDocument();
      expect(getByText('Save calibration ratings to your device')).toBeInTheDocument();
    });

    it('should render expected widgets, if !props.editMode and props.compareMode', () => {
      const newProps = {
        ...props,
        compareMode: true,
      };
      const { getByText, queryByText } = render(<Widgets {...newProps} />);

      expect(queryByText('Edit calibration ratings')).not.toBeInTheDocument();
      expect(queryByText('Enter your team`s ratings to see live updates')).not.toBeInTheDocument();
      expect(getByText('Compare to expected distribution or previous years')).toBeInTheDocument();
      expect(getByText('Save calibration ratings to your device')).toBeInTheDocument();
    });
  });
});
