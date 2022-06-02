import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { getColleagueByUuidSelector } from '@pma/store';
import { yupResolver } from '@hookform/resolvers/yup';
import get from 'lodash.get';

import { Trans, useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Attention, Field, Item, Textarea } from 'components/Form';
import { ColleaguesFinder } from 'features/GiveFeedBack/components';
import { createGiveFeedbackSchema } from 'features/GiveFeedBack/config';
import FeedbackInfo from '../FeedbackInfo';
import { GiveFeedbackFormProps } from '../../type';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

export const FORM_WRAPPER = 'form_wrapper';

const prepareFeedbackItems = (fields, feedbackItems) => {
  return feedbackItems.map((content, idx) => ({ content, code: fields[idx].code }));
};

const getColleagueName = (data) => {
  if (!data) return '';
  return `${data?.colleague?.profile?.firstName} ${data?.colleague?.profile?.lastName}`;
};

const GiveFeedbackForm: FC<GiveFeedbackFormProps> = ({
  onSubmit,
  defaultValues,
  currentColleague,
  goToInfo,
  feedbackFields,
}) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useFormWithCloseProtection({
    mode: 'onChange',
    resolver: yupResolver(createGiveFeedbackSchema(t)),
    defaultValues,
  });

  const { targetColleagueUuid, feedbackItems } = getValues();

  const selectedColleague = useSelector(getColleagueByUuidSelector(targetColleagueUuid)) || currentColleague;

  const handleDraft = () => {
    const data = getValues();
    const feedbackItems = prepareFeedbackItems(feedbackFields, data.feedbackItems.filter(Boolean));
    onSubmit({ ...data, status: 'PENDING', feedbackItems });
  };

  const handleSave = (data) => {
    const feedbackItems = prepareFeedbackItems(feedbackFields, data.feedbackItems.filter(Boolean));
    onSubmit({
      ...data,
      status: 'COMPLETED',
      feedbackItems,
    });
  };

  return (
    <div className={css(WrapperModalGiveFeedbackStyle)} data-test-id={FORM_WRAPPER}>
      <div
        className={css({
          fontWeight: 'bold',
          fontSize: '24px',
          lineHeight: '28px',
          ...(mobileScreen && { textAlign: 'center' }),
        })}
      >
        <Trans i18nKey='how_is_the_colleague_performing'>How is the colleague performing?</Trans>
      </div>
      <Attention />
      <div className={css(questionWrapper)}>
        <Trans i18nKey='colleague_requested_feedback'>
          This colleague has requested feedback from you. Fill out the questions below to share your feedback.
        </Trans>
      </div>
      <ColleaguesFinder
        onSelect={(colleagueUuid) => {
          setValue('targetColleagueUuid', colleagueUuid, { shouldValidate: true });
        }}
        selected={null}
        value={getColleagueName(selectedColleague)}
        error={get(errors, 'targetColleagueUuid.message')}
      />
      {selectedColleague && <FeedbackInfo onClickMore={() => goToInfo(getValues())} />}
      {selectedColleague && (
        <div>
          {feedbackFields.map((item, index) => {
            return (
              <div
                key={index}
                className={css({
                  ':last-child': {
                    marginBottom: '32px',
                  },
                })}
              >
                <TileWrapper
                  boarder={true}
                  customStyle={{
                    marginBottom: '16px !important',
                    padding: '24px 24px 0px 24px',
                  }}
                >
                  <h3 className={css(feedbackTitle)}>{item.title}</h3>
                  <p className={css(feedbackDescription)}>{item?.description}</p>
                  <Field
                    name={`feedbackItems.${index}`}
                    Wrapper={Item}
                    Element={Textarea}
                    value={get(feedbackItems, `[${index}]`, '')}
                    setValue={setValue}
                    error={get(errors, `feedbackItems[${index}].message`)}
                  />
                </TileWrapper>
              </div>
            );
          })}
        </div>
      )}
      <ButtonsWrapper
        leftText='save_as_draft'
        onLeftPress={handleDraft}
        onRightPress={() => {
          handleSubmit(handleSave)();
        }}
        rightTextWithIcon='submit'
        isValid={isValid}
      />
    </div>
  );
};

const questionWrapper: Rule = ({ theme }) => {
  return {
    fontSize: theme.font.fixed.f18.fontSize,
    lineHeight: theme.font.fixed.f18.lineHeight,
    letterSpacing: '0px',
    marginTop: '8px',
  };
};

const WrapperModalGiveFeedbackStyle: Rule = {
  paddingLeft: '40px',
  paddingRight: '40px',
  height: '100%',
  overflow: 'auto',
};

const feedbackTitle: Rule = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '2px 0px 0px 0px',
};
const feedbackDescription: Rule = {
  margin: '4px 0px 16px 0px',
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
};

export default GiveFeedbackForm;
