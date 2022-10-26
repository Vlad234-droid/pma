import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStyle, Rule, Styles } from '@pma/dex-wrapper';
import { FormType } from '@pma/store';

import { Item, Select } from 'components/Form';
import { useTranslation } from 'components/Translation';
import { GenericItemField } from 'components/GenericForm';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { NotificationTile } from 'components/NotificationTile';
import { Line } from 'components/Line';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import { RadioWrapper } from '../RadioWrapper';
import { defaultValues, getFields, fieldsSpecifity } from '../../utils';
import { Notification, yupRatingSchema } from '../../config';

type Props = {
  onSubmit: (data: any) => void;
};
const RatingForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { css, theme } = useStyle();
  const navigate = useNavigate();
  const methods = useFormWithCloseProtection({
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

  const isFullFields = !!(values['what'] && values['how']);

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
        if (item.type === Notification.NOTIFICATION_TILE && isFullFields) {
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
        onRightPress={handleSubmit(onSubmit)}
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

export default RatingForm;
