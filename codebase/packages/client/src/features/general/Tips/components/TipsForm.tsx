import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Page } from 'pages';
import {
  ConfigEntriesActions,
  configEntriesMetaSelector,
  configEntriesSelector,
  getCurrentTipSelector,
  getTipsMetaSelector,
  tipsActions,
} from '@pma/store';
import { buildPath } from 'features/general/Routes/utils';
import { Button, CreateRule, Icon, ModalWithHeader, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { Attention, Input, Item, Select, Textarea } from 'components/Form';
import { GenericItemField } from 'components/GenericForm';
import { IconButton } from 'components/IconButton';
import { createTipSchema } from 'pages/general/Tips/config';
import { TipsFormModal } from '.';
import { useTranslation } from 'components/Translation';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

export type TipsFormProps = {
  mode: string;
};

export const TIPS_FORM = 'tips-form';
export const TIPS_FORM_SUBMIT_BTN = 'tips-form-submit-btn';
export const TIPS_FORM_DISCARD_BTN = 'tips-form-discard-btn';
export const TIPS_FORM_MODAL_PLACEHOLDER = 'tips-form-modal-placeholder';

const TipsForm: FC<TipsFormProps> = ({ mode }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createTipSchema),
  });
  const {
    handleSubmit,
    formState: { isValid, isDirty, isSubmitted },
    setValue,
  } = methods;
  const { tipUuid } = params;

  const configEntries = useSelector(configEntriesSelector);
  const configEntriesMeta = useSelector(configEntriesMetaSelector);
  const currentTip = useSelector(getCurrentTipSelector);
  const tipsMeta = useSelector(getTipsMetaSelector);

  const [showTipsFormModal, setShowTipsFormModal] = useState(false);
  const [successTipsFormModal, setSuccessTipsModal] = useState(false);
  const [showEffectsPlaceholder, setShowEffectsPlaceholder] = useState(false);
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
      dispatch(tipsActions.getTipByUuid(tipUuid));
    }
  }, []);

  useEffect(() => {
    if (mode === 'edit') {
      setValue('tipTitle', formData['tipTitle']);
      setValue('tipDescription', formData['tipDescription']);
    }
    setValue('tipTargetLevel1', formData['tipTargetLevel1'], { shouldValidate: true });
    setValue('tipTargetLevel2', formData['tipTargetLevel2'], { shouldValidate: true });
    setValue('tipTargetLevel3', formData['tipTargetLevel3'], { shouldValidate: true });
    setValue('tipTargetLevel4', formData['tipTargetLevel4'], { shouldValidate: true });
  }, [formData]);

  useEffect(() => {
    if (configEntriesMeta.loaded) {
      if (Object.keys(currentTip).length > 0) {
        const temp = currentTip.targetOrganisation.compositeKey.split('/');
        const level1TargetCompositeKey = `${temp[0]}/${temp[1]}/${temp[temp.length - 1]}`;
        const configEntry = configEntries.filter((item) => item.compositeKey === level1TargetCompositeKey)[0];
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
  }, [configEntriesMeta.loaded, tipsMeta.loading]);

  // TODO: this is hard to read. Refactor this
  useEffect(() => {
    if (configEntries) {
      setLevel1Options(configEntries);
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

        const configEntry = configEntries.filter(
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
                tipTargetLevel1: configEntry.uuid,
                tipTargetLevel2: level2?.uuid || '',
                tipTargetLevel3: level3?.uuid || '',
                tipTargetLevel4: level4?.uuid || '',
              });
            }
            setLevel2Options(configEntry.children);
          } else {
            const configEntry2 = configEntries.filter((item) => item.uuid === formData['tipTargetLevel1'])[0];
            setLevel2Options(configEntry2.children);
          }
        }
      }
      if (configEntries.length > 0 && mode === 'create') {
        const configEntry = configEntries.filter((item) => item.uuid === formData['tipTargetLevel1'])[0];
        if (configEntry) {
          setLevel2Options(configEntry.children);
        }
      }
    }
  }, [configEntries, tipsMeta.loaded]);

  useEffect(() => {
    const temp = level2Options.filter((item) => item['uuid'] === formData['tipTargetLevel2'])[0];
    if (temp) {
      setLevel3Options(temp['children']);
    }
  }, [formData['tipTargetLevel2']]);

  useEffect(() => {
    const temp = level3Options.filter((item) => item['uuid'] === formData['tipTargetLevel3'])[0];
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
    dispatch(tipsActions.createTip(data));
    setTipsFormModalAction('create');
  };

  const handleEditTip = () => {
    const data = {
      uuid: tipUuid,
      title: methods.getValues('tipTitle'),
      description: methods.getValues('tipDescription'),
      key: `/${Math.random().toFixed(5)}`,
      targetOrganisation: {
        uuid: targetOrganisation,
      },
      imageLink: 'https://cdn-icons-png.flaticon.com/512/189/189667.png',
    };
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
    setShowEffectsPlaceholder(true);
    if (mode === 'edit') {
      handleSubmit(handleEditTip)(e);
    } else {
      handleSubmit(handleCreateTip)(e);
    }
  };

  const handleDiscard = () => {
    if (isDirty && tipsFormModalAction === 'discard') {
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
      navigate(buildPath(`${Page.TIPS}`));
    }
  };

  const confirmDeleteTip = () => {
    showModal('confirmDelete', false);
    setShowEffectsPlaceholder(true);
  };

  const handleDeleteTip = () => {
    dispatch(tipsActions.deleteTip({ uuid: tipUuid, withHistory: true }));
    setShowTipsFormModal(false);
    setTipsFormModalAction('successDelete');
  };

  return (
    <ModalWithHeader
      title={mode === 'create' ? t('create_tip', 'Create Tip') : t('edit_tip', 'Edit Tip')}
      containerRule={modalWrapper({ mobileScreen })}
      modalPosition='middle'
      closeOptions={{
        closeOptionContent: <Icon graphic='close' />,
        onClose: () => handleDiscard(),
      }}
    >
      {showTipsFormModal && !successTipsFormModal && (
        <TipsFormModal
          negativeBtnAction={() => {
            setShowTipsFormModal(false);
            setShowEffectsPlaceholder(false);
          }}
          action={tipsFormModalAction}
          positiveBtnAction={() => {
            if (tipsFormModalAction === 'confirmDelete') {
              handleDeleteTip();
            } else {
              navigate(buildPath(`${Page.TIPS}`));
            }
          }}
          tipTitle={currentTip.title}
        />
      )}
      <div className={css(modalInner({ mobileScreen }))} data-test-id={TIPS_FORM}>
        {showEffectsPlaceholder && (
          <div data-test-id={TIPS_FORM_MODAL_PLACEHOLDER} className={css(modalInnerPlaceholder)} />
        )}
        <form className={css({ height: '100%' })}>
          <div className={css(formFieldsWrapStyle)}>
            <Attention />
            <GenericItemField
              name={'tipTitle'}
              methods={methods}
              label={t('title', 'Title')}
              Wrapper={Item}
              Element={Input}
              onChange={(value) => setValue('tipTitle', value, { shouldDirty: true })}
              placeholder={t('share_objectives_easily', 'Example: Share objectives easily')}
              value={formData['tipTitle']}
            />
            <GenericItemField
              name={'tipDescription'}
              methods={methods}
              label={t('description', 'Description')}
              Wrapper={Item}
              Element={Textarea}
              onChange={(value) => setValue('tipDescription', value, { shouldDirty: true })}
              placeholder='Example: Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus'
              rows={2}
              value={formData['tipDescription']}
            />

            <div className={css(hrSeparatorLine)} />

            <GenericItemField
              name={'tipTargetLevel1'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label={`${t('level', 'Level')} 1`} withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level1Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              placeholder={t('please_select', 'Please select')}
              onChange={(value) => {
                if (value) {
                  setValue('tipTargetLevel1', value, { shouldDirty: true });
                  setFormData({
                    tipTitle: methods.getValues('tipTitle'),
                    tipDescription: methods.getValues('tipDescription'),
                    tipTargetLevel1: value,
                    tipTargetLevel2: '',
                    tipTargetLevel3: '',
                    tipTargetLevel4: '',
                  });
                  setTargetOrganisation(value);
                  const configEntry = level1Options.filter((item) => item['uuid'] === value)[0];
                  dispatch(ConfigEntriesActions.getConfigEntriesByUuid({ uuid: configEntry['uuid'] }));
                }
              }}
              value={formData['tipTargetLevel1']}
            />

            <GenericItemField
              name={'tipTargetLevel2'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label={`${t('level', 'Level')} 2`} withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level2Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              onChange={(value) => {
                setValue('tipTargetLevel2', value, { shouldDirty: true });
                setFormData({
                  ...formData,
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel2: value,
                  tipTargetLevel3: '',
                  tipTargetLevel4: '',
                });
                setTargetOrganisation(value);
              }}
              placeholder={t('please_select', 'Please select')}
              value={formData['tipTargetLevel2']}
            />
            <GenericItemField
              name={'tipTargetLevel3'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label={`${t('level', 'Level')} 3`} withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level3Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              onChange={(value) => {
                setValue('tipTargetLevel3', value, { shouldDirty: true });
                setFormData({
                  ...formData,
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel3: value,
                  tipTargetLevel4: '',
                });
                setTargetOrganisation(value);
              }}
              placeholder={t('please_select', 'Please select')}
              value={formData['tipTargetLevel3']}
            />
            <GenericItemField
              name={'tipTargetLevel4'}
              methods={methods}
              Wrapper={({ children }) => (
                <Item label={`${t('level', 'Level')} 4`} withIcon={false}>
                  {children}
                </Item>
              )}
              Element={Select}
              options={level4Options.map((item) => {
                return { value: item['uuid'], label: item['name'] };
              })}
              onChange={(value) => {
                setValue('tipTargetLevel4', value, { shouldDirty: true });
                setFormData({
                  ...formData,
                  tipTitle: methods.getValues('tipTitle'),
                  tipDescription: methods.getValues('tipDescription'),
                  tipTargetLevel4: value,
                });
                setTargetOrganisation(value);
              }}
              placeholder={t('please_select', 'Please select')}
              value={formData['tipTargetLevel4']}
            />
            {mode === 'edit' && (
              <IconButton
                onPress={confirmDeleteTip}
                graphic='delete'
                iconStyles={{ width: '24px', height: '24px', display: 'block' }}
                customVariantRules={{
                  default: deleteTipBtnStyles,
                }}
              >
                Delete this tip
              </IconButton>
            )}
          </div>
          <div className={css(formControlBtnsWrap({ mobileScreen }))}>
            <Button
              onPress={handleDiscard}
              mode='inverse'
              styles={[formControlBtn, { border: `2px solid ${theme.colors.tescoBlue}` }]}
              data-test-id={TIPS_FORM_DISCARD_BTN}
            >
              Discard
            </Button>
            <Button
              isDisabled={!isDirty || !isValid}
              onPress={submitForm}
              styles={[formControlBtn]}
              data-test-id={TIPS_FORM_SUBMIT_BTN}
            >
              {mode === 'create' && t('create_new_tip', 'Create new tip')}
              {mode === 'edit' && t('confirm_changes', 'Confirm changes')}
            </Button>
          </div>
        </form>
      </div>
      {showTipsFormModal && successTipsFormModal && (
        <TipsFormModal
          negativeBtnAction={() => setShowTipsFormModal(false)}
          action={tipsFormModalAction}
          positiveBtnAction={() => navigate(buildPath(`${Page.TIPS}`))}
          tipTitle={currentTip.title}
        />
      )}
    </ModalWithHeader>
  );
};

const modalWrapper: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
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
});

const modalInner: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  padding: mobileScreen ? '30px 15px 100px' : '40px 40px 100px',
  height: '100%',
});

const formFieldsWrapStyle: Rule = () => {
  return {
    overflowY: 'auto',
    height: '100%',
  };
};

const hrSeparatorLine: Rule = ({ theme }) => {
  return {
    height: '2px',
    background: theme.colors.backgroundDarkest,
    marginBottom: '25px',
  };
};

const formControlBtnsWrap: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '100px',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  background: '#fff',
  // @ts-ignore
  borderTop: `2px solid ${theme.colors.lightGray}`,
  ...(mobileScreen
    ? {
        padding: '0 10px',
      }
    : {
        padding: '0 40px',
        borderRadius: '0 0 32px 32px',
      }),
});

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
    color: theme.colors.error,
    marginBottom: '20px',
  };
};

const modalInnerPlaceholder: Rule = ({ theme }) => {
  return {
    backgroundColor: theme.colors.white,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    borderRadius: '32px',
  };
};

export default TipsForm;
