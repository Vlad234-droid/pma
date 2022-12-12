import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConditionOperandEnum } from '@pma/openapi';
import * as Yup from 'yup';
import get from 'lodash.get';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { ColleagueFilterAction, getColleagueFilterSelector } from '@pma/store';

import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { SearchOption } from 'config/enum';
import { Input, Textarea, Item as FormItem, Field } from 'components/Form';
import { Trans, useTranslation } from 'components/Translation';
import { IconButton, Position } from 'components/IconButton';
import Datepicker from 'components/Datepicker';
import UnderlayModal from 'components/UnderlayModal';
import FilterForm from 'components/FilterForm';
import Spinner from 'components/Spinner';

import { Buttons } from '../Buttons';
import { ColleaguesRemover } from '../ColleaguesRemover';
import { ColleaguesFinder } from '../ColleaguesFinder';
import { CalibrationSessionUiType, ColleagueSimpleExtended } from '../../types';
import { createSchema } from '../../config';
import { filterToRequest, prepareColleaguesForUI, getSelectedGroups } from '../../utils';
import useColleagueSimple from '../../hooks/useColleagueSimple';

type Props = {
  defaultValues: CalibrationSessionUiType;
  canEdit: boolean;
  onSubmit: (data: CalibrationSessionUiType) => void;
  onSaveAndExit: (data: CalibrationSessionUiType) => void;
};

const Form: FC<Props> = ({ defaultValues, canEdit, onSaveAndExit, onSubmit }) => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { participants: { filters = [] } = {} } = defaultValues;

  const [savedFilter, setSavedFilter] = useState<any>(defaultValues.filter || {});
  const dispatch = useDispatch();

  const colleagueFilter = useSelector(getColleagueFilterSelector) || {};

  const [isVisibleFilterModal, setFilterModal] = useState<boolean>(false);

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createSchema(t)),
    defaultValues,
  });

  const {
    formState: { errors, isValid },
    getValues,
    setValue,
    reset,
  } = methods;

  const formValues = getValues();
  const selectedGroupLength = getSelectedGroups(colleagueFilter, formValues.filter)?.length || null;

  const {
    colleagues: colleaguesRemover,
    loading: colleaguesRemoverLoading,
    loaded: colleaguesRemoverLoaded,
  } = useColleagueSimple(filterToRequest(savedFilter));
  const {
    colleagues: colleaguesFinder,
    loading: colleaguesFinderLoading,
    loaded: colleaguesFinderLoaded,
  } = useColleagueSimple({});

  const handleAddColleagues = (colleagues) => {
    const add = colleagues?.filter(({ type }) => type === 'add');
    const remove = colleagues?.filter(({ type }) => type === 'remove');
    setValue('colleaguesAdd', add, { shouldDirty: true, shouldValidate: true });
    setValue('colleaguesRemoved', [...formValues.colleaguesRemoved, ...remove], {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemoveColleague = (colleagues) => {
    setValue('colleaguesRemoved', colleagues, { shouldDirty: true, shouldValidate: true });
  };

  const handleFilter = (filter) => {
    setValue('filter', filter, { shouldDirty: true, shouldValidate: true });
  };

  const handleBlur = (fieldName: string | any) => {
    setValue(fieldName, getValues(fieldName), { shouldValidate: true, shouldTouch: true });
  };

  const handleRemoveCancellation = () => {
    setSavedFilter({});
    setValue('filter', {}, { shouldDirty: true, shouldValidate: true });
    dispatch(ColleagueFilterAction.getColleagueFilter({}));
  };

  const updateFilter = useCallback((data) => {
    dispatch(ColleagueFilterAction.getColleagueFilter(filterToRequest(data)));
  }, []);

  useEffect(() => {
    if (colleaguesRemoverLoaded && colleaguesFinderLoaded) {
      reset({
        ...formValues,
        colleaguesRemoved: prepareColleaguesForUI(colleaguesRemover, filters, ConditionOperandEnum.NotIn),
        colleaguesAdd: prepareColleaguesForUI(colleaguesFinder, filters, ConditionOperandEnum.In),
      });
    }
  }, [colleaguesRemoverLoaded, colleaguesFinderLoaded]);

  const colleaguesRemoverIds = colleaguesRemover.map(({ colleague }) => colleague?.uuid);
  const allColleagues = colleaguesFinder.map(({ colleague, includedToAnotherSession }) => {
    return {
      ...colleague,
      type: includedToAnotherSession
        ? 'disabled'
        : colleague?.uuid && colleaguesRemoverIds.includes(colleague.uuid)
        ? 'remove'
        : 'add',
    } as ColleagueSimpleExtended;
  });

  return (
    <form data-test-id={'CALIBRATION_SESSION_FORM_MODAL'}>
      <div className={css(formContainerStyle)}>
        <Field
          name={'title'}
          Wrapper={FormItem}
          label={'**Calibration title**'}
          Element={Input}
          placeholder={'Add title here'}
          value={formValues.title}
          setValue={setValue}
          error={get(errors, 'title.message')}
          readonly={!canEdit}
        />
        <Field
          name={'startTime'}
          Wrapper={FormItem}
          label={'**Day**'}
          Element={Datepicker}
          placeholder={'DD/MM/YY'}
          value={formValues.startTime}
          setValue={setValue}
          error={get(errors, 'startTime.message')}
          readonly={!canEdit}
        />
        <div className={css(dataLineStyle)}>
          <div></div>
        </div>
        <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
          <div className={css(labelTextStyle)}>Add groups / departments to calibration session</div>
          <IconButton
            onPress={() => setFilterModal(true)}
            customVariantRules={{ default: iconBtnAddStyle }}
            graphic='add'
            iconStyles={{ marginRight: '5px' }}
            iconPosition={Position.LEFT}
            iconProps={{ title: `Filter and add`, fill: '#fff', size: '16px' }}
          >
            <Trans i18nKey='filter_and_add'>Filter and add</Trans>
            {selectedGroupLength ? ` (${selectedGroupLength})` : ''}
          </IconButton>
        </div>
        {colleaguesRemoverLoading ? (
          <Spinner />
        ) : (
          <ColleaguesRemover
            colleaguesRemoved={formValues.colleaguesRemoved || []}
            onRemove={handleRemoveColleague}
            onCancel={handleRemoveCancellation}
            filter={savedFilter}
            colleagues={colleaguesRemover}
          />
        )}
        <div className={css({ padding: '30px 0' })}>
          <div className={css(labelTextStyle)}>Add or remove people</div>
          <div>
            {colleaguesFinderLoading ? (
              <Spinner />
            ) : (
              <ColleaguesFinder
                searchOption={SearchOption.NAME}
                onSelect={handleAddColleagues}
                onBlur={() => handleBlur('colleaguesAdd')}
                selected={formValues.colleaguesAdd || []}
                error={errors['colleaguesAdd']?.message?.replace('colleaguesAdd', t('colleagues', 'Colleagues'))}
                customStyles={{ marginTop: '0px', width: '100%' }}
                inputStyles={{ paddingLeft: '36.7px' }}
                withIcon={false}
                marginBot={false}
                customIcon={true}
                multiple={true}
                colleagues={allColleagues}
              />
            )}
          </div>
        </div>
        <Field
          name={'description'}
          Wrapper={FormItem}
          label={'**Add a comment**'}
          Element={Textarea}
          placeholder={'Add comments here'}
          value={formValues.description}
          setValue={setValue}
          error={get(errors, 'description.message')}
          readonly={!canEdit}
        />
        {isVisibleFilterModal && (
          <UnderlayModal onClose={() => setFilterModal(false)} styles={{ maxWidth: !mobileScreen ? '500px' : '100%' }}>
            {({ onClose }) => (
              <FilterForm
                defaultValues={savedFilter}
                onCancel={() => {
                  handleRemoveCancellation();
                  onClose();
                }}
                filters={colleagueFilter as { [key: string]: Array<{ [key: string]: string }> }}
                onSubmit={(data) => {
                  onClose();
                  setTimeout(() => {
                    setSavedFilter(data);
                    handleFilter(data);
                  }, 300);
                }}
                onUpdate={(data) => {
                  setSavedFilter(data);
                  updateFilter(data);
                }}
              />
            )}
          </UnderlayModal>
        )}
        {canEdit && (
          <Buttons
            isValid={isValid}
            onSave={() => onSubmit(formValues)}
            onSaveDraft={() => onSaveAndExit(formValues)}
          />
        )}
      </div>
    </form>
  );
};

const formContainerStyle: Rule = {
  padding: '20px 0 20px 0',
};

const dataLineStyle: Rule = ({ theme }) => ({
  padding: '20px 0',
  '& > div': {
    //@ts-ignore
    borderTop: `2px solid ${theme.colors.lightGray}`,
  },
});

const iconBtnAddStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  letterSpacing: '0px',
  background: theme.colors.tescoBlue,
  color: theme.colors.white,
  padding: '8px 16px',
  borderRadius: '32px',
  fontWeight: theme.font.weight.bold,
});

const labelTextStyle: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fluid.f16.lineHeight,
  fontWeight: theme.font.weight.bold,
  letterSpacing: '0px',
});

export default Form;
