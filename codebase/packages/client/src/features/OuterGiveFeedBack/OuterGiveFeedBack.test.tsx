import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import OuterGiveFeedBack from './OuterGiveFeedBack';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from '../../utils/test';
import UserEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ModalGiveFeedback from './Modals/ModalGiveFeedback';
import { WITH_SELECTED_TEST } from './Modals/SubmitPart';
import { fireEvent, waitFor } from '@testing-library/react';
import { SUCCES_GIVE_FEEDBACK } from './Modals/SuccessModal';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { createGiveFeedbackSchema } from './config';
import '@types/jest';

type Selected = any;

describe('ModalGiveFeedback', () => {
  it('FeedBackPage', async () => {
    const history = createMemoryHistory();
    history.push('/give-feedback');
    const { getByText, findByTestId } = renderWithTheme(
      <Router history={history}>
        <OuterGiveFeedBack />
      </Router>,
    );
    const button = getByText(/Give new feedback/i);
    expect(button).toBeInTheDocument();
    const search = findByTestId('search-part');
    UserEvent.click(button);
    expect(await search).toBeInTheDocument();
  });
  it('SearchPart', async () => {
    const methods = useForm({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(createGiveFeedbackSchema),
    });
    const selected: Selected = {
      img: 'link',
      f_name: 'Test',
      l_name: 'Test',
      id: 1,
    };

    const testHandler = jest.fn();
    const history = createMemoryHistory();
    history.push('/give-feedback');

    const { getByTestId, getByText } = renderWithTheme(
      <Router history={history}>
        <ModalGiveFeedback
          isOpenMainModal={true}
          setIsOpen={testHandler}
          setSelectedPerson={testHandler}
          selectedPerson={selected}
          infoModal={false}
          setInfoModal={testHandler}
          modalSuccess={false}
          setModalSuccess={testHandler}
          searchValue={'test'}
          setSearchValue={testHandler}
          setConfirmModal={testHandler}
          confirmModal={false}
          setFeedbackItems={testHandler}
          methods={methods}
        />
      </Router>,
    );
    expect(getByText(/Submit/i).getAttribute('aria-disabled')).toBe('true');
    const input = getByTestId('search_option');
    expect(input).toBeInTheDocument();
    expect(getByTestId(WITH_SELECTED_TEST)).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    const field1 = getByTestId('feedback.1.field');
    expect(field1).toBeInTheDocument();
    fireEvent.change(field1, { target: { value: 'test' } });
    expect(field1.value).toBe('test');

    const field2 = getByTestId('feedback.2.field');
    expect(field2).toBeInTheDocument();
    fireEvent.change(field2, { target: { value: 'test' } });
    expect(field2.value).toBe('test');

    const field3 = getByTestId('feedback.3.field');
    expect(field3).toBeInTheDocument();
    fireEvent.change(field3, { target: { value: 'test' } });
    expect(field3.value).toBe('test');

    await waitFor(() => {
      expect(getByText(/Submit/i).getAttribute('aria-disabled')).toBe('true');
    });
  });

  it('SuccessPart', async () => {
    const selected: Selected = {
      img: 'link',
      f_name: 'Test',
      l_name: 'Test',
      id: 1,
    };
    const testHandler = jest.fn();
    const history = createMemoryHistory();
    history.push('/give-feedback');

    const methods = useForm({
      mode: 'onChange',
      resolver: yupResolver<Yup.AnyObjectSchema>(createGiveFeedbackSchema),
    });

    const { getByTestId } = renderWithTheme(
      <Router history={history}>
        <ModalGiveFeedback
          isOpenMainModal={true}
          setIsOpen={testHandler}
          setSelectedPerson={testHandler}
          selectedPerson={selected}
          infoModal={false}
          setInfoModal={testHandler}
          modalSuccess={true}
          setModalSuccess={testHandler}
          searchValue={'test'}
          setSearchValue={testHandler}
          setConfirmModal={testHandler}
          confirmModal={false}
          setFeedbackItems={testHandler}
          methods={methods}
        />
      </Router>,
    );
    const success = getByTestId(SUCCES_GIVE_FEEDBACK);
    expect(success).toBeInTheDocument();
  });
});
