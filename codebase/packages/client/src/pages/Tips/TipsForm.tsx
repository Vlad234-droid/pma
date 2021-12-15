import React, { FC, useEffect, useState } from 'react';
import { useStyle, Rule, useBreakpoints, Button, ModalWithHeader, Icon, theme } from '@dex-ddl/core';
import { useHistory } from 'react-router-dom';
import { Page } from 'pages';
import { Input, Item, Textarea, Select } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigEntriesActions, tipsActions } from '@pma/store';
import { configEntriesSelector } from '@pma/store/src/selectors/config-entries';

// export type ViewHistoryModal = {
//   handleCloseModal: () => void;
//   card: TipsProps;
// };

function getChildren(data, options: any, key, value) {
  return data
    .filter((item) => {
      return item[key] === options;
    })
    .reduce((prev, item) => {
      return [
        ...prev,
        ...item.children?.map((child) => ({
          value: child[value],
          label: child.name,
          children: child.children,
          uuid: child.uuid
        })),
      ];
    }, []);
}

const TipsForm: FC = () => {
  const { css } = useStyle();
  const history = useHistory();
  const methods = useForm();
  const dispatch = useDispatch();
  const configEntries = useSelector(configEntriesSelector);
  const [createTipBtnStatus, setCreateTipBtnStatus] = useState(true)


  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options12, setOptions12] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options131, setOptions131] = useState([]);
  const [options4, setOptions4] = useState([]);
  // const [entryConfigKey, setEntryConfigKey] = useState('');
  const [targetOrganisation, setTargetOrganisation] = useState('')
  
  useEffect(() => {
    dispatch(ConfigEntriesActions.getConfigEntries());
  }, []);

  useEffect(() => {
    setOptions2(getChildren(configEntries.data, options1, 'uuid', 'uuid'))
  }, [options1, configEntries]);

  useEffect(() => setOptions3(getChildren(options2, options12, 'value', 'uuid')), [options12, options2]);

  useEffect(
    () => setOptions4(getChildren(options3, options131, 'value', 'compositeKey')),
    [options131, options3, options12],
  );

  const handleCreateTip = () => {
    const data = {
      title: methods.getValues('tipTitle'),
      description: methods.getValues('tipDescription'),
      key: `/${Math.random().toFixed(5)}`,
      targetOrganisation: {
        uuid: targetOrganisation
      },
      imageLink: "https://www.google.com/gmail/about/static-2.0/images/logo-gmail.png"
    }
    dispatch(
      tipsActions.createTip(data),
    );
    history.push(`${Page.TIPS}`)
  }
  
  
  //temp
  const imgName = '';
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
            options={configEntries.data.map((item) => {
              return { value: item.uuid, label: item.name };
            })}
            placeholder='Please select'
            onChange={(_, value) => {
              dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: value }))
              setOptions1(value);
            }}
            value={''}
          />
          <GenericItemField
            name={'tipTargetLevel2'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 2' withIcon={false}>{children}</Item>}
            Element={Select}
            options={options2}
            onChange={(_, value) => setOptions12(value)}
            placeholder='Please select'
            value={''}
          />
          <GenericItemField
            name={'tipTargetLevel3'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 3' withIcon={false}>{children}</Item>}
            Element={Select}
            options={options3}
            onChange={(_, value) => {
              setOptions131(value);
            }}
            placeholder='Please select'
            value={''}
          />
          <GenericItemField
            name={'tipTargetLevel4'}
            methods={methods}
            Wrapper={({ children }) => <Item label='Level 4' withIcon={false}>{children}</Item>}
            Element={Select}
            options={options4}
            onChange={(_, value) => {
              const item = options4.filter(item => item['value'] === value)[0]
              // setEntryConfigKey(value)
              setTargetOrganisation(item['uuid'])
              setCreateTipBtnStatus(false)
            }}
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
            isDisabled={createTipBtnStatus}
            onPress={handleCreateTip} 
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
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: 0,
    ...(mobileScreen 
      ? 
      {
        width: '100%',
        height: 'calc(100% - 50px)',
        marginTop: '50px',
        borderRadius: '24px 24px 0 0'
      }
      :
      { width: '60%' }
    )
  }
}

const modalInner: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '30px 15px 100px' : '40px 40px 100px',
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
    background: theme.colors.backgroundDarkest,
    marginBottom: '20px',
  }
}

const formControlBtnsWrap: Rule = ({ theme }) => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
    ...(mobileScreen
      ?
      { padding: '0 10px' }
      :
      { padding: '0 40px', }
    )
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