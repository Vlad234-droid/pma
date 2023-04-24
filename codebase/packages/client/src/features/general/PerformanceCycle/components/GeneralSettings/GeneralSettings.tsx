import React, { FC, useEffect, useMemo } from 'react';
import { getProcessTemplateSelector, performanceCycleMappingKeys, ProcessTemplateActions } from '@pma/store';
import { useDispatch, useSelector } from 'react-redux';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { FieldValues } from 'react-hook-form';

import { useTranslation } from 'components/Translation';
import { Field, Input, Item } from 'components/Form';
import { TileWrapper } from 'components/Tile';
import SelectWithSearch from 'components/Form/SelectWithSearch';
import Select from 'components/Form/Select';
import get from 'lodash.get';
import { FileExtensions } from 'config/enum';

type Props = {
  formValues: FieldValues;
  setValue: FieldValues;
  errors: FieldValues;
  canEdit: boolean;
  changeTemplate: <T extends { uuid: string }>(template: T) => void;
};

const GeneralSettings: FC<Props> = ({ formValues, setValue, errors, canEdit, changeTemplate }) => {
  const { t } = useTranslation();
  const { css } = useStyle();
  const dispatch = useDispatch();
  const mappingKeys = useSelector(performanceCycleMappingKeys);
  const templatesList = useSelector(getProcessTemplateSelector) || [];
  const list = templatesList?.map(({ fileName = '', description = '', uuid = '' }) => ({
    value: uuid,
    label: description,
    description: fileName,
  }));
  const mappingKeyOptions = useMemo(() => mappingKeys.map((value) => ({ label: value, value })), [mappingKeys]);

  useEffect(() => {
    dispatch(
      ProcessTemplateActions.getProcessTemplate({
        path_eq: 'cycles',
        type_eq: FileExtensions.BPMN,
      }),
    );
  }, []);

  return (
    <TileWrapper
      customStyle={{
        margin: '24px 19px 0px 32px',
        padding: '25px',
        maxWidth: '1300px',
        overflowY: 'visible',
        width: '93%',
      }}
    >
      <div className={css(titleStyle)}>1. {t('general_settings', 'General settings')}</div>
      <Field
        name={'name'}
        Wrapper={Item}
        label={t('cycle_name', 'Cycle name')}
        Element={Input}
        placeholder={'Enter performance cycle name'}
        value={formValues.name}
        setValue={setValue}
        error={get(errors, 'name.message')}
        readonly={!canEdit}
      />
      <Field
        name={'entryConfigKey'}
        Wrapper={Item}
        label={t('cycle_group', 'Cycle group')}
        Element={Select}
        options={mappingKeyOptions}
        placeholder={'Select cycle group'}
        value={formValues.entryConfigKey}
        setValue={setValue}
        error={get(errors, 'entryConfigKey.message')}
        readonly={!canEdit}
      />
      <Field
        name={'template'}
        Wrapper={Item}
        label={t('template', 'Template')}
        Element={SelectWithSearch}
        options={list}
        placeholder={'Choose Template'}
        value={formValues?.template?.uuid}
        onChange={(e) => {
          const uuid = e.target.value;
          const template = templatesList?.find(({ uuid: templateUuid }) => templateUuid === uuid) || {};
          changeTemplate(template);
        }}
        error={get(errors, 'template.message')}
        readonly={!canEdit}
      />
      <div className={css({ marginBottom: '23px' })}>{get(formValues, 'template.fileName', '')}</div>
    </TileWrapper>
  );
};

const titleStyle: Rule = (theme) => ({
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f20.fontSize,
  marginBottom: '8px',
});

export default GeneralSettings;
