// @ts-ignore
import React from 'react';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { fireEvent, waitFor } from '@testing-library/react';

import ColleagueAction from './ColleagueAction';
// @ts-ignore
import { Status } from 'config/enum';
import { FormType, ReviewsActions, SchemaActions } from '@pma/store';
import { act } from 'react-dom/test-utils';
import { SchemaFixture } from 'utils/test/fixtures/schema';

// TODO: should update in future
describe.skip('<Colleague />', () => {
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
          tlPointUuid: 'e226a9a3-20ee-44e5-8ced-042b7fb12c46',
          type: 'MYR',
          status: 'WAITING_FOR_APPROVAL',
          number: 1,
        },
      ],
      timeline: [
        {
          uuid: 'e226a9a3-20ee-44e5-8ced-042b7fb12c46',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
          code: 'MYR',
          description: 'Mid of Year Review',
          type: 'REVIEW',
          startTime: '2021-04-01T00:00:00.000Z',
          endTime: null,
          properties: {
            pm_review_type: 'objective',
          },
          status: 'WAITING_FOR_APPROVAL',
          reviewType: 'MYR',
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
      //@ts-ignore
      render(<ColleagueAction {...props} onUpdate={jest.fn} />);

      expect(screen.getByTestId(`expand-button-${props.colleague.uuid}`)).toBeInTheDocument();
      expect(screen.getByText('Alex Smith')).toBeInTheDocument();
    });

    it('should render open panel', async () => {
      const reviews = {
        data: [
          {
            uuid: 'f5d33310-b91b-4943-acca-00814ce440b4',
            type: 'OBJECTIVE',
            status: 'APPROVED',
            number: 1,
            tlPointUuid: '3467a739-53f0-4546-b64e-c2e5dfad26c4',
            properties: {
              how_over_achieved: 'how_over_achieved',
            },
            lastUpdatedTime: '2022-03-24T07:42:59.800Z',
            changeStatusReason: null,
          },
          {
            uuid: '0a12aac4-06c4-4304-ba82-8476a64fbb34',
            type: 'OBJECTIVE',
            status: 'APPROVED',
            number: 2,
            tlPointUuid: '3467a739-53f0-4546-b64e-c2e5dfad26c4',
            properties: {
              how_over_achieved: 'how_over_achieved',
            },
            lastUpdatedTime: '2022-03-24T07:42:59.675Z',
            changeStatusReason: null,
          },
          {
            uuid: 'a8a2870f-fc00-41ca-aa71-73a6022bd7b5',
            type: 'OBJECTIVE',
            status: 'APPROVED',
            number: 3,
            tlPointUuid: '3467a739-53f0-4546-b64e-c2e5dfad26c4',
            properties: {
              how_over_achieved: 'how_over_achieved',
            },
            lastUpdatedTime: '2022-03-24T07:42:59.794Z',
            changeStatusReason: null,
          },
          {
            uuid: 'reviews_uuid_mock',
            type: 'MYR',
            status: 'WAITING_FOR_APPROVAL',
            number: 1,
            tlPointUuid: 'e226a9a3-20ee-44e5-8ced-042b7fb12c46',
            properties: {
              [FormType.TEXT_FIELD]: 'how_over_achieved',
            },
            lastUpdatedTime: '2022-03-24T09:44:08.223Z',
            changeStatusReason: null,
          },
        ],
        meta: {
          loading: false,
          loaded: true,
          error: null,
          status: null,
          updating: false,
          updated: false,
        },
      };
      const schema = new SchemaFixture().withMetadata().withForm().state;

      const clearSchemaDataMock = jest.spyOn(SchemaActions, 'clearSchemaData');
      const getColleagueReviewsMock = jest.spyOn(ReviewsActions, 'getColleagueReviews');
      const updateReviewStatusMock = jest.spyOn(ReviewsActions, 'updateReviewStatus');
      const getSchemaMock = jest.spyOn(SchemaActions, 'getSchema');
      //@ts-ignore
      render(<ColleagueAction {...props} onUpdate={jest.fn} />, { reviews, schema });

      await act(async () => {
        fireEvent.click(screen.getByRole('heading'));

        expect(clearSchemaDataMock).toBeCalled();
        expect(getSchemaMock).toBeCalledWith({ colleagueUuid: '10000000-0000-0000-0000-000000000003' });
        expect(getColleagueReviewsMock).toBeCalledWith({
          pathParams: { colleagueUuid: '10000000-0000-0000-0000-000000000003', cycleUuid: 'CURRENT' },
        });
        await waitFor(() => expect(screen.getAllByText(/Approve/)[1]).not.toHaveAttribute('aria-disabled', 'true'));
        await act(async () => {
          fireEvent.click(screen.getAllByText(/Approve/)[1]);
        });
        const submit = screen.getByRole('button', { name: /Submit/i });
        expect(submit).toBeInTheDocument();
        fireEvent.click(submit);
        expect(updateReviewStatusMock).toBeCalledWith({
          data: { colleagueUuid: '10000000-0000-0000-0000-000000000003', reviews: [{ number: 1 }], status: 'APPROVED' },
          pathParams: {
            approverUuid: 'test-colleagueUuid',
            colleagueUuid: '10000000-0000-0000-0000-000000000003',
            cycleUuid: 'CURRENT',
            status: 'APPROVED',
            code: 'MYR',
          },
        });
      });
    });
  });
});
