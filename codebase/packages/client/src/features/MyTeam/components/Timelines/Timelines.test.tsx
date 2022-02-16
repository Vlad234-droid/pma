// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render, generateTimeline } from 'utils/test';
// @ts-ignore
import { TimelineType } from 'config/types';

import Timelines from './Timelines';

describe('<Timelines />', () => {
  const timeline = generateTimeline();
  const props = {
    timelines: [timeline, timeline],
  };

  describe('#render', () => {
    it('should render wrapper', () => {
      const { getByTestId } = render(<Timelines />);

      expect(getByTestId('timelines')).toBeInTheDocument();
    });

    it('should not render timeline, if !props.timelines', () => {
      const { queryByTestId } = render(<Timelines />);

      expect(queryByTestId('timeline')).not.toBeInTheDocument();
    });

    it('should render timeline, if props.timelines', () => {
      const { getAllByTestId } = render(<Timelines {...props} />);

      expect(getAllByTestId('timeline')).toHaveLength(2);
    });

    it('should render filtered timeline, if props.timelines', () => {
      const newProps = {
        timelines: [generateTimeline({ type: TimelineType.TIMELINE_POINT }), generateTimeline()],
      };

      const { getAllByTestId, getByText } = render(<Timelines {...newProps} />);

      expect(getAllByTestId('timeline')).toHaveLength(1);
      expect(getByText('mocked_description')).toBeInTheDocument();
    });
  });
});
