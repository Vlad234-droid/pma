import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getColleagueByUuidSelector } from '@pma/store';
import get from 'lodash.get';
import { Trans, useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Attention, Field, Item, Textarea } from 'components/Form';
import { ColleaguesFinder, FeedbackInfo } from '../../components';
import { ButtonsWrapper } from 'components/ButtonsWrapper';

import { GiveFeedbackType } from '../../type';
import { createGiveFeedbackSchema } from '../../config';

export const FORM_WRAPPER = 'form-wrapper';

const prepareFeedbackItems = (fields, feedbackItems) => {
  return feedbackItems.map((content, idx) => ({ content, code: fields[idx].code }));
};

const getColleagueName = (data) => {
  if (!data) return '';

  return `${data?.colleague?.profile?.firstName} ${data?.colleague?.profile?.lastName}`;
};

type Props = {
  onSubmit: (data: any) => void;
  defaultValues: any;
  currentColleague?: any;
  goToInfo: (data: any) => void;
  feedbackFields: Array<GiveFeedbackType>;
};

const GiveFeedbackForm: FC<Props> = ({ onSubmit, defaultValues, currentColleague, goToInfo, feedbackFields }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const { t } = useTranslation();

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(createGiveFeedbackSchema(t)),
    defaultValues,
  });

  const { targetColleagueUuid, feedbackItems } = getValues();

  const selectedColleague = useSelector(getColleagueByUuidSelector(targetColleagueUuid)) || currentColleague;

  const handleDraft = () => {
    const data = getValues();

    if (!targetColleagueUuid) return;
    onSubmit({ ...data, status: 'DRAFT', feedbackItems: prepareFeedbackItems(feedbackFields, data.feedbackItems) });
  };

  const handleSave = (data) => {
    onSubmit({ ...data, status: 'SUBMITTED', feedbackItems: prepareFeedbackItems(feedbackFields, data.feedbackItems) });
  };

  return (
    <>
      <div className={css(wrapperModalGiveFeedbackStyle)} data-test-id={FORM_WRAPPER}>
        <div
          className={css({
            fontWeight: 'bold',
            fontSize: '24px',
            lineHeight: '28px',
            ...(mobileScreen && { textAlign: 'center' }),
          })}
        >
          <Trans i18nKey='let_a_colleague_know_how_they_are_doing'>Let a colleague know how they are doing</Trans>
        </div>
        <Attention />
        <div
          className={css({
            marginTop: '8px',
            fontSize: '18px',
            lineHeight: '22px',
            ...(mobileScreen && { textAlign: 'center' }),
          })}
        >
          <Trans i18nKey='select_to_give_feedback'>Select who you&apos;d like to give feedback to</Trans>
        </div>
        <ColleaguesFinder
          onSelect={(colleagueUuid) => {
            setValue('targetColleagueUuid', colleagueUuid, { shouldValidate: true });
          }}
          selected={null}
          value={getColleagueName(selectedColleague)}
          error={get(errors, 'targetColleagueUuid.message')}
        />
        {selectedColleague && (
          <FeedbackInfo selectedPerson={selectedColleague} onClickMore={() => goToInfo(getValues())} />
        )}
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
                    customStyle={{
                      marginBottom: '16px !important',
                      ...tileCustomStyles,
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
          isValid={isValid}
          onLeftPress={handleDraft}
          onRightPress={() => {
            handleSubmit(handleSave)();
          }}
          leftText='save_as_draft'
          rightTextWithIcon='submit'
        />
      </div>
    </>
  );
};
const wrapperModalGiveFeedbackStyle: Rule = {
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

const tileCustomStyles: Rule = {
  padding: '24px 24px 0px 24px',
  border: '2px solid #E5E5E5',
};

export default GiveFeedbackForm;
