// @ts-ignore
import React from 'react';

// @ts-ignore
import { renderWithTheme as render, generateTimeline } from 'utils/test';
// @ts-ignore
import { TimelineType } from 'config/types';

import Timelines from './Timelines';

describe('<Timelines />', () => {
  const timeline = generateTimeline();
  const props = { employee: { timeline: [timeline, timeline], reviews: [] } };

  describe('#render', () => {
    it('should render wrapper', () => {
      // @ts-ignore
      const { getByTestId } = render(<Timelines {...props} />);

      expect(getByTestId('timelines')).toBeInTheDocument();
    });

    it('should not render timeline, if !props.timelines', () => {
      // @ts-ignore
      const { queryByTestId } = render(<Timelines employee={{ timeline: [], reviews: [] }} />);

      expect(queryByTestId('timeline')).not.toBeInTheDocument();
    });

    it('should render timeline, if props.timelines', () => {
      // @ts-ignore
      const { getAllByTestId } = render(<Timelines {...props} />);

      expect(getAllByTestId('timeline')).toHaveLength(2);
    });

    it('should render filtered timeline, if props.timelines', () => {
      const newProps = {
        employee: {
          timeline: [generateTimeline({ type: TimelineType.TIMELINE_POINT }), generateTimeline()],
        },
      };
      // @ts-ignore
      const { getAllByTestId, getByText } = render(<Timelines {...newProps} />);

      expect(getAllByTestId('timeline')).toHaveLength(1);
      expect(getByText('mocked_description')).toBeInTheDocument();
    });
  });
});
