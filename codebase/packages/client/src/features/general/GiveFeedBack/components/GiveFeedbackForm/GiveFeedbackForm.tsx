import React, { FC } from 'react';
import { getColleagueByUuidSelector, ColleaguesActions } from '@pma/store';
import { yupResolver } from '@hookform/resolvers/yup';
import get from 'lodash.get';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Trans, useTranslation } from 'components/Translation';
import { TileWrapper } from 'components/Tile';
import { Attention, Field, Item, Textarea } from 'components/Form';
import { FeedbackInfo } from '../../components';
import { ButtonsWrapper } from 'components/ButtonsWrapper';
import { InputWithDropdown } from 'components/InputWithDropdown';
import { ColleaguesFinder } from 'components/ColleaguesFinder';

import { GiveFeedbackType } from '../../config/type';
import { createGiveFeedbackSchema } from '../../config';
import { useFormWithCloseProtection } from 'hooks/useFormWithCloseProtection';

import { SearchOption } from 'config/enum';

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
  const { uuid } = useParams<{ uuid: string }>();

  const dispatch = useDispatch();

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

        <InputWithDropdown
          onChange={() => dispatch(ColleaguesActions.clearColleagueList())}
          visible={uuid === 'new' && !targetColleagueUuid}
          options={[
            { value: SearchOption.NAME, label: t('by_name', 'By name') },
            { value: SearchOption.EMAIL, label: t('by_email_address', 'By email address') },
          ]}
          dropDownStyles={{
            borderRadius: '0px 25px 25px 0px',
          }}
        >
          {({ active }) => (
            <ColleaguesFinder
              searchOption={active}
              onSelect={(colleagueUuid) => {
                setValue('targetColleagueUuid', colleagueUuid, { shouldValidate: true });
              }}
              selected={[]}
              value={getColleagueName(selectedColleague)}
              error={get(errors, 'targetColleagueUuid.message')}
              customStyles={{ marginTop: '0px', width: '100%' }}
              inputStyles={{
                borderRadius: uuid === 'new' && !targetColleagueUuid ? '25px 0px 0px 25px !important' : '50px',
              }}
            />
          )}
        </InputWithDropdown>

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
