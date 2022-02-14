// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';

import Widgets from './Widgets';
// @ts-ignore
import { Status, ReviewType } from 'config/enum';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('<Widgets />', () => {
  const timeline = {
    timeline: {
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      success: true,
      data: [
        {
          uuid: '69c04b72-5641-e18d-d6c6-40af176fc9bc',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
          code: 'OBJECTIVE',
          description: 'Objectives',
          type: 'REVIEW',
          startTime: '2021-04-01T00:00:00.000Z',
          endTime: null,
          properties: {
            mapJson: {
              pm_review_type: 'objective',
              pm_review_before_start: 'P2W',
              pm_type: 'review',
              pm_review_start_time: '2021-04-01',
              pm_review_min: '3',
              pm_review_before_end: 'P1W',
              pm_review_max: '3',
              pm_review_duration: 'P2W',
              pm_form_key: 'forms/type_2_objective.form',
            },
          },
          status: 'DRAFT',
          reviewType: 'OBJECTIVE',
          count: 1,
          lastUpdatedTime: '2022-02-04T13:32:03.628Z',
        },
        {
          uuid: 'abfe56d7-7389-b03e-c901-c6df4825545f',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
          code: 'MYR',
          description: 'Mid Year Review',
          type: 'REVIEW',
          startTime: '2021-10-01T00:00:00.000Z',
          endTime: null,
          properties: {
            mapJson: {
              pm_review_start_delay: 'P6M',
              pm_review_type: 'myr',
              pm_review_before_start: 'P2W',
              pm_type: 'review',
              pm_review_start_time: '2021-10-01',
              pm_review_min: '1',
              pm_review_before_end: 'P1W',
              pm_review_max: '1',
              pm_review_duration: 'P2W',
              pm_form_key: 'forms/type_1_myr.form',
            },
          },
          status: 'NOT_STARTED',
          reviewType: 'MYR',
          count: null,
          lastUpdatedTime: '2022-01-17T07:30:06.029Z',
        },
        {
          uuid: 'c313aa51-e281-be7f-704e-fc21c5e26c6d',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
          code: 'EYR',
          description: 'End of Year Review',
          type: 'REVIEW',
          startTime: '2022-03-15T00:00:00.000Z',
          endTime: null,
          properties: {
            mapJson: {
              pm_review_start_delay: 'P1Y',
              pm_review_type: 'eyr',
              pm_review_before_start: 'P2W',
              pm_type: 'review',
              pm_review_start_time: '2022-03-15',
              pm_review_min: '1',
              pm_review_before_end: 'P1W',
              pm_review_max: '1',
              pm_review_duration: 'P2W',
              pm_form_key: 'forms/type_1_eyr.form',
            },
          },
          status: 'STARTED',
          reviewType: 'EYR',
          count: 0,
          lastUpdatedTime: '2022-01-27T15:42:04.649Z',
        },
      ],
    },
  };
  describe('#render', () => {
    it('should render', async () => {
      render(<Widgets />, { timeline });

      expect(screen.getByText('Personal Development Plan')).toBeInTheDocument();
      expect(screen.getByText('Feedback')).toBeInTheDocument();
      expect(screen.getByText('My Notes')).toBeInTheDocument();
    });
    it('Widgets click pdp', () => {
      render(<Widgets />, { timeline });

      fireEvent.click(screen.getByText('Personal Development Plan'));
      expect(mockedUsedNavigate).toBeCalledWith('/personal-development-plan');
    });
    it('Widgets click Feedback', () => {
      render(<Widgets />, { timeline });

      fireEvent.click(screen.getByText('Feedback'));
      expect(mockedUsedNavigate).toBeCalledWith('/feedback');
    });
    it('Widgets click My Notes', () => {
      render(<Widgets />, { timeline });

      fireEvent.click(screen.getByText('My Notes'));
      expect(mockedUsedNavigate).toBeCalledWith('/notes');
    });
  });
});
