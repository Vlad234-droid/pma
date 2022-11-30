import React, { FC, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import get from 'lodash.get';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rule, useStyle } from '@pma/dex-wrapper';
import {
  ColleagueFilterAction,
  ColleagueSimpleAction,
  colleagueSimpleMetaSelector,
  getColleagueFilterSelector,
} from '@pma/store';

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
import { CalibrationSessionUiType } from '../../types';
import { createSchema } from '../../config';
import { filterToRequest } from '../../utils';

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
  const dispatch = useDispatch();

  const { loading: colleagueSimpleLoading, loaded: colleagueSimpleLoaded } =
    useSelector(colleagueSimpleMetaSelector) || [];
  const colleagueFilter = useSelector(getColleagueFilterSelector) || {};

  const [isVisibleFilterModal, setFilterModal] = useState<boolean>(false);
  const [savedFilter, setSavedFilter] = useState<any>(defaultValues.filter || {});

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(createSchema),
    defaultValues,
  });

  const {
    formState: { errors, isValid },
    getValues,
    setValue,
    reset,
  } = methods;

  const formValues = getValues();

  const handleAddColleagues = (colleagues) => {
    setValue('colleaguesAdd', colleagues, { shouldDirty: true, shouldValidate: true });
  };
  const handleRemoveColleague = (colleagues) => {
    setValue('colleaguesRemoved', colleagues, { shouldDirty: true, shouldValidate: true });
  };
  const handleFilter = (filter) => {
    setValue('filter', filter, { shouldDirty: true, shouldValidate: true });
    dispatch(ColleagueSimpleAction.getColleagueSimple(filterToRequest(filter)));
  };

  const handleBlur = (fieldName: string | any) => {
    setValue(fieldName, getValues(fieldName), { shouldValidate: true, shouldTouch: true });
  };

  const handleRemoveCancellation = () => {
    setSavedFilter({});
    setValue('filter', {}, { shouldDirty: true, shouldValidate: true });
    dispatch(ColleagueSimpleAction.getColleagueSimple({}));
  };

  const updateFilter = useCallback((data) => {
    dispatch(ColleagueFilterAction.getColleagueFilter(filterToRequest(data)));
  }, []);

  useEffect(() => {
    if (!colleagueSimpleLoading && colleagueSimpleLoaded) {
      reset({
        ...formValues,
        colleaguesRemoved: defaultValues.colleaguesRemoved,
        colleaguesAdd: defaultValues.colleaguesAdd,
      });
    }
  }, [colleagueSimpleLoading, colleagueSimpleLoaded]);

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
          </IconButton>
        </div>
        {colleagueSimpleLoading ? (
          <Spinner />
        ) : (
          <ColleaguesRemover
            colleaguesRemoved={formValues.colleaguesRemoved || []}
            onRemove={handleRemoveColleague}
            onCancel={handleRemoveCancellation}
            filter={savedFilter}
          />
        )}
        <div className={css({ padding: '30px 0' })}>
          <div className={css(labelTextStyle)}>Add or remove people</div>
          <div>
            {colleagueSimpleLoading ? (
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
                onCancel={onClose}
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
