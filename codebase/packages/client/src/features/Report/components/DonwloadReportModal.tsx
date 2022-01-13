import React, { FC, useEffect, useState } from 'react';
import { Button, Icon, ModalWithHeader, Rule, theme, useBreakpoints, useStyle } from '@dex-ddl/core';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { reportByYearSchema } from '../config';
import { Select, Checkbox, Item } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import success from '../../../../public/success.jpg';

type ModalProps = {
  onClose: () => void;
}

const checkboxes = [
  {
    id: '0',
    label: 'Objectives submitted',
    isChecked: false
  },
  {
    id: '1',
    label: 'Objectives approved',
    isChecked: false
  },
  {
    id: '2',
    label: 'Mid-year forms',
    isChecked: false
  },
  {
    id: '3',
    label: 'Breakdown of mid-year ratings',
    isChecked: false
  },
  {
    id: '4',
    label: 'Year-end forms',
    isChecked: false
  },
  {
    id: '5',
    label: 'Breakdown of year-end ratings',
    isChecked: false
  },
  {
    id: '6',
    label: 'In the moment feedback',
    isChecked: false
  },
  {
    id: '7',
    label: 'Colleagues on Supporting Your Performance',
    isChecked: false
  },
  {
    id: '8',
    label: 'New to business',
    isChecked: false
  },
  {
    id: '9',
    label: 'Colleagues absences',
    isChecked: false
  },
  {
    id: '10',
    label: 'Anniversary reviews completed per quarter',
    isChecked: false
  },
]

const DonwloadReportModal: FC<ModalProps> = ({ onClose }) => {
  const { css } = useStyle();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(reportByYearSchema),
  });

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(checkboxes);
  const [isDisabledDownloadBtn, setIsDisabledDownloadBtn] = useState(true);
  const [showSuccessModal, setShowSuccesModal] = useState(false);

  const years = [
    { value: 'id_1', label: '2021' },
    { value: 'id_2', label: '2020' },
    { value: 'id_3', label: '2019' },
    { value: 'id_4', label: '2018' },
  ];

  useEffect(() => {
    setIsDisabledDownloadBtn(true);
    for(const key in selectedCheckboxes) {
      if(selectedCheckboxes[key]['isChecked']) {
        setIsDisabledDownloadBtn(false);
      }
    }
  }, [selectedCheckboxes]);

  const handleDownloadReport = () => {
    setShowSuccesModal(true);
  };

  const handleCheck = (checkboxId) => {
    const itemIndex = selectedCheckboxes.findIndex(item => item.id === checkboxId);
    const item = {
      ...selectedCheckboxes[itemIndex],
      isChecked: !selectedCheckboxes[itemIndex]['isChecked']
    }
    const newArray = [...selectedCheckboxes];
    newArray[itemIndex] = item;
    setSelectedCheckboxes(newArray)
  }

  return (
    <ModalWithHeader 
      modalPosition='middle'
      title='Download and Exctract'
      containerRule={modalWrapperStyle}
      closeOptions={{
        closeOptionContent: <Icon graphic='close' />,
        onClose: onClose
      }}
    >
      <h3 className={css(modalTitleStyle)}>Choose which topics you’d like to download into an excel report</h3>
      <div className={css(modalInnerWarp)}>
        <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'})}>
          { selectedCheckboxes.map(item => (
            <label key={item.id} className={css(checkboxItemStyle)}>
              <Checkbox
                checked={item.isChecked}
                onChange={() => handleCheck(item.id)}
              />
              <span className={css({ marginLeft: '15px' })}>{item.label}</span>
            </label>
          ))}
        </div>
          
        <GenericItemField
          name={'selectYear'}
          methods={methods}
          Wrapper={({ children }) => <Item label='Select a year' withIcon={false}>{children}</Item>}
          Element={Select}
          options={years}
          placeholder='Please select'
          onChange={() => {
            console.log('selected year');
          }}
          value={'2021'}
        />

        <div className={css(textBlock, { fontWeight: 700 })}>Guidance for colleagues</div>
        <div className={css(textBlock, { marginBottom: '30px' })}>Vitae morbi ullamcorper venenatis ut. Mi auctor bibendum sed ut tempus senectus. Ullamcorper cursus purus lacus elementum nulla in lacus nunc. Ultrices urna magna viverra a, amet eget lorem quam. Id leo vel arcu nullam proin.</div>
      </div>

      <div className={css(formButtonsWrap)}>
        <Button 
          onPress={onClose} 
          mode="inverse" 
          styles={[formButton, { border: `1px solid ${theme.colors.tescoBlue}` }]}
        >
          Cancel
        </Button>
        <Button 
          isDisabled={isDisabledDownloadBtn}
          onPress={handleDownloadReport}
          styles={[formButton]}
        >
          Download
        </Button>
      </div>

      {showSuccessModal && (
        <div className={css(successModalWrap)}>
          <img src={success} alt='success' />
          <div className={css(successModalTitle)}>Done!</div>
          <div className={css(successModalText)}>You have downloaded the report onto your device.</div>
          <Button styles={[successModalBtn]} onPress={onClose}>Okay</Button>
        </div>
      )}
    </ModalWithHeader>
  )
}

const modalWrapperStyle: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    ...(mobileScreen ?
      { 
        width: '100%',
        height: 'calc(100% - 50px)',
        marginTop: '50px',
        padding: 0,
      } : { 
        width: '60%',
        height: 'calc(100% - 100px)',
        padding: 0,
      }
    )
  }
}

const modalInnerWarp: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    width: '100%',
    overflowY: 'scroll',
    ...(mobileScreen ?
      { 
        padding: '5px 15px',
        height: 'calc(100% - 170px)',
      } : { 
        height: 'calc(100% - 257px)',
        padding: '5px 40px',
      }
    )
  }
}

const checkboxItemStyle: Rule = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '15px',
  }
}

const modalTitleStyle: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    color: theme.colors.tescoBlue,
    ...(mobileScreen ?
      { 
        fontSize: '20px',
        lineHeight: '24px',
        padding: '20px',
        margin: 0,
      } : { 
        fontSize: '24px',
        lineHeight: '28px',
        padding: '40px',
        margin: 0,
      }
    )
  }
}

const formButtonsWrap: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
    ...(mobileScreen ?
      { 
        background: theme.colors.white,
        padding: '20px 10px',
      } : { 
        background: 'none',
        padding: '40px 30px',
      }
    )
  }
}

const formButton: Rule = () => {
  return {
    width: '50%',
    margin: '0 5px',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 700,
  }
}

const textBlock:Rule = () => {
  return {
    fontSize: '16px',
    lineHeight: '20px',
    marginBottom: '5px',
  }
}

const successModalWrap: Rule = ({theme}) => {
  return {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    borderRadius: '32px',
    padding: '120px 40px 40px',
    background: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  }
}

const successModalTitle: Rule = () => {
  return {
    fontSize: '28px',
    fontWeight: 700,
    margin: '40px 0 15px',
  }
}

const successModalText: Rule = () => {
  return {
    fontSize: '24px',
    lineHeight: '28px',
    maxWidth: '370px',
  }
}

const successModalBtn: Rule = () => {
  return { 
    marginTop: 'auto',
    maxWidth: '250px',
    width: '100%',
    fontWeight: 700,
  }
}

export default DonwloadReportModal;