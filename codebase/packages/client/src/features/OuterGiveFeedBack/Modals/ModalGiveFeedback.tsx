import React, { FC, useState } from 'react';
import { useBreakpoints, useStyle } from '@dex-ddl/core';
import { ModalGiveFeedbackProps, PeopleTypes } from '../type';
import { InfoModal, SearchPart, SubmitPart, SuccessModal } from './index';
import { IconButton } from 'components/IconButton';
//import { SubmitButton } from '../../../features/Objectives/components/Modal/index';

const ModalGiveFeedback: FC<ModalGiveFeedbackProps> = ({
  setIsOpen,
  setSelectedPerson,
  selectedPerson,
  infoModal,
  setInfoModal,
  modalSuccess,
  setModalSuccess,
  searchValue,
  setSearchValue,
}) => {
  const [peopleFiltered, setPeopleFiltered] = useState<PeopleTypes[]>([]);

  const { css, theme } = useStyle();
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall;
  const [people] = useState<PeopleTypes[]>([
    {
      id: 1,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Vlad',
      l_name: 'Baryshpolets',
    },
    {
      id: 2,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Andrey',
      l_name: 'Sorokov',
    },
    {
      id: 3,
      img: 'https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo_200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw',
      f_name: 'Anton',
      l_name: 'Ryndy',
    },
  ]);

  const switchClose = (): void => {
    if (selectedPerson !== null) {
      setSelectedPerson(() => null);
    } else {
      setIsOpen(() => false);
    }
  };

  if (modalSuccess)
    return (
      <SuccessModal
        setModalSuccess={setModalSuccess}
        modalSuccess={modalSuccess}
        selectedPerson={selectedPerson}
        setIsOpen={setIsOpen}
        setSelectedPerson={setSelectedPerson}
      />
    );

  if (infoModal) return <InfoModal setInfoModal={setInfoModal} />;

  return (
    <>
      <div className={css({ paddingLeft: '40px', paddingRight: '40px', height: '100%', overflow: 'auto' })}>
        <div className={css({ fontWeight: 'bold', fontSize: '24px', lineHeight: '28px' })}>
          Let a colleague know how they are doing
        </div>
        <div className={css({ marginTop: '8px', fontSize: '18px', lineHeight: '22px' })}>
          Select which colleague you want to provide feedback for.
        </div>
        <SearchPart
          setPeopleFiltered={setPeopleFiltered}
          people={people}
          setSelectedPerson={setSelectedPerson}
          peopleFiltered={peopleFiltered}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          selectedPerson={selectedPerson}
        />
        {selectedPerson && (
          <SubmitPart
            setSelectedPerson={setSelectedPerson}
            selectedPerson={selectedPerson}
            setInfoModal={setInfoModal}
            setModalSuccess={setModalSuccess}
          />
        )}
        <span
          className={css({
            position: 'fixed',
            top: theme.spacing.s5,
            left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
            textDecoration: 'none',
            border: 'none',
            cursor: 'pointer',
          })}
        >
          <IconButton graphic='arrowLeft' onPress={() => switchClose()} iconProps={{ invertColors: true }} />
        </span>
      </div>
    </>
  );
};

export default ModalGiveFeedback;
