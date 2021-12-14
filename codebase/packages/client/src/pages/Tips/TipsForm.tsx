import React, { FC } from 'react';
import { useStyle, Rule, useBreakpoints, Button, ModalWithHeader, Icon, theme } from '@dex-ddl/core';
import { useHistory } from 'react-router-dom';
import { Page } from 'pages';
import { Input, Item, Textarea, Select } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { useForm } from 'react-hook-form';

// export type ViewHistoryModal = {
//   handleCloseModal: () => void;
//   card: TipsProps;
// };

const TipsForm: FC = () => {
  const { css } = useStyle();
  const history = useHistory();
  const methods = useForm();
  const imgName = '';
  const field_options = [
    { value: 'id_1', label: 'Option 1' },
    { value: 'id_2', label: 'Option 2' },
    { value: 'id_3', label: 'Option 3' },
  ];

  const handleUploadFile = () => {
    console.log("Upload File Button")
  }

  return (
    <ModalWithHeader title="Create Tip" containerRule={modalWrapper} modalPosition="middle" closeOptions={{
      closeOptionContent: <Icon graphic="close" />,
      // closeOptionStyles: {}
      onClose: () => history.push(`${Page.TIPS}`)
    }}>
      <div className={css(modalInner)}>
        <div className={css({ marginBottom: '25px', })}>
          <div className={css({ display: 'flex', justifyContent: 'flex-start'})}>
            <div className={css(tipIamgeStyle)}></div>
            <div className={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'})}>
              {imgName && <div className={css(uploadPicLabelStyle, { color: theme.colors.tescoBlue})}>{imgName}</div> }
              <div className={css(uploadPicLabelStyle)}>Maxim upload size 5MB, <br /> .jpg or .png format</div>
              <Button 
                onPress={handleUploadFile} 
                mode="inverse" 
                styles={[uploadPicBtnStyle]}
              >
                Choose Picture
              </Button>
            </div>
          </div>
        </div>
        <div className={css({ overflowY: 'auto', height: '80%'})}>
          <GenericItemField
            name={'tipTitle'}
            methods={methods}
            label='Title'
            Wrapper={Item}
            Element={Input}
            placeholder='Example: Share objectives easily'
            value={''}
          />
          <GenericItemField
            name={'tipDescription'}
            methods={methods}
            label='Description'
            Wrapper={Item}
            Element={Textarea}
            placeholder='Example: Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus'
            rows={2}
            value={''}
          />
          <div className={css(hrSeparatorLine)}></div>
          <GenericItemField
            name={'tipTargetLevel1'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 1' withIcon={false}>{children}</Item>}
            Element={Select}
            options={field_options}
            placeholder='Please select'
            value={''}
          />
          <GenericItemField
            name={'tipTargetLevel2'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 2' withIcon={false}>{children}</Item>}
            Element={Select}
            options={field_options}
            placeholder='Please select'
            value={''}
          />
          <GenericItemField
            name={'tipTargetLevel3'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 3' withIcon={false}>{children}</Item>}
            Element={Select}
            options={field_options}
            placeholder='Please select'
            value={''}
          />
          <GenericItemField
            name={'tipTargetLevel4'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 4' withIcon={false}>{children}</Item>}
            Element={Select}
            options={field_options}
            placeholder='Please select'
            value={''}
          />
        </div>
        <div className={css(formControlBtnsWrap)}>
          <Button 
            onPress={() => history.push(`${Page.TIPS}`)} 
            mode="inverse" 
            styles={[formControlBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
          >
            Discard
          </Button>
          <Button 
            isDisabled={true}
            onPress={() => console.log("Created tip")} 
            styles={[formControlBtn]}
          >
            Create
          </Button>
        </div>
      </div>
    </ModalWithHeader>
  )
}

const modalWrapper: Rule = () => {
  // const [, isBreakpoint] = useBreakpoints();
  // const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: 0,
  }
}

const modalInner: Rule = () => {
  return {
    padding: '40px 40px 100px',
    height: '100%'
  }
}

const tipIamgeStyle: Rule = () => {
  return {
    width: '104px',
    height: '104px',
    background: '#f1f2f4',
    marginRight: '15px',
  }
}

const uploadPicLabelStyle: Rule = ({ theme }) => {
  return {
    fontSize: '14px',
    lineHeight: '18px',
    color: theme.colors.grayscale,
    marginBottom: '5px',
  }
}

const uploadPicBtnStyle: Rule = ({ theme }) => {
  return {
    border: `1px solid ${theme.colors.tescoBlue}`, 
    fontWeight: 700, 
    fontSize: '14px',
    lineHeight: '18px',
    height: 'auto',
    padding: '7px 16px',
    marginTop: '10px',
  }
}

const hrSeparatorLine: Rule = ({ theme }) => {
  return {
    height: '1px',
    background: theme.colors.backgroundDarkest
  }
}

const formControlBtnsWrap: Rule = ({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '0 40px',
    width: '100%',
    borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
  }
}

const formControlBtn: Rule = () => {
  return {
    width: '50%',
    margin: '0 3px',
    fontWeight: 700,
    lineHeight: '20px',
  }
}

export default TipsForm;