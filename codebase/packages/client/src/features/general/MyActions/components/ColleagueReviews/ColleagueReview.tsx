import React, { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { FormType, isAnniversaryTimelineType } from '@pma/store';

import { createYupSchema } from 'utils/yup';
import { getYearFromISO, formatDateStringFromISO, MONTH_FORMAT } from 'utils';
import { Input, Item, Select, Textarea, Field } from 'components/Form';
import { useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { Status } from 'config/enum';
//TODO: should move to general utils
import { formTagComponents } from 'features/general/Review';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';
import FileList from 'components/FileList';
import { getReviewFileLink } from 'utils/review';
import { Timeline } from 'config/types';

type Props = {
  review: any;
  timelinePoint: Timeline;
  schema: any;
  colleagueUuid: string;
  validateReview: (review: { [key: string]: boolean }) => void;
  onUpdate: (reviewUuid: string, review: any) => void;
};

export const TEST_WRAPPER_ID = 'test-wrapper-id';

const ColleagueReview: FC<Props> = ({ colleagueUuid, review, timelinePoint, schema, validateReview, onUpdate }) => {
  const { css, theme } = useStyle();
  const { t } = useTranslation();
  const isAnniversary = useSelector(isAnniversaryTimelineType(colleagueUuid, timelinePoint?.cycleUuid));

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

  const yepSchema = useMemo(
    () =>
      components
        .filter(({ expression, key }) => key && expression?.auth?.permission?.write?.length)
        .reduce(createYupSchema(t), {}),
    [components],
  );
  const methods = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver<Yup.AnyObjectSchema>(Yup.object().shape(yepSchema)),
    defaultValues: reviewProperties,
  });

  const {
    formState: { isValid, errors },
    watch,
    setValue,
    getValues,
  } = methods;

  const title = isAnniversary
    ? `${t('anniversary_review', 'Anniversary review')} ${getYearFromISO(timelinePoint?.startTime)}-${getYearFromISO(
        timelinePoint?.endTime,
      )}`
    : `${t(`review_type_description_${timelinePoint.code?.toLowerCase()}`, timelinePoint.code, {
        num: review.number,
      })}, ${formatDateStringFromISO(timelinePoint?.startTime, MONTH_FORMAT)}-${formatDateStringFromISO(
        timelinePoint?.endTime,
        MONTH_FORMAT,
      )}`;

  useEffect(() => {
    validateReview({ [review.uuid]: isValid });
  }, [isValid]);

  useEffect(() => {
    const subscription = watch((data) => {
      onUpdate(review.uuid, data);
    });
    return () => subscription.unsubscribe();
  }, [watch, review]);

  const formValues = getValues();

  return (
    <TileWrapper boarder={true} customStyle={{ marginTop: '20px' }}>
      <div data-test-id={TEST_WRAPPER_ID} className={css({ padding: '24px 35px 24px 24px' })}>
        <div className={css(titleStyles)}>{title}</div>
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
            const value = formValues[key] || '';
            const error = errors?.[key]?.message;

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
                  <div key={id} className={css(borderStyle)}>
                    <Field
                      name={key}
                      setValue={setValue}
                      label={label}
                      Wrapper={Item}
                      wrapperProps={{ marginBot: false, labelCustomStyle: { padding: '0px 0px 8px' } }}
                      Element={validate?.maxLength > 100 ? Textarea : Input}
                      placeholder={description}
                      value={value}
                      readonly={false}
                      error={error}
                    />
                  </div>
                );
              }
              if (type === FormType.SELECT) {
                return (
                  <div key={id} className={css(borderStyle)}>
                    <Field
                      name={key}
                      setValue={setValue}
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
    '& > h3': { margin: 0, padding: '20px 0' },
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

const valueStyle: Rule = ({ theme }) => ({ ...theme.font.fixed.f16, letterSpacing: '0px', whiteSpace: 'pre-wrap' });

const fileListStyle: Rule = { padding: '0px 20px 20px' };
