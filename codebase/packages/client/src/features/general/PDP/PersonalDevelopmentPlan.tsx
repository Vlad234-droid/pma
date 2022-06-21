import React, { FC, useEffect, useMemo, useRef } from 'react';
import { colors, CreateRule, Rule, Styles, theme, useStyle } from '@pma/dex-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { downloadPDF, PDPDocument, usePDF } from '@pma/pdf-renderer';
import {
  colleagueUUIDSelector,
  FormType,
  getTimelineMetaSelector,
  metaPDPSelector,
  PDPActions,
  schemaMetaPDPSelector,
  TimelineActions,
} from '@pma/store';
import DescriptionBlock from 'components/DescriptionBlock';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Icon } from 'components/Icon';
import { PDPType } from 'config/enum';
import { BASE_URL_API } from 'config/constants';
import { TFunction, Trans, useTranslation } from 'components/Translation';
import Spinner from 'components/Spinner';
import usePDPSchema from './hooks/usePDPSchema';
import GoalInfo from 'components/GoalInfo';
import { Page } from 'pages/general/types';

export const TEST_ID = 'pdp-page';

const getEditOrCreatePDP = (pdpSelector: any[], t: TFunction) =>
  pdpSelector?.length >= 1 && pdpSelector?.length < 5
    ? t('add_pdp_goal', 'Add PDP goal')
    : t('create_pdp', 'Create PDP');

const PersonalDevelopmentPlan: FC = () => {
  const { css, theme, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const pdpSelector = useSelector(schemaMetaPDPSelector)?.goals || [];
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const { loaded: pdpLoaded, loading: pdpLoading } = useSelector(metaPDPSelector);
  const [schema] = usePDPSchema(PDPType.PDP);
  const { components = [], display: newSchemaVersion } = schema;

  const formElements = newSchemaVersion
    ? components
        .flatMap((e) => e?.components || e)
        .filter((e) => [FormType.TEXT_FIELD, FormType.TEXT_AREA, FormType.SELECT, FormType.DATETIME].includes(e?.type))
    : components.filter((component) => component.type != 'text');

  const documentFormElements = formElements.map((el) => ({ label: el['label'].replace(/\*./g, '') }));

  const label_order = ['wiil_be_able_to', 'how_will_i_go', 'succeeded_when', 'expiration_date'];

  const documentFormItems = pdpSelector.map((el, idx) => {
    const sorted = Object.keys(el.properties)
      .sort((a, b) => label_order.indexOf(a) - label_order.indexOf(b))
      .reduce((accumulator, key) => {
        accumulator[key] = el.properties[key];
        return accumulator;
      }, {});

    return {
      uuid: el.uuid,
      number: pdpSelector[idx]?.number,
      items: Object.values(sorted).map((value) => value),
    };
  });

  const document = useMemo(
    () => <PDPDocument formItems={documentFormElements} items={documentFormItems} />,
    [pdpSelector, pdpSelector.length],
  );

  const [instance, updateInstance] = usePDF({ document });

  const navToGoalPage = () => navigate(buildPath(Page.CREATE_PERSONAL_DEVELOPMENT_PLAN));

  const { loaded, loading } = useSelector(getTimelineMetaSelector) || {};

  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (pdpSelector?.length) {
      updateInstance();
    }
  }, [pdpSelector, pdpSelector?.length]);

  useEffect(() => {
    if (!loaded) {
      dispatch(TimelineActions.getTimeline({ colleagueUuid }));
    }
  }, [loaded]);

  useEffect(() => {
    dispatch(PDPActions.getPDPGoal({}));
  }, []);

  const deleteGoal = (uuid) => {
    dispatch(PDPActions.deletePDPGoal({ uuid }));
    elRef.current?.scrollTo(0, 0);
  };

  const editGoal = (uuid) => {
    navigate(buildPath(paramsReplacer(`${Page.UPDATE_PERSONAL_DEVELOPMENT_PLAN}`, { ':uuid': uuid })));
  };

  const downloadHref = () => `${BASE_URL_API}/pdp/template`;

  if (loading || !loaded || pdpLoading || !pdpLoaded) {
    return <Spinner fullHeight />;
  }

  return (
    <div ref={elRef} className={css(wrapper({ mobileScreen }))}>
      <div className={css(buttonBlock)}>
        <div className={css(controlButtons({ mobileScreen }))}>
          {pdpSelector?.length !== 5 && (
            <>
              <a className={css(buttonDownload)} href={downloadHref()} download>
                <div className={css(btnIcon)}>
                  <Icon graphic='download' />
                </div>
                <Trans i18nKey='download_template'>Download template</Trans>
              </a>

              <button className={css(buttonIcon)} onClick={navToGoalPage}>
                <div className={css(btnIcon)}>
                  <Icon graphic='add' fill={theme.colors.white} iconStyles={{ height: '16.67px', width: '16.67px' }} />
                </div>
                {getEditOrCreatePDP(pdpSelector, t)}
              </button>
            </>
          )}
        </div>

        <div className={css(controlButtons({ mobileScreen }))}>
          <button onClick={() => navigate(buildPath(Page.PERSONAL_DEVELOPMENT_HELP))} className={css(infoBtn)}>
            <Icon graphic='information' />
          </button>
        </div>
      </div>

      <div className={css(mainBlock({ mobileScreen }))}>
        <div className={css(descriptionMain)}>
          <DescriptionBlock>
            <div className={css(title)}>
              <Trans i18nKey='what_is_personal_development_plan'>What is Personal Development Plan?</Trans>
            </div>
            <div className={css(details, detailsWithMargin)}>
              <Trans className={css(paragraph)} i18nKey='pdp_is_a_tailored_plan'>
                Your Personal Development Plan (PDP) is a tailored plan that helps you reflect on the things you are
                great at and identify areas you want to improve.
              </Trans>
              <p className={css(paragraph)}>
                <Trans i18nKey='having_a_personal_development_plan_will_help_you'>
                  Having a Personal Development Plan will help you to put some structure to your development and be
                  clear about what you are looking for in your career. How you want your plan to look and what you put
                  in it is up to you, the important thing is that it inspires and motivates you. You can use the system
                  to write and store your PDP, download the template or make a new plan that suits your ways of working.
                </Trans>
              </p>
              <p className={css(paragraph)}>
                <Trans i18nKey='remember_a_pdp_is_completely_personal_to_you'>
                  Remember a PDP is completely personal to you.
                </Trans>
              </p>
              <p className={css(paragraph)}>
                <Trans i18nKey='important_you_review_and_update_your_pdp'>
                  It&apos;s important you review and update your PDP regularly to ensure it reflects where you are in
                  your career at that moment in time.
                </Trans>
              </p>
            </div>

            <div className={css(title)}>
              <Trans i18nKey='how_the_performance_development_plan_works'>
                How The Performance Development Plan works?
              </Trans>
            </div>
            <div className={css(details)}>
              <Trans i18nKey='how_you_do_your_job'>
                At Tesco, “how” you do your job is as important as “what” you deliver. An inspiring PDP will help you
                focus on what to develop, whether that&apos;s being at your best in your current role or moving towards
                a bigger or broader role. What&apos;s important is recording and regularly reviewing your plan to a
                format that works for you.
              </Trans>
            </div>
          </DescriptionBlock>
        </div>

        {pdpSelector?.length > 0 && (
          <div className={css(subtitleBlock)}>
            <div className={css(devPlanTitle)}>
              <Trans i18nKey='my_development_plan'>My Development Plan</Trans>
            </div>
            <div>
              <button className={css(buttonDownloadItems)} onClick={() => downloadPDF(instance.url!, 'pdp-goals.pdf')}>
                <div className={css(btnIcon)}>
                  <Icon graphic='download' />
                </div>
                <Trans i18nKey='download'>Download</Trans>
              </button>
            </div>
          </div>
        )}

        <div className={css(bodyWrapperStyles({ mobileScreen }))} data-test-id={TEST_ID}>
          <div className={css(timelineWrapperStyles)}>
            {pdpSelector &&
              pdpSelector.map((el, idx) => {
                return (
                  <GoalInfo
                    id={el.uuid}
                    key={`${t('personal_development_goal', 'Personal Development Goal')}: ${idx + 1}`}
                    data={el.properties}
                    title={`${t('personal_development_goal', 'Personal Development Goal')}: ${idx + 1}`}
                    currentGoalId={idx}
                    subtitle={formElements[0].label}
                    formElements={formElements}
                    deleteGoal={deleteGoal}
                    editGoal={editGoal}
                    description={Object.values(el.properties)[0]}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const paragraph: Rule = {
  fontSize: theme.font.fixed.f14.fontSize,
  lineHeight: theme.font.fixed.f14.lineHeight,
};

const wrapper: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;
  return {
    padding: mobileScreen ? '0 10px' : '0 40px',
  };
};

const mainBlock: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => {
  return {
    width: mobileScreen ? '100%' : '70%',
  };
};

const subtitleBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  width: '100%',
  paddingTop: '10px',
  borderBottom: `2px solid ${colors.lightGray}`,
} as Rule;

const devPlanTitle = {
  color: `${theme.colors.base}`,
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
} as Rule;

const detailsWithMargin = {
  marginBottom: '24px',
} as Rule;

const title = {
  color: `${theme.colors.base}`,
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontStyle: 'normal',
  fontWeight: `${theme.font.weight.bold}`,
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  letterSpacing: '0px',
  lineHeight: theme.font.fixed.f18.lineHeight,
  marginBottom: '8px',
} as Rule;

const descriptionMain = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexDirection: 'row',
  width: '100%',
  '@media (max-width: 900px)': {
    flexDirection: 'column',
  },
  fontFamily: '"TESCO Modern", Arial, sans-serif',
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  letterSpacing: '0px',
  fontStyle: 'normal',
  lineHeight: theme.font.fixed.f14.lineHeight,
  textAlign: 'left',
} as Rule;

const details = {
  fontWeight: 'normal',
  color: `${theme.colors.base}`,
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  letterSpacing: '0px',
  lineHeight: theme.font.fixed.f14.lineHeight,
} as Rule;

const infoBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
} as Rule;

const buttonDownload = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '40px',
  padding: '10px 20px',
  fontSize: theme.font.fixed.f16.fontSize,
  letterSpacing: '0px',
  lineHeight: theme.font.fixed.f16.lineHeight,
  borderRadius: '32px',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
  border: `2px solid ${theme.colors.tescoBlue}`,
  backgroundColor: 'transparent',
  color: `${theme.colors.tescoBlue}`,
  fontWeight: `${theme.font.weight.bold}`,
  marginRight: '15px',
  ':hover': {
    color: `${theme.colors.tescoBlue}`,
  },
  ':focus': {
    color: `${theme.colors.tescoBlue}`,
  },
} as Rule;

const buttonDownloadItems = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '40px',
  padding: '10px 0',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  letterSpacing: '0px',
  lineHeight: theme.font.fixed.f16.lineHeight,
  border: 'none',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
  backgroundColor: 'transparent',
  color: `${theme.colors.tescoBlue}`,
  fontWeight: `${theme.font.weight.bold}`,
} as Rule;

const btnIcon = {
  paddingRight: '9.67px',
  height: '18px',
} as Rule;

const buttonIcon = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  height: '40px',
  padding: '10px 20px',
  color: `${theme.colors.white}`,
  backgroundColor: `${theme.colors.tescoBlue}`,
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  fontWeight: `${theme.font.weight.bold}`,
  lineHeight: theme.font.fixed.f16.lineHeight,
  letterSpacing: '0px',
  borderRadius: '32px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '16px',
  marginBottom: '16px',
} as Rule;

const buttonBlock = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  fontFamily: '"TESCO Modern", Arial, sans-serif',
} as Rule;

const controlButtons: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;

  if (mobileScreen) {
    return {
      flexDirection: 'column',
    };
  }

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const timelineWrapperStyles = {
  flex: '3 1 70%',
  display: 'flex',
  flexDirection: 'column',
  '& > div': {
    height: '100%',
  },
} as Styles;

const bodyWrapperStyles: CreateRule<{ mobileScreen: boolean }> = (props) => {
  const { mobileScreen } = props;

  return {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    paddingBottom: '20px',
    flexDirection: mobileScreen ? 'column' : 'row',
  };
};

export default PersonalDevelopmentPlan;
