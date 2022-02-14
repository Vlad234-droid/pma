// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent } from '@testing-library/react';

import { Colleague } from './Colleague';
// @ts-ignore
import { Status } from 'config/enum';
import { ReviewsActions, SchemaActions } from '@pma/store';

describe('<Colleague />', () => {
  const props = {
    status: Status.WAITING_FOR_APPROVAL,
    colleague: {
      uuid: '10000000-0000-0000-0000-000000000003',
      firstName: 'Alex',
      middleName: null,
      lastName: 'Smith',
      jobName: 'Customer Assistant',
      businessType: 'Store',
      lineManager: { businessType: 'Store', firstName: 'William' },
      reviews: [
        {
          uuid: 'reviews_uuid_mock',
          type: 'EYR',
          status: 'WAITING_FOR_APPROVAL',
          number: 1,
        },
      ],
      timeline: [
        {
          uuid: '278e6e31-5555-53bf-450e-780edbcf21f9',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
          code: 'EYR',
          description: 'End of Year Review',
          type: 'REVIEW',
          startTime: '2021-04-01T00:00:00.000Z',
          endTime: null,
          properties: {
            mapJson: {
              pm_review_type: 'objective',
            },
          },
          status: 'WAITING_FOR_APPROVAL',
          reviewType: 'EYR',
          count: 1,
          lastUpdatedTime: '2022-02-11T12:17:43.507Z',
        },
      ],
    },
    colleagueExpanded: '',
    setColleagueExpanded: jest.fn(),
  };
  describe('#render', () => {
    it('should render ', () => {
      render(<Colleague {...props} />);

      expect(screen.getByTestId(`expand-button-${props.colleague.uuid}`)).toBeInTheDocument();
      expect(screen.getByText('Alex Smith')).toBeInTheDocument();
    });

    it('should render open panel', async () => {
      const clearSchemaDataMock = jest.spyOn(SchemaActions, 'clearSchemaData');
      const getColleagueReviewsMock = jest.spyOn(ReviewsActions, 'getColleagueReviews');
      const getSchemaMock = jest.spyOn(SchemaActions, 'getSchema');
      render(<Colleague {...props} />);
      fireEvent.click(screen.getByRole('heading'));

      expect(props.setColleagueExpanded).toBeCalled();
      expect(clearSchemaDataMock).toBeCalled();
      expect(getSchemaMock).toBeCalledWith({ colleagueUuid: '10000000-0000-0000-0000-000000000003' });
      expect(getColleagueReviewsMock).toBeCalledWith({
        pathParams: { colleagueUuid: '10000000-0000-0000-0000-000000000003', cycleUuid: 'CURRENT' },
      });
    });
  });
});
