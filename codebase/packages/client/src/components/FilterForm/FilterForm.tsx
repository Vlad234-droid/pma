import React, { FC, Fragment, useEffect } from 'react';
import * as Yup from 'yup';
import { Rule, useStyle, CreateRule, Button } from '@pma/dex-wrapper';
import { yupResolver } from '@hookform/resolvers/yup';

import SearchWithField from 'components/SearchWithField';
import { Trans, useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Checkbox } from 'components/Form';
import Spinner from 'components/Spinner';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import { getName } from './utils';

import { FilterType } from './types';
import { schema } from './config';

export const FILTER_WRAPPER = 'filter-wrapper';

type Props = {
  onCancel: () => void;
  defaultValues: any;
  filters: { [key: string]: Array<{ [key: string]: string }> };
  onSubmit: (data: any) => void;
  loading?: boolean;
  onUpdate?: (data: any) => void;
  onApply?: (data: any) => void;
  filterCount?: number;
  customButtons?: JSX.Element;
};

const FilterForm: FC<Props> = ({
  onCancel,
  defaultValues,
  onSubmit,
  loading = false,
  filters,
  onUpdate,
  onApply,
  filterCount,
  customButtons,
}) => {
  const { css, theme } = useStyle();
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
    const subscription = watch((data) => onUpdate && onUpdate(data));
    return () => {
      subscription.unsubscribe();
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
                          <label className={css(labelStyle, { display: searchValue ? 'none' : 'flex' })}>
                            <Checkbox
                              onChange={({ target }) => {
                                //@ts-ignore
                                properties.forEach(({ uuid, code }) => {
                                  const field = `${key}.${uuid || code}`;
                                  setValue(field, target.checked, {
                                    shouldValidate: true,
                                    shouldTouch: true,
                                    shouldDirty: true,
                                  });
                                });
                              }}
                              checked={
                                Object.values(values?.[key] || {}).length === properties.length &&
                                Object.values(values?.[key] || {}).every((val) => val)
                              }
                              indeterminate={true}
                            />
                            <span className={css(selectAllStyles)}>
                              <Trans>{FilterType.SELECT_ALL}</Trans>
                            </span>
                          </label>
                          {/*//@ts-ignore*/}
                          {(filteredFields || properties).map(({ code, uuid, hidden = false, ...rest }) => {
                            const filter = uuid || code;
                            const name = getName(rest);
                            return (
                              <Fragment key={code}>
                                <label className={css(labelStyle, { display: hidden ? 'none' : 'flex' })} key={code}>
                                  <Checkbox
                                    id={`${key}_${name}`}
                                    name={`${key}.${filter}`}
                                    checked={values?.[key]?.[filter] || false}
                                    onChange={({ target: { name, checked } }) => {
                                      setValue(name, checked, {
                                        shouldValidate: true,
                                        shouldTouch: true,
                                        shouldDirty: true,
                                      });
                                    }}
                                  />
                                  <span className={css(checkBoxItemTitle)}>
                                    <Trans>{name}</Trans>
                                  </span>
                                </label>
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
      {/*<ButtonsWrapper*/}
      {/*  leftText='clear_filter'*/}
      {/*  onLeftPress={onCancel}*/}
      {/*  onRightPress={handleSubmit(onSubmit)}*/}
      {/*  customButtons={customButtons}*/}
      {/*  isValid={isValid}*/}
      {/*  rightIcon={false}*/}
      {/*  rightTextNotIcon={filterCount ? `Apply filter (${filterCount})` : 'Apply filter'}*/}
      {/*  customStyles={customStyles}*/}
      {/*/>*/}
      <div className={css(blockStyle, customStyles)}>
        <div className={css(wrapperButtonStyle)}>
          <div className={css(buttonsWrapper({ customButtons }))}>
            <Button isDisabled={false} styles={[theme.font.fixed.f16, buttonCancelStyle]} onPress={onCancel}>
              Clear filter
            </Button>
            <Button
              //@ts-ignore
              onPress={handleSubmit(onApply)}
              styles={[submitButtonStyle({ isValid: true })]}
            >
              {filterCount ? `Apply filter (${filterCount})` : 'Apply filter'}
            </Button>
            <Button
              //@ts-ignore
              onPress={handleSubmit(onSubmit)}
              styles={[submitButtonStyle({ isValid })]}
            >
              Apply & close
            </Button>
          </div>
        </div>
      </div>
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
    fontWeight: 'normal',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: '20px',
    color: theme.colors.base,
    marginLeft: '16px',
  };
};
const selectAllStyles: Rule = ({ theme }) => {
  return {
    fontWeight: theme.font.weight.bold,
    fontSize: theme.font.fixed.f16.fontSize,
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

const blockStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const buttonsWrapper: CreateRule<{ customButtons: JSX.Element | undefined }> = ({ customButtons }) => ({
  padding: '30px 15px 30px 15px',
  display: 'flex',
  justifyContent: customButtons ? 'space-between' : 'center',
});

const wrapperButtonStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});

const buttonCancelStyle: Rule = ({ theme }) => ({
  fontWeight: theme.font.weight.bold,
  width: '33%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const submitButtonStyle: CreateRule<{ isValid: any }> =
  ({ isValid }) =>
  ({ theme }) => ({
    height: '40px',
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    width: '33%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

export default FilterForm;
