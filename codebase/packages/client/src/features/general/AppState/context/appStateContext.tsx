import React, { createContext, FC, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'components/Translation';

import ModalError from '../components/ModalError';

import { AppStateActions, appStateModalErrorSelector } from '@pma/store';

const AppStateContext = createContext({});

const AppStateProvider: FC = ({ children }) => {
  const modalError = useSelector(appStateModalErrorSelector);
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleModalErrorClose = () => dispatch(AppStateActions.removeModalError());

  return (
    <AppStateContext.Provider value={{}}>
      {modalError && (
        <ModalError
          title={t(modalError.title)}
          description={t(modalError.description)}
          onClose={handleModalErrorClose}
          onOverlayClick={handleModalErrorClose}
        />
      )}
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);

export default AppStateProvider;
