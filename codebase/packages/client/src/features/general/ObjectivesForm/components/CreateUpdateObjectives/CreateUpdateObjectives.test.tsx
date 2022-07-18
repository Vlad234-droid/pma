import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import { SchemaFixture } from 'utils/test/fixtures/schema';
import { act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormType, ReviewsActions } from '@pma/store';
import CreateUpdateObjectives from './CreateUpdateObjectives';

describe('CreateUpdateObjectives', () => {
  // const approvalSubmissionText = /Submit Objectives/i;
  let addMockUpdateReviews, onClose;
  let consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  Element.prototype.scrollIntoView = jest.fn();

  describe('CreateUpdateObjectives empty review state', () => {
    let renderer;
    beforeEach(() => {
      onClose = jest.fn();
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
      addMockUpdateReviews = jest.spyOn(ReviewsActions, 'updateReviews');
      // todo min max review objectives 2 hardcoded
      const schema = new SchemaFixture().withMetadata().withForm().state;
      const reviews = {
        data: [],
        colleagueReviews: {},
        meta: {
          loading: false,
          loaded: true,
          error: null,
          status: null,
        },
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
      renderer = render(<CreateUpdateObjectives onClose={onClose} />, { schema, reviews, timeline });
    });
    afterEach(() => {
      onClose.mockRestore();
      consoleErrorMock.mockRestore();
      addMockUpdateReviews.mockRestore();
    });

    it('should render CreateUpdateObjective fill 1st form and fireEvent save as draft', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const next = screen.getByRole('button', { name: /Next/i });
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      expect(next).toHaveAttribute('aria-disabled', 'true');

      await act(async () => {
        await userEvent.paste(textfield, `textfield value`);
      });
      expect(next).not.toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        fireEvent.click(saveAsDraft);
      });

      const requestParamFirstCall = addMockUpdateReviews.mock.calls[0][0];
      expect(requestParamFirstCall.pathParams.code).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('DRAFT');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        textfield: `textfield value`,
      });
      expect(onClose).toHaveBeenCalled();
    });

    it('should render CreateUpdateObjective fill 1st form and fireEvent next', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const next = screen.getByRole('button', { name: /Next/i });
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      expect(next).toHaveAttribute('aria-disabled', 'true');

      await act(async () => {
        await userEvent.paste(textfield, `textfield value`);
      });
      expect(next).not.toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        fireEvent.click(next);
      });

      expect(textfield).toBeEmptyDOMElement();
      const requestParamFirstCall = addMockUpdateReviews.mock.calls[0][0];
      expect(requestParamFirstCall.pathParams.code).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('DRAFT');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        textfield: `textfield value`,
      });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('CreateUpdateObjectives one review in draft', () => {
    let renderer, onClose;
    const approvalSubmissionText = /Submit Objectives/i;
    beforeEach(() => {
      onClose = jest.fn();
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
      addMockUpdateReviews = jest.spyOn(ReviewsActions, 'updateReviews');
      // todo min max review objectives 2 hardcoded
      const schema = new SchemaFixture().withMetadata().withForm().state;
      const reviews = {
        data: [
          {
            number: 1,
            status: 'DRAFT',
            type: 'OBJECTIVE',
            properties: {
              textfield: 'textfield_textfield',
            },
          },
        ],
        colleagueReviews: {},
        meta: {
          loading: false,
          loaded: true,
          error: null,
          status: null,
        },
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
      renderer = render(<CreateUpdateObjectives onClose={onClose} />, { schema, reviews, timeline });
    });
    afterEach(() => {
      onClose.mockRestore();
      consoleErrorMock.mockRestore();
      addMockUpdateReviews.mockRestore();
    });

    it('should render CreateUpdateObjective fill 1st form and fireEvent next and submit', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const next = screen.getByRole('button', { name: /Next/i });
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      expect(next).not.toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        fireEvent.click(next);
      });

      const submit = await screen.findByRole('button', { name: /Submit/i });
      expect(submit).toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        await userEvent.paste(textfield, `textfield value`);
      });
      expect(submit).not.toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        fireEvent.click(submit);
      });

      expect(screen.getByText(approvalSubmissionText)).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getAllByRole('button', { name: /Submit/i })[1]);
      });

      const requestParamSecondCall = addMockUpdateReviews.mock.calls[1][0];

      expect(requestParamSecondCall.pathParams.code).toEqual('OBJECTIVE');
      expect(requestParamSecondCall.data[0].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamSecondCall.data[1].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamSecondCall.data[0].properties).toMatchObject({
        textfield: 'textfield_textfield',
      });
      expect(requestParamSecondCall.data[1].properties).toMatchObject({
        textfield: 'textfield value',
      });
    });
  });
});
