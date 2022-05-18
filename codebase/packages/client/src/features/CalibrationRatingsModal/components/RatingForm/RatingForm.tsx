import React, { FC, useCallback } from 'react';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { FormType } from '@pma/store';

import { Item, Select } from 'components/Form';
import { useTranslation } from 'components/Translation';
import { GenericItemField } from 'components/GenericForm';
import { RadioWrapper } from '../RadioWrapper';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { NotificationTile } from 'components/NotificationTile';
import { Line } from 'components/Line';

import { defaultValues, getFields, fieldsSpecifity } from '../../utils';
import { Statuses } from '../../CalibrationRatingsModal';
import { Notification, yupRatingSchema } from '../../config';

export const RatingForm: FC<{ setStatus: (S) => void }> = ({ setStatus }) => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(yupRatingSchema),
    defaultValues: { ...defaultValues },
  });
  const {
    getValues,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;
  const values = getValues();

  const isFullFields = useCallback(() => !!(values['what'] && values['how']), [...Object.values(values)]);

  const onSubmit = () => {
    // TODO: dispatch(...)
  };

  const goBack = () => navigate(-1);

  const findSpecificField = () =>
    fieldsSpecifity[
      Math.min(
        fieldsSpecifity.findIndex((item) => item === values['what']),
        fieldsSpecifity.findIndex((item) => item === values['how']),
      )
    ];

  return (
    <form className={css({ marginTop: '40px' })}>
      {getFields(t, values).map((item) => {
        if (item.type === 'line') {
          return <Line key={item.name} styles={{ marginBottom: '24px' }} />;
        }
        if (item.type === Notification.NOTIFICATION_TILE && isFullFields()) {
          return (
            <NotificationTile key={item.name} styles={{ marginBottom: '24px' }}>
              <p className={css(colleaguesOverallRating)}>
                {t('overall_rating_is', "Your colleague's overall rating is")}: <span>{findSpecificField()}</span>
              </p>
            </NotificationTile>
          );
        }
        if (item.type === FormType.RADIO) {
          return (
            <RadioWrapper key={item.name} text={item.label} setValue={setValue} name={item.name} values={values} />
          );
        }
        if (item.type === FormType.SELECT) {
          return (
            <GenericItemField
              key={item.name}
              name={item?.name}
              //@ts-ignore
              methods={methods}
              label={item.label}
              Wrapper={({ children, label }) => (
                <Item withIcon={false} label={label} labelCustomStyle={{ fontWeight: theme.font.weight.bold }}>
                  {children}
                </Item>
              )}
              Element={Select}
              placeholder={item.placeholder}
              options={item.options}
              // @ts-ignore
              value={values[item?.name] || ''}
            />
          );
        }
      })}
      <ButtonsWrapper
        isValid={isValid}
        onLeftPress={goBack}
        rightIcon={false}
        rightTextNotIcon={'submit'}
        onRightPress={() => {
          handleSubmit(onSubmit)();
          setStatus(Statuses.SUCCESS);
        }}
      />
    </form>
  );
};

const colleaguesOverallRating: Rule = ({ theme }) =>
  ({
    '& > span': {
      color: theme.colors.tescoBlue,
      fontWeight: theme.font.weight.bold,
    },
  } as Styles);
