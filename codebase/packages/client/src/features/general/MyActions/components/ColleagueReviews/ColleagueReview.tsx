import React, { FC, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { FormType } from '@pma/store';

import { createYupSchema } from 'utils/yup';
import { Input, Item, Select, Textarea } from 'components/Form';
import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { GenericItemField } from 'components/GenericForm';
import { Status } from 'config/enum';
//TODO: should move to general utils
import { formTagComponents } from 'features/general/Review';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import FileList from 'components/FileList';
import { getReviewFileLink } from 'utils/review';
import { Timeline } from 'config/types';

type Props = {
  review: any;
  timeline: Timeline;
  schema: any;
  colleagueUuid: string;
  validateReview: (review: { [key: string]: boolean }) => void;
  updateColleagueReviews: (T) => void;
};

export const TEST_WRAPPER_ID = 'test-wrapper-id';

const ColleagueReview: FC<Props> = ({
  colleagueUuid,
  review,
  timeline,
  schema,
  validateReview,
  updateColleagueReviews,
}) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();

  const { components = [] } = schema;
  const styledComponents = formTagComponents(components, theme);

  const reviewProperties = review?.properties;
  const fileList = useMemo(
    () =>
      review?.files?.map(({ fileName, uuid }) => ({
        name: fileName,
        uuid: uuid,
        href: getReviewFileLink(colleagueUuid, uuid),
      })),
    [review],
  );

  const yepSchema = components.reduce(createYupSchema(t), {});
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues: reviewProperties,
  });

  const {
    formState: { isValid },
    watch,
  } = methods;

  useEffect(() => {
    validateReview({ [review.uuid]: isValid });
  }, [isValid]);

  useEffect(() => {
    const subscription = watch((data) => {
      updateColleagueReviews((stateReviews) => {
        const reviews = stateReviews?.filter(({ uuid }) => uuid !== review.uuid) || {};
        const currentReview = stateReviews?.find(({ uuid }) => uuid === review.uuid) || {};
        return [...reviews, { ...currentReview, properties: { ...data } }];
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, review]);

  return (
    <TileWrapper boarder={true} customStyle={{ marginTop: '20px' }}>
      <div data-test-id={TEST_WRAPPER_ID} className={css({ padding: '24px 35px 24px 24px' })}>
        <div className={css(titleStyles)}>
          {t(`review_type_description_${timeline.code?.toLowerCase()}`, timeline.code, {
            num: review.number,
          })}
        </div>

        <>
          {styledComponents.map((component) => {
            const {
              id,
              key = '',
              text = '',
              label = '',
              description = '',
              type,
              validate = {},
              values = [],
              expression = {},
              borderStyle = {},
            } = component;
            const value = key && reviewProperties?.[key] ? reviewProperties[key] : '';

            if (type === FormType.TEXT) {
              return (
                <div className={css({ padding: 0, margin: 0 }, borderStyle)} key={id}>
                  <div className={css(styledMarkdown)}>
                    <MarkdownRenderer source={text} />
                  </div>
                </div>
              );
            }

            if (expression?.auth?.permission?.write?.length && review.status === Status.WAITING_FOR_APPROVAL) {
              if (type === FormType.TEXT_FIELD) {
                return (
                  <div className={css(borderStyle)}>
                    <GenericItemField
                      key={id}
                      name={key}
                      methods={methods}
                      label={label}
                      Wrapper={Item}
                      wrapperProps={{ marginBot: false, labelCustomStyle: { padding: '0px 0px 8px' } }}
                      Element={validate?.maxLength > 100 ? Textarea : Input}
                      placeholder={description}
                      value={value}
                      readonly={false}
                    />
                  </div>
                );
              }
              if (type === FormType.SELECT) {
                return (
                  <div className={css(borderStyle)}>
                    <GenericItemField
                      key={id}
                      name={key}
                      methods={methods}
                      label={label}
                      Wrapper={Item}
                      wrapperProps={{ marginBot: false, labelCustomStyle: { padding: '0px 0px 8px' } }}
                      Element={Select}
                      options={values}
                      placeholder={description}
                      value={value}
                      readonly={false}
                    />
                  </div>
                );
              }
            }

            return (
              <div key={id} className={css(borderStyle)}>
                <div className={css({ padding: '10px 0' })}>
                  <MarkdownRenderer source={label} />
                  <div className={css(valueStyle)}>{value}</div>
                </div>
              </div>
            );
          })}
        </>
      </div>
      {fileList?.length && (
        <div className={css(fileListStyle)}>
          <FileList files={fileList} />
        </div>
      )}
    </TileWrapper>
  );
};

export default ColleagueReview;

const styledMarkdown: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    letterSpacing: '0px',
    '& > p': { margin: 0, padding: '20px 0' },
    '& > h2': { margin: 0, padding: '20px 0' },
  };
};

const titleStyles: Rule = ({ theme }) => ({
  margin: 0,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
  color: theme.colors.tescoBlue,
  fontWeight: theme.font.weight.bold,
  paddingBottom: '20px',
});

const valueStyle: Rule = ({ theme }) => ({ ...theme.font.fixed.f16, letterSpacing: '0px' });

const fileListStyle: Rule = { padding: '0px 20px 20px' };
