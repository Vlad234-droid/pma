import React, { FC, useMemo } from 'react';
import { Rule, Styles, useStyle, colors } from '@dex-ddl/core';
import { TileWrapper } from 'components/Tile';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';
import { IconButton } from 'components/IconButton';
import { Trans } from 'components/Translation';
import { useDispatch, useSelector } from 'react-redux';
import defaultImg from '../../../../../public/default.png';
import { FeedbackActions, getReviewByUuidS } from '@pma/store';
import { TargetTypeReverse } from 'config/enum';
import { usePDF, FeedbackDocument, downloadPDF } from '@pma/pdf-renderer';
import { formatToRelativeDate } from 'utils';

type QuestionItem = {
  code: string;
  content: string;
  feedbackUuid: string;
  question: string;
  uuid: string;
};

export type DraftItem = {
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
  downloadable?: boolean;
};

const QUESTION_ORDER = ['Question 1', 'Question 2', 'Anything else?'];
const HARDCODED_QUESTION = {
  'Question 1':
    "Looking back at what you've seen recently, what would you like to say to this colleague about what they've delivered or how they've gone about it?",
  'Question 2': 'Looking forward, what should this colleague do more (or less) of in order to be at their best?',
  'Anything else?': 'Add any other comments you would like to share with your colleague.',
};

export const defaultSerializer = (item) => ({
  ...item,
  firstName: item?.colleagueProfile?.colleague?.profile?.firstName || '',
  lastName: item?.colleagueProfile?.colleague?.profile?.lastName || '',
  jobName: item?.colleagueProfile?.colleague?.workRelationships[0].job.name || '',
  departmentName: item?.colleagueProfile?.colleague?.workRelationships[0].department?.name || '',
  feedbackItems: item?.feedbackItems
    .sort((i1, i2) => QUESTION_ORDER.indexOf(i1.code) - QUESTION_ORDER.indexOf(i2.code))
    .map(({ code, content, ...rest }) => ({
      ...rest,
      code,
      question: HARDCODED_QUESTION[code],
      content: content ?? '-',
    })),
  updatedTime: formatToRelativeDate(item.updatedTime),
});

const DraftItem: FC<DraftItemProps> = ({ item, downloadable = true }) => {
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
                    margin: '24px 28px 0 0',
                    border: `1px solid ${colors.backgroundDarkest}`,
                  }}
                >
                  {getPropperTargetType(item.targetType, item.targetId) !== '' && (
                    <h2 className={css(TitleStyle)}>{getPropperTargetType(item.targetType, item.targetId)}</h2>
                  )}
                  {item.feedbackItems.map(({ question, content }, idx) => (
                    <div key={idx} className={css(infoBlockStyle)}>
                      <h3>{`${question}`}</h3>
                      <p>{content}</p>
                    </div>
                  ))}
                </TileWrapper>
                {downloadable && (
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
                )}
              </Panel>
            </Section>
          )}
        </BaseAccordion>
      </Accordion>
    </TileWrapper>
  );
};

const infoBlockStyle: Rule = {
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
  marginTop: '28px',
});

const iconStyle: Rule = {
  marginRight: '12px',
};
export default DraftItem;
