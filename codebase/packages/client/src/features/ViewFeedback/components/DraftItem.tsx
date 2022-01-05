import React, { FC, useMemo } from 'react';
import { Rule, Styles, useStyle, colors } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import defaultImg from '../../../../public/default.png';
import { FeedbackActions, getReviewByUuidS } from '@pma/store';
import { TargetTypeReverse } from 'config/enum';
import { usePDF, FeedbackDocument, downloadPDF } from '@pma/pdf-renderer';

type QuestionItem = {
  code: string;
  content: string;
  feedbackUuid: string;
  uuid: string;
};

type DraftItem = {
  uuid: string;
  firstName: string;
  lastName: string;
  read: boolean;
  jobName: string;
  departmentName: string;
  updatedTime: string;
  targetType: string;
  targetId: string;
  feedbackItems: QuestionItem[];
};

type DraftItemProps = {
  item: DraftItem;
};

export const QUESTION_ORDER = ['Question 1', 'Question 2', 'Anything else?'];

const DraftItem: FC<DraftItemProps> = ({ item }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();

  const review = useSelector(getReviewByUuidS) || [];

  const markAsReadFeedback = (uuid) => {
    dispatch(FeedbackActions.readFeedback({ uuid }));
  };

  const document = useMemo(() => <FeedbackDocument items={[item as any]} />, [item.uuid]);

  const [instance] = usePDF({ document });

  const getPropperTargetType = (targetType, targetId) => {
    const capitalType =
      TargetTypeReverse[targetType] &&
      TargetTypeReverse[targetType].charAt(0).toUpperCase() + TargetTypeReverse[targetType].slice(1);

    if (capitalType) {
      let targetTypeStr = '';
      review.forEach((item) => {
        if (item.uuid === targetId) {
          targetTypeStr = item.title;
        }
      });

      return `“${capitalType}${targetTypeStr !== '' ? ':' : ''}${`${
        targetTypeStr !== '' ? ` ${targetTypeStr}` : `${targetTypeStr}`
      }`}”`;
    }
    return '';
  };

  return (
    <TileWrapper customStyle={wrapperStyles}>
      <Accordion
        id={`draft-accordion-${item.uuid}`}
        customStyle={{
          borderBottom: 'none',
          marginTop: 0,
        }}
      >
        <BaseAccordion id={`draft-base-accordion-${item.uuid}`}>
          {() => (
            <Section>
              <div className={css(DraftStyles)}>
                <div className={css(BlockInfo)}>
                  <div className={css({ alignSelf: 'flex-start' })}>
                    <img className={css(ImgStyle)} src={defaultImg} alt='photo' />
                  </div>
                  <div className={css({ marginLeft: '16px' })}>
                    <h3 className={css(NamesStyle)}>{`${item.firstName} ${item.lastName}`}</h3>
                    <p className={css(IndustryStyle)}>{`${item.jobName}, ${item.departmentName}`}</p>
                  </div>
                </div>
                <div className={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' })}>
                  <div className={css({ marginRight: '26px' })}>{item.updatedTime}</div>
                  <ExpandButton onClick={(expanded) => expanded && !item.read && markAsReadFeedback(item.uuid)} />
                </div>
              </div>

              <Panel>
                <TileWrapper
                  customStyle={{
                    width: 'auto',
                    padding: '24px',
                    margin: '0px 28px 28px 24px',
                    border: `1px solid ${colors.backgroundDarkest}`,
                  }}
                >
                  <h2 className={css(TitleStyle)}>{getPropperTargetType(item.targetType, item.targetId)}</h2>
                  {item.feedbackItems.map((question) => {
                    return (
                      <div key={question.code} className={css(InfoBlockStyle)}>
                        <h3>{question.code}</h3>
                        <p>{question.content}</p>
                      </div>
                    );
                  })}
                </TileWrapper>
                <IconButton
                  customVariantRules={{ default: iconBtnStyle }}
                  onPress={() => downloadPDF(instance.url!, 'feedback.pdf')}
                  graphic='download'
                  iconProps={{ invertColors: false }}
                  iconStyles={iconStyle}
                >
                  {instance.loading ? (
                    <Trans i18nKey='loading'>Loading...</Trans>
                  ) : (
                    <Trans i18nKey='download'>Download</Trans>
                  )}
                </IconButton>
              </Panel>
            </Section>
          )}
        </BaseAccordion>
      </Accordion>
    </TileWrapper>
  );
};

const wrapperStyles: Rule = {
  padding: '24px 24px 24px 24px',
};

const DraftStyles: Rule = {
  display: 'flex',
  justifyContent: 'space-between',
};

const BlockInfo: Rule = {
  display: 'inline-flex',
  alignItems: 'center',
};

const ImgStyle: Rule = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
};
const NamesStyle: Rule = {
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  margin: '0px',
  color: '#00539F',
};
const IndustryStyle: Rule = {
  fontWeight: 'normal',
  fontSize: '16px',
  lineHeight: '20px',
  margin: '4px 0px 0px 0px',
};
const TitleStyle: Rule = {
  margin: '0px 0px 16px 0px',
  fontSize: '16px',
  color: '#00539F',
  lineHeight: '20px',
};
const InfoBlockStyle: Rule = {
  marginBottom: '16px',
  '& > h3': {
    margin: '0px',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  '& > p': {
    margin: '0px',
    fontSize: '14px',
  },
} as Styles;

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '12px 20px 12px 14px',
  display: 'flex',
  height: '40px',
  borderRadius: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '140px',
  fontWeight: 'bold',
  outline: 0,
  background: theme.colors.white,
  color: theme.colors.tescoBlue,
  cursor: 'pointer',
  width: '176px',
  border: '1px solid #00539F',
  whiteSpace: 'nowrap',
  marginLeft: 'auto',
  marginRight: '24px',
});

const iconStyle: Rule = {
  marginRight: '12px',
};
export default DraftItem;
