// @ts-ignore
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { act, fireEvent } from '@testing-library/react';

import { default as ReviewFormModal } from './ReviewFormModal';
import { ReviewsActions } from '@pma/store';
import { ReviewType } from 'config/enum';

describe('ReviewFormModal', () => {
  const approvalSubmissionText = /Are you sure you want to submit your review to your line manager for approval?/i;
  let consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  let addMockUpdateReviews;

  describe('ReviewFormModal with predefined review values', () => {
    let renderer, onClose;
    const schema = {
      meta: {
        loading: false,
        loaded: true,
        updating: false,
        updated: false,
        error: null,
      },
      current: {
        metadata: {
          cycle: {
            id: 'group_a',
            code: 'group_a',
            description: 'null',
            type: 'CYCLE',
            properties: {
              pm_cycle_before_start: 'P2W',
              pm_cycle_type: 'fiscal',
              pm_type: 'cycle',
              pm_cycle_max: '5',
              pm_cycle_before_end: 'P2W',
              pm_cycle_start_time: '2021-04-01',
            },
            cycleType: 'FISCAL',
            timelinePoints: [
              {
                id: 'endOfYearReview',
                code: 'Year-end review',
                description: 'Year-end review',
                type: 'REVIEW',
                properties: {
                  pm_type: 'review',
                  pm_form_key: 'forms/group_a_eyr.form',
                  pm_review_max: '1',
                  pm_review_min: '1',
                  pm_review_type: 'eyr',
                  pm_review_duration: 'P2W',
                  pm_review_before_end: 'P1W',
                  pm_review_start_time: '2022-03-15',
                  pm_review_start_delay: 'P1Y',
                  pm_review_before_start: 'P2W',
                },
                reviewType: 'EYR',
                form: {
                  id: 'e7ecc900-6a37-4b0c-8de9-512ec7b33df7',
                  code: 'forms/group_a_eyr.form',
                  description: null,
                  type: 'FORM',
                  properties: {},
                  key: 'forms/group_a_eyr.form',
                },
              },
            ],
          },
        },
        forms: [
          {
            id: 'e7ecc900-6a37-4b0c-8de9-512ec7b33df7',
            code: 'forms/group_a_eyr.form',
            description: null,
            type: 'FORM',
            properties: {},
            key: 'forms/group_a_eyr.form',
            json: {
              schemaVersion: 2,
              components: [
                {
                  key: 'textfield',
                  label: '**test label textfield**',
                  type: 'textfield',
                  id: 'textfield',
                  validate: {
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                  },
                  description: 'test description textfield',
                  expression: {},
                },
                {
                  text: '**test text**',
                  type: 'text',
                  id: 'text',
                  expression: {},
                },
                {
                  values: [
                    {
                      label: 'Outstanding',
                      value: 'Outstanding',
                    },
                    {
                      label: 'Satisfactory',
                      value: 'Satisfactory',
                    },
                  ],
                  key: 'select',
                  label: 'test label select',
                  type: 'select',
                  id: 'select',
                  validate: {
                    required: true,
                  },
                  description: 'test description select',
                  expression: {},
                },
              ],
              exporter: {
                name: 'form-js (https://demo.bpmn.io)',
                version: '0.4.1',
              },
              type: 'default',
              id: 'group_a_eyr_form',
            },
          },
        ],
      },
      colleagueSchema: {},
    };
    const reviews = {
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      data: [
        {
          uuid: '0c1d5968-520c-4a56-be5c-391addca0b8c',
          type: 'EYR',
          status: 'DRAFT',
          number: 1,
          tlPointUuid: 'bbc85acd-5fcf-af8b-cacc-7fda95743505',
          properties: {
            select: 'Outstanding',
            textfield: 'textfield value',
          },
          lastUpdatedTime: '2022-01-24T08:31:22.583Z',
          changeStatusReason: null,
        },
      ],
    };
    const timeline = {
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      success: true,
      'test-colleagueUuid': [
        {
          uuid: 'bbc85acd-5fcf-af8b-cacc-7fda95743505',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
          code: 'EYR',
          description: 'End of Year Review',
          type: 'REVIEW',
          startTime: '2022-03-15T00:00:00.000Z',
          endTime: null,
          properties: {
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
          status: 'DRAFT',
          reviewType: 'EYR',
          count: 1,
          lastUpdatedTime: '2022-01-24T08:31:22.670Z',
        },
      ],
    };
    beforeEach(() => {
      onClose = jest.fn();
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
      addMockUpdateReviews = jest.spyOn(ReviewsActions, 'updateReviews');
      renderer = render(<ReviewFormModal reviewType={ReviewType.EYR} onClose={onClose} />, {
        timeline,
        reviews,
        schema,
      });
    });
    afterEach(() => {
      onClose.mockRestore();
      consoleErrorMock.mockRestore();
      addMockUpdateReviews.mockRestore();
    });

    it('should render ReviewFormModal', async () => {
      const form = screen.queryByTestId('REVIEW_FORM_MODAL');
      expect(form).toBeInTheDocument();
    });

    it('should render ReviewFormModal labels', async () => {
      const text = screen.getByText(/test text/i);
      const textfieldLabel = screen.getByText(/test label textfield/i);
      const selectLabel = screen.getByText(/test label select/i);

      expect(text).toBeInTheDocument();
      expect(textfieldLabel).toBeInTheDocument();
      expect(selectLabel).toBeInTheDocument();
    });

    it.skip('should render ReviewFormModal input values predefined', async () => {
      const textfieldValue = screen.getByDisplayValue('textfield value');
      const selectValue = screen.getByRole('button', { name: /Outstanding/i });
      const textfieldWrongValue = screen.queryByDisplayValue('textfield wrong value');

      expect(textfieldValue).toBeInTheDocument();
      expect(selectValue).toBeInTheDocument();
      expect(textfieldWrongValue).not.toBeInTheDocument();
    });

    it('should render ReviewFormModal all buttons active', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(saveAsDraft).toBeInTheDocument();
      expect(submit).toBeInTheDocument();

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      expect(submit).not.toHaveAttribute('aria-disabled', 'true');
    });

    it('should render ReviewFormModal fireEvent save as draft', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });

      await act(async () => {
        fireEvent.click(saveAsDraft);
      });
      const requestParamFirstCall = addMockUpdateReviews.mock.calls[0][0];

      expect(addMockUpdateReviews).toHaveBeenCalledTimes(1);
      expect(requestParamFirstCall.pathParams.type).toEqual('EYR');
      expect(requestParamFirstCall.data[0].status).toEqual('DRAFT');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        select: 'Outstanding',
        textfield: 'textfield value',
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should render ReviewFormModal fireEvent submit', async () => {
      const submit = screen.getByRole('button', { name: /Submit/i });

      fireEvent.click(submit);
      expect(screen.getByText(approvalSubmissionText)).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getAllByRole('button', { name: /Submit/i })[1]);
      });

      const requestParamFirstCall = addMockUpdateReviews.mock.calls[0][0];

      expect(requestParamFirstCall.pathParams.type).toEqual('EYR');
      expect(requestParamFirstCall.data[0].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        select: 'Outstanding',
        textfield: 'textfield value',
      });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('ReviewFormModal without predefined review values', () => {
    let renderer, onClose;
    const schema = {
      meta: {
        loading: false,
        loaded: true,
        updating: false,
        updated: false,
        error: null,
      },
      current: {
        metadata: {
          cycle: {
            id: 'group_a',
            code: 'group_a',
            description: 'null',
            type: 'CYCLE',
            properties: {
              pm_cycle_before_start: 'P2W',
              pm_cycle_type: 'fiscal',
              pm_type: 'cycle',
              pm_cycle_max: '5',
              pm_cycle_before_end: 'P2W',
              pm_cycle_start_time: '2021-04-01',
            },
            cycleType: 'FISCAL',
            timelinePoints: [
              {
                id: 'endOfYearReview',
                code: 'Year-end review',
                description: 'Year-end review',
                type: 'REVIEW',
                properties: {
                  pm_type: 'review',
                  pm_form_key: 'forms/group_a_eyr.form',
                  pm_review_max: '1',
                  pm_review_min: '1',
                  pm_review_type: 'eyr',
                  pm_review_duration: 'P2W',
                  pm_review_before_end: 'P1W',
                  pm_review_start_time: '2022-03-15',
                  pm_review_start_delay: 'P1Y',
                  pm_review_before_start: 'P2W',
                },
                reviewType: 'EYR',
                form: {
                  id: 'e7ecc900-6a37-4b0c-8de9-512ec7b33df7',
                  code: 'forms/group_a_eyr.form',
                  description: null,
                  type: 'FORM',
                  properties: {},
                  key: 'forms/group_a_eyr.form',
                },
              },
            ],
          },
        },
        forms: [
          {
            id: 'e7ecc900-6a37-4b0c-8de9-512ec7b33df7',
            code: 'forms/group_a_eyr.form',
            description: null,
            type: 'FORM',
            properties: {},
            key: 'forms/group_a_eyr.form',
            json: {
              schemaVersion: 2,
              components: [
                {
                  key: 'textfield',
                  label: '**test label textfield**',
                  type: 'textfield',
                  id: 'textfield',
                  validate: {
                    required: true,
                    minLength: 10,
                    maxLength: 500,
                  },
                  description: 'test description textfield',
                  expression: {},
                },
                {
                  text: '**test text**',
                  type: 'text',
                  id: 'text',
                  expression: {},
                },
              ],
              exporter: {
                name: 'form-js (https://demo.bpmn.io)',
                version: '0.4.1',
              },
              type: 'default',
              id: 'group_a_eyr_form',
            },
          },
        ],
      },
      colleagueSchema: {},
    };
    const reviews = {
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      'test-colleagueUuid': [
        {
          uuid: '0c1d5968-520c-4a56-be5c-391addca0b8c',
          type: 'EYR',
          status: 'DRAFT',
          number: 1,
          tlPointUuid: 'bbc85acd-5fcf-af8b-cacc-7fda95743505',
          properties: {},
          lastUpdatedTime: '2022-01-24T08:31:22.583Z',
          changeStatusReason: null,
        },
      ],
    };
    const timeline = {
      meta: {
        loading: false,
        loaded: true,
        error: null,
      },
      success: true,
      'test-colleagueUuid': [
        {
          uuid: 'bbc85acd-5fcf-af8b-cacc-7fda95743505',
          colleagueCycleUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
          code: 'EYR',
          description: 'End of Year Review',
          type: 'REVIEW',
          startTime: '2022-03-15T00:00:00.000Z',
          endTime: null,
          properties: {
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
          status: 'DRAFT',
          reviewType: 'EYR',
          count: 1,
          lastUpdatedTime: '2022-01-24T08:31:22.670Z',
        },
      ],
    };
    beforeEach(() => {
      onClose = jest.fn();
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
      addMockUpdateReviews = jest.spyOn(ReviewsActions, 'updateReviews');
      renderer = render(<ReviewFormModal reviewType={ReviewType.EYR} onClose={onClose} />, {
        timeline,
        reviews,
        schema,
      });
    });
    afterEach(() => {
      onClose.mockRestore();
      consoleErrorMock.mockRestore();
      addMockUpdateReviews.mockRestore();
    });

    it('should render ReviewFormModal', async () => {
      const form = screen.queryByTestId('REVIEW_FORM_MODAL');
      expect(form).toBeInTheDocument();
    });

    it('should render ReviewFormModal input values empty', async () => {
      const textfield = screen.getByTestId('textarea-textfield');

      expect(textfield).toBeEmptyDOMElement();
    });

    it('should render ReviewFormModal and check active button', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(saveAsDraft).toBeInTheDocument();
      expect(submit).toBeInTheDocument();

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      expect(submit).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render ReviewFormModal fill form and fireEvent submit', async () => {
      const textfield = screen.getByTestId('textarea-textfield');
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(submit).toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        fireEvent.change(textfield, { target: { value: 'textfield value' } });
      });
      expect(submit).not.toHaveAttribute('aria-disabled', 'true');
      fireEvent.click(submit);

      expect(screen.getByText(approvalSubmissionText)).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getAllByRole('button', { name: /Submit/i })[1]);
      });

      const requestParamFirstCall = addMockUpdateReviews.mock.calls[0][0];

      expect(requestParamFirstCall.pathParams.type).toEqual('EYR');
      expect(requestParamFirstCall.data[0].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        textfield: 'textfield value',
      });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should render ReviewFormModal check error message absent', async () => {
      const textfield = screen.getByTestId('textarea-textfield');
      const errorText = /Must be at least/;
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(submit).toHaveAttribute('aria-disabled', 'true');
      textfield.focus();
      await act(async () => {
        fireEvent.change(textfield, { target: { value: 'ReviewFormModal' } });
      });
      fireEvent.blur(textfield);
      expect(await screen.queryByText(errorText)).not.toBeInTheDocument();
    });

    it.skip('should render ReviewFormModal check typing by latter', async () => {
      const textfield = screen.getByTestId('textarea-textfield');
      const errorText = /Must be at least/;
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(submit).toHaveAttribute('aria-disabled', 'true');
      expect(await screen.queryByText(errorText)).not.toBeInTheDocument();
      textfield.focus();
      await act(async () => {
        fireEvent.change(textfield, { target: { value: 't' } });
      });
      expect(textfield).toHaveFocus();
      expect(await screen.queryByText(errorText)).not.toBeInTheDocument();
      fireEvent.blur(textfield);
      expect(screen.getByText(errorText)).toBeInTheDocument();
    });
  });
});
