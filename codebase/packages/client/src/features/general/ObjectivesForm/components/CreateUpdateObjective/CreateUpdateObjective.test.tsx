import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderWithTheme as render, screen } from 'utils/test';
import { SchemaFixture, SchemaFixtureVariables } from 'utils/test/fixtures/schema';
import { fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormType, ReviewsActions } from '@pma/store';
import CreateUpdateObjective from './CreateUpdateObjective';

describe('CreateUpdateObjective', () => {
  Element.prototype.scrollIntoView = jest.fn();
  const approvalSubmissionText = /Submit Objectives/i;
  let addMockUpdateReview, addMockCreateReview, onClose;
  let consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  describe('CreateUpdateObjective[CREATE] empty review state', () => {
    let renderer;
    beforeEach(() => {
      onClose = jest.fn();
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
      addMockUpdateReview = jest.spyOn(ReviewsActions, 'updateReview');
      addMockCreateReview = jest.spyOn(ReviewsActions, 'createReview');

      const schema = new SchemaFixture().withMetadata().withForm().state;
      renderer = render(<CreateUpdateObjective onClose={onClose} />, { schema });
    });
    afterEach(() => {
      onClose.mockRestore();
      addMockUpdateReview.mockRestore();
      addMockCreateReview.mockRestore();
    });

    it('should render CreateUpdateObjective', async () => {
      const form = await screen.queryByTestId('OBJECTIVE_FORM_MODAL');
      expect(form).toBeInTheDocument();
    });

    it('should render CreateUpdateObjective labels', async () => {
      const text = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);
      const textfieldLabel = await screen.findByText(SchemaFixtureVariables.TEXT_FIELD_LABEL_OBJECTIVE);

      expect(text).toBeInTheDocument();
      expect(textfieldLabel).toBeInTheDocument();
    });

    it('should render CreateUpdateObjective input values empty', async () => {
      const textfield = screen.getByTestId('textarea-textfield');

      expect(textfield).toBeEmptyDOMElement();
    });

    it('should render CreateUpdateObjective and check active button', async () => {
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(saveAsDraft).toBeInTheDocument();
      expect(submit).toBeInTheDocument();

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      expect(submit).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render CreateUpdateObjective fill form and fireEvent submit', async () => {
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(submit).toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        await userEvent.paste(textfield, 'textfield value');
      });
      expect(submit).not.toHaveAttribute('aria-disabled', 'true');
      fireEvent.click(submit);

      expect(screen.getByText(approvalSubmissionText)).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getAllByRole('button', { name: /Submit/i })[1]);
      });

      const requestParamFirstCall = addMockCreateReview.mock.calls[0][0];

      expect(requestParamFirstCall.pathParams.type).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        textfield: 'textfield value',
      });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('CreateUpdateObjective[UPDATE] empty review state', () => {
    let renderer;
    beforeEach(() => {
      onClose = jest.fn();
      consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
      addMockUpdateReview = jest.spyOn(ReviewsActions, 'updateReview');
      addMockCreateReview = jest.spyOn(ReviewsActions, 'createReview');
      const schema = new SchemaFixture().withMetadata().withForm().state;
      const reviews = {
        data: [
          {
            type: 'OBJECTIVE',
            status: 'DRAFT',
            number: 1,
            tlPointUuid: '278e6e31-5555-53bf-450e-780edbcf21f9',
            properties: {
              textfield: 'textfield prev ',
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
      renderer = render(<CreateUpdateObjective onClose={onClose} editNumber={1} />, { schema, reviews });
    });

    afterEach(() => {
      onClose.mockRestore();
      addMockUpdateReview.mockRestore();
      addMockCreateReview.mockRestore();
    });

    it('should render CreateUpdateObjective fill form and fireEvent save as draft', async () => {
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);
      const saveAsDraft = screen.getByRole('button', { name: /Save as draft/i });

      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        await userEvent.paste(textfield, 'textfield value');
      });
      expect(saveAsDraft).not.toHaveAttribute('aria-disabled', 'true');
      fireEvent.click(saveAsDraft);

      const requestParamFirstCall = addMockUpdateReview.mock.calls[0][0];

      expect(requestParamFirstCall.pathParams.type).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('DRAFT');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        textfield: 'textfield prev textfield value',
      });
      expect(onClose).toHaveBeenCalled();
    });

    it('should render CreateUpdateObjective fill form and fireEvent submit', async () => {
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);
      const submit = screen.getByRole('button', { name: /Submit/i });

      expect(submit).not.toHaveAttribute('aria-disabled', 'true');
      await act(async () => {
        await userEvent.paste(textfield, 'textfield value');
      });
      expect(submit).not.toHaveAttribute('aria-disabled', 'true');
      fireEvent.click(submit);

      expect(screen.getByText(approvalSubmissionText)).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getAllByRole('button', { name: /Submit/i })[1]);
      });

      const requestParamFirstCall = addMockUpdateReview.mock.calls[0][0];

      expect(requestParamFirstCall.pathParams.type).toEqual('OBJECTIVE');
      expect(requestParamFirstCall.data[0].status).toEqual('WAITING_FOR_APPROVAL');
      expect(requestParamFirstCall.data[0].properties).toMatchObject({
        textfield: 'textfield prev textfield value',
      });
      expect(onClose).toHaveBeenCalled();
    });

    it('should render CreateUpdateObjective check error message absent', async () => {
      const textfield = screen.getByTestId(`textarea-${FormType.TEXT_FIELD}`);
      const errorText = /Must be at least/;
      textfield.focus();
      await act(async () => {
        fireEvent.change(textfield, { target: { value: 'ReviewFormModal' } });
      });
      fireEvent.blur(textfield);
      expect(await screen.queryByText(errorText)).not.toBeInTheDocument();
    });

    it('should render ReviewFormModal check typing by latter', async () => {
      const textfield = screen.getByTestId('textarea-textfield');
      const errorText = /Must be at least/;
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
