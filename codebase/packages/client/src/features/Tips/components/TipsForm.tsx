import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Page } from 'pages';
import {
  ConfigEntriesActions,
  tipsActions,
  getCurrentTipSelector,
  getTipsMetaSelector,
  configEntriesSelector,
} from '@pma/store';
import { buildPath } from 'features/Routes/utils';
import { useStyle, Rule, useBreakpoints, Button, ModalWithHeader, Icon, theme } from '@dex-ddl/core';
import { Input, Item, Textarea, Select } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { IconButton } from 'components/IconButton';
import { createTipSchema } from 'pages/Tips/config';
import { TipsFormModal } from '.';

export type TipsFormProps = {
  mode: string;
};

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
    formState: { isValid, isDirty, isSubmitted },
    setValue,
  } = methods;

  const configEntries = useSelector(configEntriesSelector);
  const currentTip = useSelector(getCurrentTipSelector);
  const tipsMeta = useSelector(getTipsMetaSelector);

  const [showTipsFormModal, setShowTipsFormModal] = useState(false);
  const [successTipsFormModal, setSuccessTipsModal] = useState(false);
  const [tipsFormModalAction, setTipsFormModalAction] = useState('discard');
  const [formData, setFormData] = useState({
    tipTitle: '',
    tipDescription: '',
    tipTargetLevel1: '',
    tipTargetLevel2: '',
    tipTargetLevel3: '',
    tipTargetLevel4: '',
  });
  const [level1Options, setLevel1Options] = useState([]);
  const [level2Options, setLevel2Options] = useState([]);
  const [level3Options, setLevel3Options] = useState([]);
  const [level4Options, setLevel4Options] = useState([]);
  const [targetOrganisation, setTargetOrganisation] = useState('');

  useEffect(() => {
    dispatch(ConfigEntriesActions.getConfigEntries());
    if (mode === 'edit') {
      dispatch(tipsActions.getTipByUuid(params['tipUuid']));
    }
  }, []);

  useEffect(() => {
    if (mode === 'edit') {
      setValue('tipTitle', formData['tipTitle']);
      setValue('tipDescription', formData['tipDescription']);
    }
    setValue('tipTargetLevel1', formData['tipTargetLevel1']);
    setValue('tipTargetLevel2', formData['tipTargetLevel2']);
    setValue('tipTargetLevel3', formData['tipTargetLevel3']);
    setValue('tipTargetLevel4', formData['tipTargetLevel4']);
  }, [formData]);

  useEffect(() => {
    if (configEntries.meta.loaded) {
      if (Object.keys(currentTip).length > 0) {
        const temp = currentTip.targetOrganisation.compositeKey.split('/');
        const level1TargetCompositeKey = `${temp[0]}/${temp[1]}/${temp[temp.length - 1]}`;
        const configEntry = configEntries.data.filter((item) => item.compositeKey === level1TargetCompositeKey)[0];
        dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: configEntry.uuid }));
        setTargetOrganisation(currentTip.targetOrganisation.uuid);
      }
    }
    setFormData({
      tipTitle: '',
      tipDescription: '',
      tipTargetLevel1: '',
      tipTargetLevel2: '',
      tipTargetLevel3: '',
      tipTargetLevel4: '',
    });
  }, [configEntries.meta.loaded, tipsMeta.loading]);

  useEffect(() => {
    if (configEntries.data) {
      setLevel1Options(configEntries.data);
      if (Object.keys(currentTip).length > 0 && mode === 'edit') {
        const targetCompositeKey = currentTip.targetOrganisation.compositeKey;
        const compositeKeyLevels = {
          level1: '',
          level2: '',
          level3: '',
          level4: '',
        };

        const temp = targetCompositeKey?.split('/');
        let count = 1;
        for (let i = 0; i < temp?.length - 1; i += 2) {
          if (count == 1) {
            compositeKeyLevels[`level${count}`] = `${temp[i]}/${temp[i + 1]}`;
          } else {
            compositeKeyLevels[`level${count}`] = `${compositeKeyLevels[`level${count - 1}`]}/${temp[i]}/${
              temp[i + 1]
            }`;
          }
          count++;
        }

        const configEntry = configEntries.data.filter(
          (item) => item.compositeKey === compositeKeyLevels.level1 + `/${temp[temp?.length - 1]}`,
        )[0];
        if (configEntry?.children?.length > 0) {
          if (!formData['tipTargetLevel1']) {
            const level2 = configEntry.children.filter(
              (item) => item.compositeKey === compositeKeyLevels.level2 + `/${temp[temp?.length - 1]}`,
            )[0];
            const level3 = level2?.children.filter(
              (item) => item.compositeKey === compositeKeyLevels.level3 + `/${temp[temp?.length - 1]}`,
            )[0];
            const level4 = level3?.children.filter(
              (item) => item.compositeKey === compositeKeyLevels.level4 + `/${temp[temp?.length - 1]}`,
            )[0];
            if (Object.keys(formData).length > 0) {
              setFormData({
                tipTitle: currentTip.title,
                tipDescription: currentTip.description,
                tipTargetLevel1: configEntry.name,
                tipTargetLevel2: level2?.name || '',
                tipTargetLevel3: level3?.name || '',
                tipTargetLevel4: level4?.name || '',
              });
            }
            setLevel2Options(configEntry.children);
          } else {
            const configEntry2 = configEntries.data.filter((item) => item.name === formData['tipTargetLevel1'])[0];
            setLevel2Options(configEntry2.children);
          }
        }
      }
      if (mode === 'create') {
        const configEntry = configEntries.data.filter((item) => item.name === formData['tipTargetLevel1'])[0];
        if (configEntry) {
          setLevel2Options(configEntry.children);
        }
      }
    }
  }, [configEntries.data, tipsMeta.loaded]);

  useEffect(() => {
    const temp = level2Options.filter((item) => item['name'] === formData['tipTargetLevel2'])[0];
    if (temp) {
      setLevel3Options(temp['children']);
    }
  }, [formData['tipTargetLevel2']]);

  useEffect(() => {
    const temp = level3Options.filter((item) => item['name'] === formData['tipTargetLevel3'])[0];
    if (temp) {
      setLevel4Options(temp['children']);
    }
  }, [formData['tipTargetLevel3']]);

  const showModal = (action: string, success: boolean) => {
    setShowTipsFormModal(true);
    setSuccessTipsModal(success);
    setTipsFormModalAction(action);
  };

  const handleCreateTip = () => {
    const data = {
      title: methods.getValues('tipTitle'),
      description: methods.getValues('tipDescription'),
      key: `/${Math.random().toFixed(5)}`,
      targetOrganisation: {
        uuid: targetOrganisation,
      },
      imageLink: 'https://cdn-icons-png.flaticon.com/512/189/189667.png',
    };
    // console.log(data)
    dispatch(tipsActions.createTip(data));
    setTipsFormModalAction('create');
  };

  const handleEditTip = () => {
    const data = {
      uuid: params['tipUuid'],
      title: methods.getValues('tipTitle'),
      description: methods.getValues('tipDescription'),
      key: `/${Math.random().toFixed(5)}`,
      targetOrganisation: {
        uuid: targetOrganisation,
      },
      imageLink: 'https://cdn-icons-png.flaticon.com/512/189/189667.png',
    };
    // console.log(data)
    dispatch(tipsActions.createTip(data));
    setTipsFormModalAction('edit');
  };

  useEffect(() => {
    if (tipsMeta?.error) {
      showModal('failure', true);
    } else {
      if (isSubmitted || tipsFormModalAction === 'successDelete') {
        showModal(tipsFormModalAction, true);
      }
    }
  }, [tipsMeta]);

  const submitForm = (e) => {
    if (mode === 'edit') {
      handleSubmit(handleEditTip)(e);
    } else {
      handleSubmit(handleCreateTip)(e);
    }
  };

  const handleDiscard = () => {
    if (isDirty) {
      showModal('discard', false);
    } else {
      setFormData({
        tipTitle: '',
        tipDescription: '',
        tipTargetLevel1: '',
        tipTargetLevel2: '',
        tipTargetLevel3: '',
        tipTargetLevel4: '',
      });
      history.push(buildPath(`${Page.TIPS}`));
    }
  };

  const confirmDeleteTip = () => {
    showModal('confirmDelete', false);
  };

  const handleDeleteTip = () => {
    dispatch(tipsActions.deleteTip({ uuid: params['tipUuid'], withHistory: true }));
    setShowTipsFormModal(false);
    setTipsFormModalAction('successDelete');
  };

  return (
    <ModalWithHeader
      title={mode !== 'create' ? 'Edit Tip' : 'Create Tip'}
      containerRule={modalWrapper}
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='close' />,
        // closeOptionStyles: {}
        onClose: () => handleDiscard(),
      }}
    >
      {showTipsFormModal && !successTipsFormModal && (
        <TipsFormModal
          negativeBtnAction={() => setShowTipsFormModal(false)}
          action={tipsFormModalAction}
          positiveBtnAction={() => {
            if (tipsFormModalAction === 'confirmDelete') {
              handleDeleteTip();
            } else {
              history.push(buildPath(`${Page.TIPS}`));
            }
          }}
          tipTitle={currentTip.title}
        />
      )}
      <div className={css(modalInner)}>
        <form className={css({ height: '100%' })}>
          <div className={css(formFieldsWrapStyle)}>
            <GenericItemField
              name={'tipTitle'}
              methods={methods}
              label='Title'
              Wrapper={Item}
              Element={Input}
              placeholder='Example: Share objectives easily'
              value={formData['tipTitle']}
            />
            <GenericItemField
              name={'tipDescription'}
              methods={methods}
              label='Description'
              Wrapper={Item}
              Element={Textarea}
              placeholder='Example: Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus'
              rows={2}
              value={formData['tipDescription']}
            />
            <div className={css(hrSeparatorLine)}></div>
            <GenericItemField
              name={'tipTargetLevel1'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Level 1' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level1Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              placeholder='Please select'
              onChange={(label, value) => {
                setFormData({
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel1: label,
                  tipTargetLevel2: '',
                  tipTargetLevel3: '',
                  tipTargetLevel4: '',
                });
                setTargetOrganisation(value);
                const configEntry = level1Options.filter((item) => item['name'] === label)[0];
                dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: configEntry['uuid'] }));
              }}
              value={formData['tipTargetLevel1']}
            />
            <GenericItemField
              name={'tipTargetLevel2'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Level 2' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level2Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              onChange={(label, value) => {
                setFormData({
                  ...formData,
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel2: label,
                  tipTargetLevel3: '',
                  tipTargetLevel4: '',
                });
                setTargetOrganisation(value);
              }}
              placeholder='Please select'
              value={formData['tipTargetLevel2']}
            />
            <GenericItemField
              name={'tipTargetLevel3'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Level 3' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level3Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              onChange={(label, value) => {
                setFormData({
                  ...formData,
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel3: label,
                  tipTargetLevel4: '',
                });
                setTargetOrganisation(value);
              }}
              placeholder='Please select'
              value={formData['tipTargetLevel3']}
            />
            <GenericItemField
              name={'tipTargetLevel4'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label='Level 4' withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level4Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              onChange={(label, value) => {
                setFormData({
                  ...formData,
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel4: label,
                });
                setTargetOrganisation(value);
              }}
              placeholder='Please select'
              value={formData['tipTargetLevel4']}
            />
            {mode === 'edit' && (
              <IconButton
                onPress={confirmDeleteTip}
                graphic='delete'
                iconStyles={{ marginRight: '5px' }}
                customVariantRules={{
                  default: deleteTipBtnStyles,
                }}
              >
                Delete this tip
              </IconButton>
            )}
          </div>
          <div className={css(formControlBtnsWrap)}>
            <Button
              onPress={handleDiscard}
              mode='inverse'
              styles={[formControlBtn, { border: `1px solid ${theme.colors.tescoBlue}` }]}
            >
              Discard
            </Button>
            <Button isDisabled={!isDirty || !isValid} onPress={submitForm} styles={[formControlBtn]}>
              {mode === 'create' && 'Create new tip'}
              {mode === 'edit' && 'Confirm changes'}
            </Button>
          </div>
        </form>
      </div>
      {showTipsFormModal && successTipsFormModal && (
        <TipsFormModal
          negativeBtnAction={() => setShowTipsFormModal(false)}
          action={tipsFormModalAction}
          positiveBtnAction={() => history.push(buildPath(`${Page.TIPS}`))}
        />
      )}
    </ModalWithHeader>
  );
};

const modalWrapper: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: 0,
    maxWidth: '640px',
    ...(mobileScreen
      ? {
          width: '100%',
          height: 'calc(100% - 50px)',
          marginTop: '50px',
          borderRadius: '24px 24px 0 0',
        }
      : { width: '60%' }),
  };
};

const modalInner: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.medium || isBreakpoint.small || isBreakpoint.xSmall;
  return {
    padding: mobileScreen ? '30px 15px 100px' : '40px 40px 100px',
    height: '100%',
  };
};

const formFieldsWrapStyle: Rule = () => {
  return {
    overflowY: 'auto',
    height: '100%',
  };
};

const hrSeparatorLine: Rule = ({ theme }) => {
  return {
    height: '1px',
    background: theme.colors.backgroundDarkest,
    marginBottom: '25px',
  };
};

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
      ? {
          padding: '0 10px',
        }
      : {
          padding: '0 40px',
          borderRadius: '0 0 32px 32px',
        }),
  };
};

const formControlBtn: Rule = () => {
  return {
    width: '50%',
    margin: '0 3px',
    fontWeight: 700,
    lineHeight: '20px',
  };
};

const deleteTipBtnStyles: Rule = () => {
  return {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '18px',
    padding: '5px 0',
    color: `${theme.colors.error}`,
    marginBottom: '20px',
  };
};

export default TipsForm;
