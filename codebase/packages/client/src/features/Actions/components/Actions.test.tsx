import React from 'react';
import { ReviewsActions } from '@pma/store';
import { fireEvent } from '@testing-library/react';
import { renderWithTheme as render, screen } from '../../../utils/test';
import '@testing-library/jest-dom/extend-expect';

import { Actions } from './Actions';

describe('Actions with two colleagues[1-OBJECTIVE,MYR;2-OBJECTIVE]', () => {
  const managers = {
    meta: { loading: false, loaded: true, error: null },
    success: true,
    data: [
      {
        uuid: '10000000-0000-0000-0000-000000000002',
        firstName: 'Alex',
        middleName: null,
        lastName: 'Smith',
        jobName: 'Customer Assistant',
        businessType: 'Store',
        reviews: [
          {
            uuid: 'a9f00d67-4fbd-496b-8277-08038ff4ce6b',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 3,
          },
          {
            uuid: 'c109df65-4a20-4c11-a514-b9616b6640b7',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 2,
          },
          {
            uuid: 'ef8d1ef7-8285-4b5f-af3f-77415b03ea13',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 1,
          },
          {
            uuid: '5d9df75d-8a27-45e0-978f-8f796489f80c',
            type: 'MYR',
            status: 'WAITING_FOR_APPROVAL',
            number: 1,
          },
        ],
        timeline: [
          {
            uuid: '6c03a401-1be8-9423-469d-18b9617e6604',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
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
                pm_review_max: '5',
                pm_review_duration: 'P2W',
                pm_form_key: 'forms/type_1_objective.form',
              },
            },
            status: 'WAITING_FOR_APPROVAL',
            reviewType: 'OBJECTIVE',
            count: 3,
          },
          {
            uuid: '5993fa16-4a30-4dd6-2a9b-2acb48a50aba',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
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
            status: 'WAITING_FOR_APPROVAL',
            reviewType: 'MYR',
            count: 1,
          },
        ],
      },
      {
        uuid: '10000000-0000-0000-0000-000000000003',
        firstName: 'Joe',
        middleName: null,
        lastName: 'Smith',
        jobName: 'Customer Assistant',
        businessType: 'Store',
        reviews: [
          {
            uuid: '178b1a67-39ca-408d-b902-7f12997e9352',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 2,
          },
          {
            uuid: 'c6b442a7-7844-47a8-9799-ef87fa41d60c',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 3,
          },
          {
            uuid: 'db02cfb2-7e40-41b4-b489-cd3c4526615c',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 1,
          },
        ],
        timeline: [
          {
            uuid: '3ee887e7-8bb6-86ee-e66c-03c9640220c9',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
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
                pm_form_key: 'forms/type_1_objective.form',
              },
            },
            status: 'WAITING_FOR_APPROVAL',
            reviewType: 'OBJECTIVE',
            count: 3,
          },
          {
            uuid: '01068cd0-23a6-42f2-78cb-518e35b1a535',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
            code: 'Q1',
            description: 'Q1',
            type: 'TIMELINE_POINT',
            startTime: '2021-07-01T00:00:00.000Z',
            endTime: null,
            properties: {
              mapJson: {
                pm_timeline_point_start_delay: 'P3M',
                pm_type: 'timeline_point',
                pm_timeline_point_start_time: '2021-07-01',
              },
            },
            status: 'STARTED',
            reviewType: null,
            count: null,
          },
          {
            uuid: 'a677649a-5aaf-4327-bd2f-d3772523ce06',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
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
            status: 'STARTED',
            reviewType: 'MYR',
            count: 0,
          },
        ],
      },
    ],
  };
  let renderer;
  beforeEach(() => {
    renderer = render(<Actions />, {
      schema: { meta: { loading: false, loaded: true, error: null } },
      managers,
    });
  });

  // can not select element if has MYR,EYR and OBJECTIVE at same time
  it('Actions check elements on page', async () => {
    // check colleague to approve or decline
    expect(screen.getAllByRole('heading').length).toEqual(2);

    const allCheckboxes = screen.getAllByRole('checkbox');
    expect(allCheckboxes.length).toEqual(3);
    allCheckboxes.forEach((checkbox: any) => {
      if (checkbox.id === '10000000-0000-0000-0000-000000000002') {
        expect(checkbox).toBeDisabled();
      } else {
        expect(checkbox).not.toBeDisabled();
        expect(checkbox).not.toBeChecked();
      }
    });
    expect(screen.getByRole('button', { name: /Decline/i })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: /Approve/i })).toHaveAttribute('aria-disabled', 'true');
  });

  it('Actions fireEvent select all', async () => {
    fireEvent.click(screen.getByTestId('selectAll'));
    const allCheckboxes = screen.getAllByRole('checkbox');
    allCheckboxes.forEach((checkbox: any) => {
      if (checkbox.id === '10000000-0000-0000-0000-000000000002') {
        expect(checkbox).toBeDisabled();
      } else {
        expect(checkbox).not.toBeDisabled();
        expect(checkbox).toBeChecked();
      }
    });
  });
});

describe('Actions with two colleagues[1-OBJECTIVE;2-OBJECTIVE]', () => {
  const managers = {
    meta: { loading: false, loaded: true, error: null },
    success: true,
    data: [
      {
        uuid: '10000000-0000-0000-0000-000000000002',
        firstName: 'Alex',
        middleName: null,
        lastName: 'Smith',
        jobName: 'Customer Assistant',
        businessType: 'Store',
        reviews: [
          {
            uuid: 'a9f00d67-4fbd-496b-8277-08038ff4ce6b',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 3,
          },
          {
            uuid: 'c109df65-4a20-4c11-a514-b9616b6640b7',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 2,
          },
          {
            uuid: 'ef8d1ef7-8285-4b5f-af3f-77415b03ea13',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 1,
          },
        ],
        timeline: [
          {
            uuid: '6c03a401-1be8-9423-469d-18b9617e6604',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
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
                pm_review_max: '5',
                pm_review_duration: 'P2W',
                pm_form_key: 'forms/type_1_objective.form',
              },
            },
            status: 'WAITING_FOR_APPROVAL',
            reviewType: 'OBJECTIVE',
            count: 3,
          },
        ],
      },
      {
        uuid: '10000000-0000-0000-0000-000000000003',
        firstName: 'Joe',
        middleName: null,
        lastName: 'Smith',
        jobName: 'Customer Assistant',
        businessType: 'Store',
        reviews: [
          {
            uuid: '178b1a67-39ca-408d-b902-7f12997e9352',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 2,
          },
          {
            uuid: 'c6b442a7-7844-47a8-9799-ef87fa41d60c',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 3,
          },
          {
            uuid: 'db02cfb2-7e40-41b4-b489-cd3c4526615c',
            type: 'OBJECTIVE',
            status: 'WAITING_FOR_APPROVAL',
            number: 1,
          },
        ],
        timeline: [
          {
            uuid: '3ee887e7-8bb6-86ee-e66c-03c9640220c9',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
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
                pm_form_key: 'forms/type_1_objective.form',
              },
            },
            status: 'WAITING_FOR_APPROVAL',
            reviewType: 'OBJECTIVE',
            count: 3,
          },
          {
            uuid: '01068cd0-23a6-42f2-78cb-518e35b1a535',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
            code: 'Q1',
            description: 'Q1',
            type: 'TIMELINE_POINT',
            startTime: '2021-07-01T00:00:00.000Z',
            endTime: null,
            properties: {
              mapJson: {
                pm_timeline_point_start_delay: 'P3M',
                pm_type: 'timeline_point',
                pm_timeline_point_start_time: '2021-07-01',
              },
            },
            status: 'STARTED',
            reviewType: null,
            count: null,
          },
          {
            uuid: 'a677649a-5aaf-4327-bd2f-d3772523ce06',
            colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
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
            status: 'STARTED',
            reviewType: 'MYR',
            count: 0,
          },
        ],
      },
    ],
  };
  let renderer;
  beforeEach(() => {
    renderer = render(<Actions />, {
      schema: { meta: { loading: false, loaded: true, error: null } },
      managers,
    });
  });

  it('Actions check elements on page', async () => {
    expect(screen.getAllByRole('heading').length).toEqual(2);

    const allCheckboxes = screen.getAllByRole('checkbox');
    expect(allCheckboxes.length).toEqual(3);
    allCheckboxes.forEach((checkbox: any) => {
      expect(checkbox).not.toBeDisabled();
      expect(checkbox).not.toBeChecked();
    });
    expect(screen.getByRole('button', { name: /Decline/i })).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('button', { name: /Approve/i })).toHaveAttribute('aria-disabled', 'true');
  });

  it('Actions fireEvent select all', async () => {
    fireEvent.click(screen.getByTestId('selectAll'));
    const allCheckboxes = screen.getAllByRole('checkbox');
    allCheckboxes.forEach((checkbox: any) => {
      expect(checkbox).not.toBeDisabled();
      expect(checkbox).toBeChecked();
    });
  });

  it('Actions fireEvent decline all and cancel decline', async () => {
    expect(screen.queryByText('Decline reason')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('selectAll'));
    fireEvent.click(screen.getByRole('button', { name: /Decline/i }));

    expect(screen.getByText('Decline reason')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(screen.getByText('Decline reason')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(screen.queryByText('Decline reason')).not.toBeInTheDocument();
  });

  it('Actions fireEvent decline all', async () => {
    expect(screen.queryByText('Decline reason')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('selectAll'));
    fireEvent.click(screen.getByRole('button', { name: /Decline/i }));

    fireEvent.click(screen.getByTestId('declineReason'));
    fireEvent.click(screen.getByRole('button', { name: /Ambitious enough/i }));
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    fireEvent.click(screen.getByTestId('declineReason'));
    fireEvent.click(screen.getByRole('button', { name: /Easily assessable/i }));
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
  });

  it('Actions fireEvent confirm all', async () => {
    const addMock = jest.spyOn(ReviewsActions, 'updateReviewStatus');

    fireEvent.click(screen.getByTestId('selectAll'));
    fireEvent.click(screen.getByRole('button', { name: /Approve/i }));
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(addMock).toHaveBeenCalledTimes(2);
  });
});
