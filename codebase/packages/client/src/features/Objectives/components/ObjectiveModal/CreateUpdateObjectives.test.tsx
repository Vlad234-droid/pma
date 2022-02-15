import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import { SchemaFixture } from 'utils/test/fixtures/schema';
import { fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CreateUpdateObjectives } from './CreateUpdateObjectives';

import * as ReviewQuery from 'features/Objectives/hooks/useReviews';
import { FormType, ReviewsActions } from '@pma/store';

describe('CreateUpdateObjectives', () => {
  // const approvalSubmissionText = /Submit Objectives/i;
  let addMockUpdateReviews, onClose;
  let consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

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
      renderer = render(<CreateUpdateObjectives onClose={onClose} />, { schema, reviews });
    });
    afterEach(() => {
      onClose.mockRestore();
      consoleErrorMock.mockRestore();
      addMockUpdateReviews.mockRestore();
    });

    it('should render CreateUpdateObjective fill 1st form and fireEvent save as draft', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const next = screen.getByRole('button', { name: /Next/i });
      const textfield = screen.getByTestId(FormType.TEXT_FIELD);

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
      expect(requestParamFirstCall.pathParams.type).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('DRAFT');
      expect(requestParamFirstCall.data[0].properties.mapJson).toMatchObject({
        textfield: `textfield value`,
      });
      expect(onClose).toHaveBeenCalled();
    });

    it('should render CreateUpdateObjective fill 1st form and fireEvent next', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const next = screen.getByRole('button', { name: /Next/i });
      const textfield = screen.getByTestId(FormType.TEXT_FIELD);

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
      expect(requestParamFirstCall.pathParams.type).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('DRAFT');
      expect(requestParamFirstCall.data[0].properties.mapJson).toMatchObject({
        textfield: `textfield value`,
      });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('CreateUpdateObjectives one review in draft', () => {
    let renderer, addMockReviewsQuery, onClose;
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
              mapJson: {
                textfield: 'textfield_textfield',
              },
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
      addMockReviewsQuery = jest.spyOn(ReviewQuery, 'default').mockReturnValue([
        [
          {
            number: 1,
            status: 'DRAFT',
            properties: {
              mapJson: {
                textfield: 'textfield_textfield',
              },
            },
          },
        ],
        () => true,
      ]);
      renderer = render(<CreateUpdateObjectives onClose={onClose} />, { schema, reviews });
    });
    afterEach(() => {
      onClose.mockRestore();
      consoleErrorMock.mockRestore();
      addMockUpdateReviews.mockRestore();
    });

    it('should render CreateUpdateObjective fill 1st form and fireEvent next and submit', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const next = screen.getByRole('button', { name: /Next/i });
      const textfield = screen.getByTestId(FormType.TEXT_FIELD);

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

      expect(requestParamSecondCall.pathParams.type).toEqual('OBJECTIVE');
      expect(requestParamSecondCall.data[0].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamSecondCall.data[1].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamSecondCall.data[0].properties.mapJson).toMatchObject({
        textfield: 'textfield_textfield',
      });
      expect(requestParamSecondCall.data[1].properties.mapJson).toMatchObject({
        textfield: 'textfield value',
      });
    });
  });
});
