import React, { FC, Fragment, useEffect } from 'react';
import * as Yup from 'yup';
import { UseFormHandleSubmit } from 'react-hook-form';
import { Rule, useStyle, CreateRule } from '@pma/dex-wrapper';
import { yupResolver } from '@hookform/resolvers/yup';

import SearchWithField from 'components/SearchWithField';
import { Trans, useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Checkbox, SelectAll } from 'components/Form';
import Spinner from 'components/Spinner';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { getName } from './utils';
import { schema } from './config';

export const FILTER_WRAPPER = 'filter-wrapper';

type ChildrenProps = {
  onCancel: () => void;
  onSubmit: () => void;
  handleSubmit: UseFormHandleSubmit<any>;
  isValid: boolean;
  values: any;
};

type Props = {
  onCancel: () => void;
  defaultValues: any;
  filters: { [key: string]: Array<{ [key: string]: string }> };
  onSubmit: (data: any) => void;
  loading?: boolean;
  onUpdate?: (data: any) => void;
  children?: (T: ChildrenProps) => JSX.Element;
};

type Filter<T> = Record<string, T> | boolean;
const removeFalseProperties = (obj: Filter<Filter<boolean>>) =>
  Object.keys(obj).reduce((acc, group) => {
    const filtered = Object.entries(obj[group])
      .filter(([_, v]) => v !== false)
      .reduce((value, [k, v]) => ({ ...value, [k]: v }), {});
    return Object.keys(filtered).length > 0 ? { ...acc, [group]: filtered } : acc;
  }, {});

const FilterForm: FC<Props> = ({ onCancel, defaultValues, onSubmit, loading = false, filters, onUpdate, children }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(schema),
    defaultValues,
  });

  const {
    getValues,
    setValue,
    formState: { isValid },
    handleSubmit,
    watch,
  } = methods;
  const values = getValues();

  useEffect(() => {
    const subscription = onUpdate ? watch((data) => onUpdate(removeFalseProperties(data))) : undefined;
    return () => {
      subscription && subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <>
      {loading && (
        <div className={css(loadingContainer)}>
          <Spinner withText={false} />
        </div>
      )}
      <div className={css(wrapperStyle({ isLoading: loading }))} data-test-id={FILTER_WRAPPER}>
        <div className={css(flexColumnStyle)}>
          <div className={css(flexStyle)}>
            <span className={css(filterStyle)}>
              <Trans i18nKey={'filter'}>Filter</Trans>
            </span>
            {/*<IconButton graphic='cancel' iconStyles={iconStyle} onPress={onCancel} />*/}
          </div>
          {Object.entries(filters).map(([key, properties]) => (
            <div key={key} className={css(wrapperContainer)}>
              <div className={css(checkBoxField)}>
                <SearchWithField customStyles={{ margin: '12px 0px', width: '100%' }}>
                  {({ searchValue, Field }) => {
                    const filteredFields =
                      searchValue &&
                      properties.map((item) => ({
                        ...item,
                        //@ts-ignore
                        hidden: !getName(item).toLowerCase().includes(searchValue.toLowerCase()),
                      }));
                    return (
                      <>
                        <div className={css(titleStyle)}>{t(`group_name_${key}`, key)}</div>
                        {Field}
                        <TileWrapper boxShadow={false} customStyle={tileStyles}>
                          <div className={css(labelStyle, { display: searchValue ? 'none' : 'flex' })}>
                            <SelectAll
                              onChange={(checked) =>
                                setValue(
                                  key,
                                  properties.reduce(
                                    (acc, { uuid, code }) => ({ ...acc, [uuid || code]: checked }),
                                    {} as any,
                                  ),
                                  {
                                    shouldValidate: true,
                                    shouldTouch: true,
                                    shouldDirty: true,
                                  },
                                )
                              }
                              disabled={properties.length === 0}
                              checked={
                                Object.values(values?.[key] || {}).length > 0 &&
                                Object.values(values?.[key] || {}).length === properties.length &&
                                Object.values(values?.[key] || {}).every((val) => val)
                              }
                              indeterminate={
                                Object.values(values?.[key] || {}).length > 0 &&
                                Object.values(values?.[key] || {}).some((val) => val)
                              }
                            />
                          </div>
                          {/*//@ts-ignore*/}
                          {(filteredFields || properties).map(({ code, uuid, hidden = false, ...rest }) => {
                            const filter = uuid || code;
                            const name = getName(rest);
                            return (
                              <Fragment key={code}>
                                <div className={css(labelStyle, { display: hidden ? 'none' : 'flex' })} key={code}>
                                  <Checkbox
                                    id={`${key}_${name}`}
                                    name={`${key}.${filter}`}
                                    label={name}
                                    checked={values?.[key]?.[filter] || false}
                                    onChange={(checked) => {
                                      setValue(`${key}.${filter}`, checked, {
                                        shouldValidate: true,
                                        shouldTouch: true,
                                        shouldDirty: true,
                                      });
                                    }}
                                  />
                                </div>
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
      {children ? (
        children({ onCancel, onSubmit: handleSubmit(onSubmit), handleSubmit, isValid, values })
      ) : (
        <ButtonsWrapper
          leftText='clear_filter'
          onLeftPress={onCancel}
          onRightPress={handleSubmit(onSubmit)}
          isValid={isValid}
          rightIcon={false}
          rightTextNotIcon={'Apply filter'}
          customStyles={customStyles}
        />
      )}
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

export default FilterForm;
