import React, { FC, MouseEvent, useEffect, useRef, Fragment } from 'react';
import { Rule, useStyle, CreateRule } from '@pma/dex-wrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues } from 'react-hook-form';
import * as Yup from 'yup';

import { ButtonsWrapper } from 'components/ButtonsWrapper';
import SearchWithField from 'components/SearchWithField';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Checkbox } from 'components/Form';
import Spinner from 'components/Spinner';

import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import useEventListener from 'hooks/useEventListener';
import { useFieldsArray } from './hooks';
import { FilterProps, schema } from './config';

enum FilterType {
  SELECT_ALL = 'Select All',
}

type FilterModalProps = {
  onClose: () => void;
  initialValues: FilterProps;
  onSubmit: (data: FilterProps) => void;
  savedFilter?: any;
  loading?: boolean;
};
type SelectAllProps = {
  onChange: (e: any, value?: string) => any;
  description: string;
  type: string;
  index: string | number;
};

export const FILTER_WRAPPER = 'filter-wrapper';

const FilterModal: FC<FilterModalProps> = ({ onClose, initialValues, onSubmit, savedFilter, loading = false }) => {
  const { css } = useStyle();

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent<HTMLElement>) => {
    const element = event?.target as HTMLElement;
    if (ref.current && !ref.current.contains(element)) {
      onClose();
    }
  };

  useEventListener('mousedown', handleClickOutside);

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schema(initialValues)),
    defaultValues: savedFilter
      ? savedFilter
      : initialValues.reduce(
          (acc, { type, items }) => ({
            ...acc,
            [type]: items.map(({ description }) => ({ description, checked: false })),
          }),
          {},
        ),
  });

  const {
    getValues,
    control,
    watch,
    formState: { isValid },
    handleSubmit,
  } = methods;
  const values = getValues();

  const fieldsArray = useFieldsArray(initialValues, control);

  useEffect(() => {
    const watchAll = watch((data) => {
      for (const key in values) {
        if (data[key].every(({ checked }) => checked)) return;
        if (data[key].slice(1).every(({ checked }) => checked)) {
          const { update } = fieldsArray.find(({ type }) => type === key);
          update(0, { description: FilterType.SELECT_ALL, checked: true });
        }
      }
      // dispatch(action(data))
    });
    return () => {
      watchAll.unsubscribe();
    };
  }, [watch]);

  const handleSubmitData = (data) => {
    onSubmit(data);
  };

  return (
    <>
      {loading && (
        <div className={css(loadingContainer)}>
          <Spinner withText={false} />
        </div>
      )}

      <div ref={ref} className={css(wrapperStyle({ isLoading: loading }))} data-test-id={FILTER_WRAPPER}>
        <div className={css(flexColumnStyle)}>
          <div className={css(flexStyle)}>
            <span className={css(filterStyle)}>
              <Trans i18nKey={'filter'}>Filter</Trans>
            </span>
            <IconButton graphic='cancel' iconStyles={iconStyle} onPress={onClose} />
          </div>
          {fieldsArray.map(({ type, fields, update, replace }) => (
            <div key={type} className={css(wrapperContainer)}>
              <div className={css(checkBoxField)}>
                <SearchWithField customStyles={{ margin: '12px 0px', width: '100%' }}>
                  {({ searchValue, Field }) => {
                    const filteredFields =
                      searchValue &&
                      fields.map((item) => ({
                        ...item,
                        hidden: !item.description.toLowerCase().includes(searchValue.toLowerCase()),
                      }));
                    return (
                      <>
                        <div className={css(titleStyle)}>{type}</div>
                        {Field}
                        <TileWrapper boxShadow={false} customStyle={tileStyles}>
                          {(filteredFields || fields).map(({ description, id, hidden = false }, index) => {
                            return (
                              <Fragment key={id}>
                                {description === FilterType.SELECT_ALL ? (
                                  <label className={css(labelStyle, { display: hidden ? 'none' : 'flex' })}>
                                    <SelectAll
                                      onChange={({ target: { _, checked } }) =>
                                        replace(fields.map(({ ...rest }) => ({ ...rest, checked })))
                                      }
                                      description={description}
                                      type={type}
                                      values={values}
                                      index={index}
                                    />
                                  </label>
                                ) : (
                                  <label className={css(labelStyle, { display: hidden ? 'none' : 'flex' })} key={id}>
                                    <Checkbox
                                      id={`${type}_${description}`}
                                      name={type}
                                      checked={values[type][index].checked ?? false}
                                      onChange={({ target: { _, checked } }) => {
                                        update(index, { description, checked });
                                        !checked && update(0, { description: FilterType.SELECT_ALL, checked });
                                      }}
                                    />
                                    <span className={css(checkBoxItemTitle)}>
                                      <Trans>{description}</Trans>
                                    </span>
                                  </label>
                                )}
                              </Fragment>
                            );
                          })}
                        </TileWrapper>
                      </>
                    );
                  }}
                </SearchWithField>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ButtonsWrapper
        leftText='cancel'
        onLeftPress={onClose}
        onRightPress={handleSubmit(handleSubmitData)}
        isValid={isValid}
        rightIcon={false}
        rightTextNotIcon={'filter'}
        customStyles={customStyles}
      />
    </>
  );
};

const SelectAll: FC<SelectAllProps & FieldValues> = ({ onChange, values, description, type, index }) => {
  const { css } = useStyle();
  return (
    <>
      <Checkbox
        name={type}
        id={`${type}_${description}`}
        onChange={onChange}
        checked={values[type][index].checked ?? false}
        indeterminate={values[type]?.includes(description) ?? false}
      />
      <span className={css(checkBoxItemTitle)}>
        <Trans>{description}</Trans>
      </span>
    </>
  );
};

const loadingContainer: Rule = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '5000',
  height: '100%',
  width: '100%',
  paddingTop: '100%',
};

const wrapperStyle: CreateRule<{ isLoading: boolean }> =
  ({ isLoading }) =>
  ({ theme }) => {
    return {
      padding: '24px 24px 120px 24px',
      background: theme.colors.white,
      height: '100%',
      boxShadow: '0px 0px 6px 1px rgba(0, 0, 0, 0.14)',
      borderRadius: '10px',
      overflow: 'auto',
      opacity: isLoading ? 0.7 : 1,
      pointerEvents: isLoading ? 'none' : 'all',
    };
  };

const tileStyles: Rule = ({ theme }) => ({
  padding: '16px 24px',
  background: theme.colors.backgroundDark,
  borderRadius: '0px',
  maxHeight: '236px',
  overflow: 'auto',
  borderTop: `1px solid ${theme.colors.backgroundDarkest}`,
  borderBottom: `1px solid ${theme.colors.backgroundDarkest}`,
  marginTop: '4px',
});
const customStyles: Rule = ({ theme }) => {
  return {
    background: theme.colors.white,
    borderRadius: '0px 0px 10px 10px',
  };
};
const checkBoxField: Rule = () => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };
};

const flexColumnStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
};
const labelStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: '20px',
};
const wrapperContainer: Rule = () => ({
  marginTop: '28px',
  position: 'relative',
  paddingBottom: '12px',
});
const checkBoxItemTitle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '20px',
    color: theme.colors.link,
    marginLeft: '16px',
  };
};
const titleStyle: Rule = ({ theme }) => {
  return {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '18px',
    lineHeight: '22px',
    color: theme.colors.link,
  };
};
const filterStyle: Rule = ({ theme }) => {
  return {
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: theme.colors.link,
  };
};
const flexStyle: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const iconStyle: Rule = {
  width: '18px',
  height: '18px',
  marginTop: '5px',
};

export default FilterModal;
