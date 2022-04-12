import React, { FC, useEffect } from 'react';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createYupSchema } from 'utils/yup';

import { Rule, useStyle } from '@pma/dex-wrapper';
import { FormType } from '@pma/store';

import { Input, Item, Select, Textarea } from 'components/Form';

import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';

import MarkdownRenderer from 'components/MarkdownRenderer';
import { GenericItemField } from 'components/GenericForm';
import { ReviewType, Status } from 'config/enum';

type Props = {
  review: any;
  schema: any;
  validateReview: (T) => void;
  updateColleagueReviews: (T) => void;
};

export const ColleagueReview: FC<Props> = ({ review, schema, validateReview, updateColleagueReviews }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const { components = [] } = schema;

  const reviewProperties = review?.properties?.mapJson;
  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues: reviewProperties,
  });

  const {
    formState: { isValid },
    watch,
  } = methods;

  useEffect(() => {
    validateReview((state) => ({ ...state, ...{ [review.uuid]: isValid } }));
  }, [isValid]);

  useEffect(() => {
    const subscription = watch((data) => {
      updateColleagueReviews((stateReviews) => {
        const reviews = stateReviews?.filter(({ uuid }) => uuid !== review.uuid) || {};
        const currentReview = stateReviews?.find(({ uuid }) => uuid === review.uuid) || {};
        return [
          ...reviews,
          { ...currentReview, properties: { mapJson: { ...currentReview?.properties?.mapJson, ...data } } },
        ];
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, review]);

  return (
    <TileWrapper boarder={true} customStyle={{ marginTop: '20px' }}>
      <div className={css({ padding: '24px 35px 24px 24px' })}>
        <div className={css(titleStyles)}>
          {t(`review_type_description_${review.type?.toLowerCase()}`, ReviewType[review.type], {
            num: review.number,
          })}
        </div>
        {components.map((component) => {
          const { id, key, text, label, description, type, validate, values = [], expression = {} } = component;
          const value = reviewProperties[key] ? reviewProperties[key] : '';

          if (type === FormType.TEXT) {
            return (
              <div style={{ padding: '10px 0' }} key={id}>
                <div
                  className={css({
                    fontSize: '16px',
                    lineHeight: '20px',
                    letterSpacing: '0px',
                  })}
                >
                  <MarkdownRenderer source={text} />
                </div>
              </div>
            );
          }
          if (expression?.auth?.permission?.write?.length && review.status === Status.WAITING_FOR_APPROVAL) {
            if (type === FormType.TEXT_FIELD) {
              return (
                <GenericItemField
                  key={id}
                  name={key}
                  methods={methods}
                  label={label}
                  Wrapper={Item}
                  Element={validate?.maxLength > 100 ? Textarea : Input}
                  placeholder={description}
                  value={value}
                  readonly={false}
                />
              );
            }
            if (type === FormType.SELECT) {
              return (
                <GenericItemField
                  key={id}
                  name={key}
                  methods={methods}
                  label={label}
                  Wrapper={({ children, label }) => (
                    <Item withIcon={false} label={label}>
                      {children}
                    </Item>
                  )}
                  Element={Select}
                  options={values}
                  placeholder={description}
                  value={value}
                  readonly={false}
                />
              );
            }
          }

          return (
            <div key={id} className={css({ padding: '10px 0' })}>
              <MarkdownRenderer source={label} />
              <div className={css(valueStyle)}>{value}</div>
            </div>
          );
        })}
      </div>
    </TileWrapper>
  );
};

const titleStyles: Rule = ({ theme }) => ({
  margin: 0,
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  paddingBottom: '20px',
});

const valueStyle: Rule = ({ theme }) => ({ ...theme.font.fixed.f16, letterSpacing: '0px' });
