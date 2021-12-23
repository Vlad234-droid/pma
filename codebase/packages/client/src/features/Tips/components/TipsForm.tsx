import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useStyle, Rule, useBreakpoints, Button, ModalWithHeader, Icon, theme } from '@dex-ddl/core';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Page } from 'pages';
import { Input, Item, Textarea, Select } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { IconButton } from 'components/IconButton';
import { 
  ConfigEntriesActions, 
  tipsActions,
  getCurrentTipSelector,
  getTipsMetaSelector,
  configEntriesSelector, 
  configEntriesMetaSelector,
} from '@pma/store';
import { createTipSchema } from 'pages/Tips/config';
import { TipsFormModal } from '.';
import { buildPath } from 'features/Routes/utils';

export type TipsFormProps = {
  mode: string
};

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

const TipsForm: FC<TipsFormProps> = ({ mode }) => {
  const { css } = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createTipSchema),
  });
  const { 
    handleSubmit, 
    formState: { isValid, isDirty }, 
    setValue, 
    reset, 
    resetField 
  } = methods;

  const configEntries = useSelector(configEntriesSelector);
  const currentTip = useSelector(getCurrentTipSelector);
  const tipsMeta = useSelector(getTipsMetaSelector);
  const { loaded } = useSelector(configEntriesMetaSelector) || {};

  const [options1, setOptions1] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [options12, setOptions12] = useState([]);
  const [options3, setOptions3] = useState([]);
  const [options131, setOptions131] = useState([]);
  const [options4, setOptions4] = useState([]);
  // const [entryConfigKey, setEntryConfigKey] = useState('');
  const [targetOrganisation, setTargetOrganisation] = useState('');
  const [showTipsFormModal, setShowTipsFormModal] = useState(false);
  const [successTipsFormModal, setSuccessTipsModal] = useState(false);
  const [tipsFormModalAction, setTipsFormModalAction] = useState('discard')

  const [tipsTarget, setTipsTarget] = useState({})

  useEffect(() => {
    dispatch(ConfigEntriesActions.getConfigEntries());
    if(mode === 'edit') {
      dispatch(tipsActions.getTipByUuid(params['tipUuid']))
    }
  }, []);

  useEffect(() => {
    if(mode === 'edit' && loaded) {
      reset()
      if(configEntries) {
        // const tipUuid = params['tipUuid'];
        const targetCompositeKey = currentTip?.targetOrganisation?.compositeKey;
        const targetCompositeKeyLevel1 = `${targetCompositeKey?.split('/').slice(0, 1)}/${targetCompositeKey?.split('/').slice(1, 2)}/${targetCompositeKey?.split('/').slice(-1)}`
        const configEntry = configEntries.data.filter(item => item.compositeKey === targetCompositeKeyLevel1)[0];
        if(configEntry) {
          dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: configEntry['uuid']}));
          setOptions1(configEntry['uuid']);
          setTargetOrganisation(configEntry['uuid']);
        }
      }
    }
  }, [loaded, currentTip])

  useEffect(() => {
    if(mode === 'edit' && loaded) {
      if(configEntries) {
        const targetCompositeKey = currentTip?.targetOrganisation?.compositeKey;
        const configEntry = configEntries.data.filter(item => item.uuid === options1)[0];
        setTipsTarget({ configEntry, targetCompositeKey })
      }
    }
  }, [configEntries.data])

  useEffect(() => {
    if(mode === 'edit' && loaded) {
      const targetCompositeKey = currentTip?.targetOrganisation?.compositeKey;
      const compositeKeyLevels = {
        level1: '',
        level2: '',
        level3: '',
        level4: '',
      }

     
      const temp = targetCompositeKey?.split("/");
      let count = 1;
      for(let i = 0; i < temp?.length - 1; i += 2) {
        if(count == 1) {
          compositeKeyLevels[`level${count}`] = `${temp[i]}/${temp[i+1]}`
        } else {
          compositeKeyLevels[`level${count}`] = `${compositeKeyLevels[`level${count - 1}`]}/${temp[i]}/${temp[i+1]}`
        }
        count++;
      }

      const level2 = tipsTarget['configEntry']?.children.filter(item => item.compositeKey === compositeKeyLevels.level2 + `/${temp[temp?.length - 1]}`)[0]
      const level3 = level2?.children.filter(item => item.compositeKey === compositeKeyLevels.level3 + `/${temp[temp?.length - 1]}`)[0]
      const level4 = level3?.children.filter(item => item.compositeKey === compositeKeyLevels.level4 + `/${temp[temp?.length - 1]}`)[0]

      setValue('tipTitle', currentTip?.title, { shouldValidate: true })
      setValue('tipDescription', currentTip?.description, { shouldValidate: true })
      setValue('tipTargetLevel1', tipsTarget['configEntry']?.name, { shouldValidate: true })
      if(level2) {
        setValue('tipTargetLevel2', level2?.name, { shouldValidate: true })
        setOptions12(level2?.uuid)
        setTargetOrganisation(level2?.uuid)
      }
      if(level3) {
        setValue('tipTargetLevel3', level3?.name, { shouldValidate: true })
        setOptions131(level3?.uuid)
        setTargetOrganisation(level3?.uuid)
      }
      if(level4) {
        setValue('tipTargetLevel4', level4?.name, { shouldValidate: true })
        setTargetOrganisation(level4?.uuid)
      }
      
      compositeKeyLevels.level1 = '';
      compositeKeyLevels.level2 = '';
      compositeKeyLevels.level3 = '';
      compositeKeyLevels.level4 = '';

    }
  }, [loaded, tipsTarget])

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
      imageLink: "https://cdn-icons-png.flaticon.com/512/189/189667.png"
    }
    // console.log(data)
    dispatch(
      tipsActions.createTip({}),
      // tipsActions.createTip(data),
    );
    // setShowTipsFormModal(true);
    // setSuccessTipsModal(true);
    setTipsFormModalAction("create")
  }

  const handleEditTip = () => {
    const data = {
      uuid: params['tipUuid'],
      title: methods.getValues('tipTitle'),
      description: methods.getValues('tipDescription'),
      key: `/${Math.random().toFixed(5)}`,
      targetOrganisation: {
        uuid: targetOrganisation
      },
      imageLink: "https://cdn-icons-png.flaticon.com/512/189/189667.png"
    }
    // console.log(data)
    dispatch(
      tipsActions.createTip({}),
      // tipsActions.createTip(data),
    );
    setTipsFormModalAction("edit")
  }

  //TODO: написати функцію, яка буде отримувати екшн і показувати модалки(додатковий параметр - success)
  useEffect(() => {
    if(tipsMeta?.error) {
      console.log('a')
      setShowTipsFormModal(true);
      setSuccessTipsModal(true);
      setTipsFormModalAction("failure")
    }

  }, [tipsMeta])

  const submitForm = (e) => {
    if(mode === 'edit') {
      handleSubmit(handleEditTip)(e);
    } else {
      handleSubmit(handleCreateTip)(e);
    }
  };

  const handleDiscard = () => {
    if(isDirty) {
      setTipsFormModalAction("discard")
      setShowTipsFormModal(true)
    } else {
      setTipsTarget({})
      history.push(buildPath(`${Page.TIPS}`))
    }
  }

  const confirmDeleteTip = () => {
    setTipsFormModalAction("confirmDelete")
    setShowTipsFormModal(true)
  }

  const handleDeleteTip = () => {
    dispatch(
      tipsActions.deleteTip({ uuid: params['tipUuid'], withHistory: true}),
    );
  }

  return (
    <ModalWithHeader title={mode !== "create" ? 'Edit Tip' : 'Create Tip' } containerRule={modalWrapper} modalPosition="middle" closeOptions={{
      closeOptionContent: <Icon graphic="close" />,
      // closeOptionStyles: {}
      onClose: () => handleDiscard()
    }}>
      { showTipsFormModal && !successTipsFormModal && 
          <TipsFormModal 
            negativeBtnAction={() => setShowTipsFormModal(false)} 
            action={tipsFormModalAction}
            positiveBtnAction={() => {
              if(tipsFormModalAction === 'confirmDelete') {
                setTipsFormModalAction("successDelete")
                handleDeleteTip()
              } else {
                history.push(buildPath(`${Page.TIPS}`))
              }
            }}
            tipTitle={currentTip.title}
          /> 
      }
      <div className={css(modalInner)}>
        <form className={css({ height: '100%', })}>
          <div className={css(formFieldsWrapStyle)}>
            <GenericItemField
              name={'tipTitle'}
              methods={methods}
              label='Title'
              Wrapper={Item}
              // Wrapper={({ children }) => <Item label='Title' withIcon={false}>{children}</Item>}
              Element={Input}
              placeholder='Example: Share objectives easily'
            />
            <GenericItemField
              name={'tipDescription'}
              methods={methods}
              label='Description'
              Wrapper={Item}
              Element={Textarea}
              placeholder='Example: Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus'
              rows={2}
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
                setTargetOrganisation(value);
                resetField('tipTargetLevel2');
                resetField('tipTargetLevel3');
                resetField('tipTargetLevel4');
              }}
            />
            <GenericItemField
              name={'tipTargetLevel2'}
              methods={methods}
              Wrapper={({ children }) => <Item label='Level 2' withIcon={false}>{children}</Item>}
              Element={Select}
              options={options2}
              onChange={(_, value) => {
                setOptions12(value)
                setTargetOrganisation(value)
              }}
              placeholder='Please select'
            />
            <GenericItemField
              name={'tipTargetLevel3'}
              methods={methods}
              Wrapper={({ children }) => <Item label='Level 3' withIcon={false}>{children}</Item>}
              Element={Select}
              options={options3}
              onChange={(_, value) => {
                setOptions131(value);
                setTargetOrganisation(value)
              }}
              placeholder='Please select'
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
              }}
              placeholder='Please select'
            />
            { mode === 'edit' && 
                <IconButton 
                  onPress={confirmDeleteTip} 
                  graphic='trash'
                  iconStyles={{ marginRight: '5px' }}
                  customVariantRules={{
                    default: deleteTipBtnStyles,
                  }}
                >Delete this tip</IconButton>
            }
          </div>
          <div className={css(formControlBtnsWrap)}>
            <Button 
              onPress={handleDiscard} 
              mode="inverse" 
              styles={[formControlBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
            >
              Discard
            </Button>
            <Button 
              isDisabled={!isDirty || !isValid}
              onPress={submitForm} 
              styles={[formControlBtn]}
            >
              {mode === 'create' && 'Create new tip'}
              {mode === 'edit' && 'Confirm changes'}
            </Button>
          </div>
        </form>
      </div>
      { showTipsFormModal && successTipsFormModal &&
          <TipsFormModal 
            negativeBtnAction={() => setShowTipsFormModal(false)} 
            action={tipsFormModalAction}
            positiveBtnAction={() => history.push(buildPath(`${Page.TIPS}`))}
          /> 
      }
    </ModalWithHeader>
  )
}

const modalWrapper: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: 0,
    maxWidth: '640px',
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

const formFieldsWrapStyle: Rule = () => {
  return {
    overflowY: 'auto', 
    height: '100%',
  }
}

const hrSeparatorLine: Rule = ({ theme }) => {
  return {
    height: '1px',
    background: theme.colors.backgroundDarkest,
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
    background: '#fff',
    borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
    ...(mobileScreen
      ?
      { 
        padding: '0 10px', 
      }
      :
      { 
        padding: '0 40px', 
        borderRadius: '0 0 32px 32px',
      }
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

const deleteTipBtnStyles: Rule = () => {
  return { 
    fontWeight: 700, 
    fontSize: '14px', 
    lineHeight: '18px', 
    padding: '5px 0', 
    color: `${theme.colors.error}`,
    marginBottom: '20px',
  }
}

export default TipsForm;